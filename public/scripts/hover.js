class HoverEffect {
    constructor(opts) {
        this.parent = opts.parent || console.warn("No parent element");
        this.image1 = opts.image1 || console.warn("First image missing");
        this.image2 = opts.image2 || console.warn("Second image missing");
        this.displacementImage = opts.displacementImage || console.warn("Displacement image missing");
        this.intensity = opts.intensity || 1.0;
        this.speedIn = opts.speedIn || 1.2;
        this.speedOut = opts.speedOut || 1.2;
        this.easing = opts.easing || 'expo.out';
        
        // イベントリスナーの参照を保存
        this.resizeHandler = null;
        this.animationId = null;
        
        // 正しいCanvas幅をdata属性から取得（劣化対策）
        this.correctCanvasWidth = opts.correctWidth || null;
        this.correctCanvasHeight = opts.correctHeight || null;

        this.init();
    }

    // 画像中心を切り出してテクスチャ作成（スマホのみ、GPU負荷削減）
    loadAndCropImage(imageSrc, callback) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const isMobile = window.innerWidth <= 767;
            
            // PCはトリミングせず元画像を使用
            if (!isMobile) {
                const loader = new THREE.TextureLoader();
                loader.load(imageSrc, callback);
                return;
            }
            
            // スマホのみトリミング処理
            // 1. 画像の高さをブラウザ高さ(100vh)に合わせる
            const browserHeight = window.innerHeight;
            const imgAspect = img.width / img.height;
            const scaledWidth = browserHeight * imgAspect;
            const scaledHeight = browserHeight;
            
            // 2. Canvas表示領域は50vw × 100vh
            const vw = window.innerWidth / 100;
            const displayWidth = 50 * vw;
            const displayHeight = browserHeight;
            
            // 3. Canvas内部解像度を2倍にして高品質化（スマホ用）
            const cropWidth = displayWidth * 2;  // 2倍解像度
            const cropHeight = displayHeight * 2; // 2倍解像度
            
            // 4. スケール後の画像の中心から切り出し（2倍解像度で）
            const canvas = document.createElement('canvas');
            canvas.width = cropWidth;
            canvas.height = cropHeight;
            const ctx = canvas.getContext('2d');
            
            // 高品質な画像処理設定
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            // 切り出し開始位置（中心から、2倍解像度版）
            const sx = (scaledWidth * 2 - cropWidth) / 2;
            const sy = 0; // 高さは100vhなので上端から
            
            // 元画像での切り出し位置を逆算（2倍解像度で計算）
            const scale = img.height / (scaledHeight * 2);
            const imgSx = sx * scale;
            const imgSy = sy * scale;
            const imgSw = cropWidth * scale;
            const imgSh = cropHeight * scale;
            
            ctx.drawImage(img, imgSx, imgSy, imgSw, imgSh, 0, 0, cropWidth, cropHeight);
            
            // CanvasからThree.jsテクスチャを作成
            const texture = new THREE.CanvasTexture(canvas);
            
            // トリミング後のアスペクト比を保存（スマホ用）
            texture.croppedAspect = cropWidth / cropHeight;
            
            callback(texture);
        };
        img.onerror = () => {
            console.warn('Failed to load image:', imageSrc);
            callback(null);
        };
        img.src = imageSrc;
    }

    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        // PixelRatioはonResizeで設定（サイズ確定後）
        this.parent.appendChild(this.renderer.domElement);

        // 画像中心を切り出してテクスチャ作成（GPU負荷削減）
        this.loadAndCropImage(this.image1, (tex1) => {
            this.loadAndCropImage(this.image2, (tex2) => {
                // displacementは切り出さない
                const loader = new THREE.TextureLoader();
                loader.load(this.displacementImage, (dispTex) => {
                    this.texture1 = tex1;
                    this.texture2 = tex2;
                    this.disp = dispTex;

                    // スマホでの高解像度対応：テクスチャ設定
                    this.texture1.generateMipmaps = false;
                    this.texture2.generateMipmaps = false;
                    this.disp.generateMipmaps = false;
                    
                    this.texture1.minFilter = THREE.LinearFilter;
                    this.texture2.minFilter = THREE.LinearFilter;
                    this.disp.minFilter = THREE.LinearFilter;
                    
                    this.texture1.magFilter = THREE.LinearFilter;
                    this.texture2.magFilter = THREE.LinearFilter;
                    this.disp.magFilter = THREE.LinearFilter;

                    // NPOTテクスチャ時はClampToEdgeでリサンプルぼけを回避（POTのみRepeat）
                    const isPowerOfTwo = (n) => (n & (n - 1)) === 0;
                    const dispW = this.disp.image && this.disp.image.width ? this.disp.image.width : 0;
                    const dispH = this.disp.image && this.disp.image.height ? this.disp.image.height : 0;
                    const dispIsPOT = isPowerOfTwo(dispW) && isPowerOfTwo(dispH);
                    this.disp.wrapS = this.disp.wrapT = dispIsPOT ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
                    this.disp.needsUpdate = true;

                    // スマホではトリミング後のアスペクト比を使用
                    this.aspect = this.texture1.croppedAspect || (this.texture1.image.width / this.texture1.image.height);

                    this.createMaterial();
                    this.addEvents();
                    this.animate();
                    // onResize()はis--show付与後にtgm.jsから呼ばれる
                    
                    // リサイズイベントリスナーを保存（is--show付与後に登録される）
                    // 常に正しいサイズを使用（劣化対策）
                    this.resizeHandler = () => this.onResize(true);
                });
            });
        });
    }

    createMaterial() {
        const vertex = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

        const fragment = `
            varying vec2 vUv;
            uniform sampler2D texture;
            uniform sampler2D texture2;
            uniform sampler2D disp;
            uniform float dispFactor;
            uniform float effectFactor;
            void main() {
                vec2 uv = vUv;
                vec4 disp = texture2D(disp, uv);
                vec2 distorted1 = vec2(uv.x + dispFactor * (disp.r * effectFactor), uv.y);
                vec2 distorted2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r * effectFactor), uv.y);
                vec4 _texture = texture2D(texture, distorted1);
                vec4 _texture2 = texture2D(texture2, distorted2);
                gl_FragColor = mix(_texture, _texture2, dispFactor);
            }
        `;

        this.uniforms = {
            dispFactor: { value: 0.0 },
            effectFactor: { value: this.intensity },
            texture: { value: this.texture1 },
            texture2: { value: this.texture2 },
            disp: { value: this.disp }
        };

        const material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true
        });

        this.geometry = new THREE.PlaneGeometry(2, 2);
        this.mesh = new THREE.Mesh(this.geometry, material);
        this.scene.add(this.mesh);
    }

    addEvents() {
        this.parent.addEventListener('mouseenter', () => {
            gsap.to(this.uniforms.dispFactor, {
                value: 1,
                duration: this.speedIn,
                ease: this.easing
            });
        });

        this.parent.addEventListener('mouseleave', () => {
            gsap.to(this.uniforms.dispFactor, {
                value: 0,
                duration: this.speedOut,
                ease: this.easing
            });
        });
    }
    
    // スクロールアウト時のhoverアウト処理（1枚目に確実に戻す）
    hoverOut(callback) {
        if (this.uniforms && this.uniforms.dispFactor) {
            // アニメーション中のものを停止
            gsap.killTweensOf(this.uniforms.dispFactor);
            // 即座に1枚目に戻す
            this.uniforms.dispFactor.value = 0;
            // 1フレーム描画して確定
            if (this.renderer && this.scene && this.camera) {
                this.renderer.render(this.scene, this.camera);
            }
            if (callback) callback();
        } else if (callback) {
            callback();
        }
    }
    
    // スクロール復帰時の即座表示
    fadeIn() {
        // 即座に表示（フェードなし）
        const el = this.renderer.domElement;
        el.style.opacity = '1';
        el.style.display = 'block';
        el.style.visibility = 'visible';

        // テクスチャの再アップロードを明示（モバイルでの劣化対策）
        if (this.texture1) this.texture1.needsUpdate = true;
        if (this.texture2) this.texture2.needsUpdate = true;
        if (this.disp) this.disp.needsUpdate = true;

        // DOMが安定してから正しいサイズへリサイズして複数フレーム描画（モバイルでの劣化対策）
        requestAnimationFrame(() => {
            this.onResize(true); // 保存された正しいサイズを使用
            if (this.renderer && this.scene && this.camera) {
                // 2フレーム連続描画で内部FBO更新を安定化
                this.renderer.render(this.scene, this.camera);
                requestAnimationFrame(() => {
                    if (this.renderer && this.scene && this.camera) {
                        this.renderer.render(this.scene, this.camera);
                    }
                });
            }
        });
    }

    onResize(useCorrectSize = false) {
        let parentWidth, parentHeight;
        
        if (useCorrectSize && this.correctCanvasWidth && this.correctCanvasHeight) {
            // 保存された正しいサイズを使用（劣化対策）
            parentWidth = this.correctCanvasWidth;
            parentHeight = this.correctCanvasHeight;
        } else {
            // 正確な表示サイズ取得（transform等考慮）
            // offsetWidth/Heightの方が安定（CSS transform影響を受けない）
            parentWidth = Math.max(1, this.parent.offsetWidth || this.parent.clientWidth || 1);
            parentHeight = Math.max(1, this.parent.offsetHeight || this.parent.clientHeight || 1);
        }

        let width, height;
        const targetAspect = this.aspect;

        if (parentWidth / parentHeight > targetAspect) {
            height = parentHeight;
            width = height * targetAspect;
        } else {
            width = parentWidth;
            height = width / targetAspect;
        }

        // モバイルの高解像度対応：クラッシュ対策でスマホは控えめに
        const dpr = (window.devicePixelRatio || 1);
        const isMobile = window.innerWidth <= 767;
        const cap = dpr > 2 ? 3 : 2;
        const pixelRatio = Math.min(dpr, cap);
        this.renderer.setPixelRatio(pixelRatio);
        this.renderer.setSize(width, height);
        this.renderer.domElement.style.width = `${width}px`;
        this.renderer.domElement.style.height = `${height}px`;
        
        // デバッグ：最上位（一番最初）のitemのみCanvasサイズをログ出力（劣化原因調査）
        const allItems = document.querySelectorAll('.p-postList__item');
        const thisItem = this.parent.closest('.p-postList__item');
        const isFirstItem = allItems.length > 0 && thisItem === allItems[0];
        
        if (isFirstItem) {
          console.log('🔍 [FIRST] Canvas size:', {
              parentWidth: parentWidth,
              parentHeight: parentHeight,
              calcWidth: width,
              calcHeight: height,
              aspect: this.aspect,
              pixelRatio: pixelRatio,
              actualCanvasWidth: this.renderer.domElement.width,
              actualCanvasHeight: this.renderer.domElement.height
          });
        }
    }

    animate() {
        // スマホでのクラッシュ対策：レンダリング制御
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    // リソースの完全な解放
    destroy() {
        // アニメーションループを停止
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        // リサイズイベントリスナーを削除
        if (this.resizeHandler) {
            window.removeEventListener('resize', this.resizeHandler);
            this.resizeHandler = null;
        }
        
        // WebGLリソースの解放
        if (this.renderer) {
            this.renderer.dispose();
            if (this.renderer.domElement && this.renderer.domElement.parentNode) {
                this.renderer.domElement.remove();
            }
            this.renderer = null;
        }
        
        if (this.geometry) {
            this.geometry.dispose();
            this.geometry = null;
        }
        
        if (this.material) {
            this.material.dispose();
            this.material = null;
        }
        
        if (this.texture1) {
            this.texture1.dispose();
            this.texture1 = null;
        }
        
        if (this.texture2) {
            this.texture2.dispose();
            this.texture2 = null;
        }
        
        if (this.disp) {
            this.disp.dispose();
            this.disp = null;
        }
        
        // シーンとカメラの参照をクリア
        this.scene = null;
        this.camera = null;
        this.parent = null;
        
        console.log('HoverEffect destroyed completely');
    }
    
}