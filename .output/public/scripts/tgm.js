"use strict";

const main = document.querySelector('main');

// スムーススクロール
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

window.addEventListener('load', () => {
	
// 	loading
	setTimeout(() => {
		document.body.classList.add( 'is--loaded' );
		
		// スクロール位置を0にリセット
		window.scrollTo(0, 0);
		
		// スマホでも確実にスクロール位置をリセット
		if (window.innerWidth <= 767) {
			const postList = document.querySelector('.p-postList');
			if (postList) {
				postList.scrollTop = 0;
			}
		}

	    // DistortionHoverEffect 初期化呼び出し
	    initDistortionEffects();
	    
	    // スマホでのメモリ監視開始
	    startMemoryMonitoring();
	    
	}, 1000);

});

document.addEventListener('DOMContentLoaded', () => {
  const nextBtn = document.querySelector('.p-post__next');
  if (!nextBtn) return;

  nextBtn.addEventListener('click', () => {
    const items = document.querySelectorAll('.p-postList__item');
    const current = Array.from(items).findIndex(item => {
      const rect = item.getBoundingClientRect();
      return rect.top >= 0 && rect.top < window.innerHeight * 0.5;
    });
    
    const next = Math.min(current + 1, items.length - 1);
    items[next].scrollIntoView({ behavior: 'smooth' });
  });
  
  // グローバル管理に追加
  window.intersectionObservers.add(observer);
});


function runTypingAnimation(p){
  // 既存のアニメーションをクリア（スマホクラッシュ対策）
  gsap.killTweensOf(p.querySelectorAll('.p-postList__char'));
  gsap.killTweensOf(p.querySelectorAll('.p-postList__cursor'));
  // 親要素のアニメーションもクリア
  gsap.killTweensOf(p);
  
  let charSpans = [];
  let pausePoints = [];
  
  // 既に文字がspan要素に分割されている場合は再利用
  const existingChars = p.querySelectorAll('.p-postList__char');
  if (existingChars.length > 0) {
    charSpans = Array.from(existingChars);
    // 既存の文字要素を非表示にリセット
    charSpans.forEach(char => {
      char.style.opacity = '0';
    });
    
    // pausePointsを要素から復元
    const savedPausePoints = p.dataset.pausePoints;
    if (savedPausePoints) {
      pausePoints = JSON.parse(savedPausePoints);
    }
  } else {
    // 初回の場合のみテキストをspan要素に分割
    const frag = document.createDocumentFragment();

  [...p.childNodes].forEach(node=>{
    if(node.nodeType===3){
      [...node.textContent].forEach(c=>{
        const s=document.createElement('span');
        s.className='p-postList__char';
        s.textContent=c;
          s.style.opacity = '0';
        frag.appendChild(s);
        charSpans.push(s);
      });
    }else if(node.nodeType===1&&node.tagName==='BR'){
      frag.appendChild(document.createElement('br'));
      pausePoints.push(charSpans.length);
    }
  });

  p.textContent='';
  p.appendChild(frag);

    // pausePointsを要素に保存
    p.dataset.pausePoints = JSON.stringify(pausePoints);
  }

  const tl=gsap.timeline({
    onComplete: () => {
      // アニメーション完了後、文字を表示状態で保持
      charSpans.forEach(span => {
        gsap.set(span, { opacity: 1 });
        span.classList.add('visible');
      });
    }
  });

  for(let i=0;i<charSpans.length;i++){
    if(pausePoints.includes(i)){
      tl.call(()=>{
        const cursor=document.createElement('span');
        cursor.className='p-postList__cursor';
        cursor.textContent='＿';
        p.insertBefore(cursor,charSpans[i]);
        gsap.set(cursor,{opacity:1});
        gsap.delayedCall(0.4,()=>{
          gsap.set(cursor,{opacity:0});
          cursor.remove();
        });
      });
      tl.to({}, {duration:1});
    }
    tl.to(charSpans[i],{opacity:1,duration:0.05},'+=0');
  }
}

// observer post lists
function observePostLists(_tar){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      // console.log('PostList observer:', entry.isIntersecting ? 'ENTERING' : 'LEAVING', _tar);
      
      if(entry.isIntersecting && _tar.querySelector('.js-typing')){
        // observer管理の準備完了フラグを設定
        _tar.dataset.observerReady = 'true';
        
        // console.log('Setting observerReady=true for:', _tar);
        
        // 既存のobserver管理とレンダリング準備完了のAND処理
        if (_tar.classList.contains('is--show') || _tar.dataset.typed === 'true') {
          // 既にis--showが発火済みの場合は何もしない
          // console.log('Already shown, skipping:', _tar);
          return;
        }
        
        // 両方の条件が揃った場合のみis--show発火
        const observerReady = _tar.dataset.observerReady === 'true';
        const renderReady = _tar.dataset.renderReady === 'true';
        
        if (observerReady && renderReady) {
          _tar.dataset.typed = 'true';
        _tar.classList.add('is--show');
          
          // タイピング要素を確実に表示
          const typingElement = _tar.querySelector('.js-typing');
          if (typingElement) {
            typingElement.style.setProperty('opacity', '1');
            runTypingAnimation(typingElement);
          }
          
          // 一度発火したらobserverを切断（メモリリーク防止）
          observer.unobserve(_tar);
          observer.disconnect();
        }
      }
    });
  },{root:null,rootMargin:"0%",threshold:0});

  observer.observe(_tar);
  
  // グローバル管理に追加
  window.intersectionObservers.add(observer);
}

function setVhUnitInitial(){
	const vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('DOMContentLoaded', setVhUnitInitial);

const nextBtn = document.querySelector('.p-post__next');
const postList = document.querySelector('.p-postList');
const lastItem = document.querySelector('.p-postList__item:last-child');
let atLastItem = false;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 最後の要素に達したら snap OFF
      postList.classList.remove('scroll-snap');
      atLastItem = true;
      nextBtn.classList.add('is--hide');
    } else {
      // 最後の要素から離れたら snap ON
      postList.classList.add('scroll-snap');
      atLastItem = false;
      nextBtn.classList.remove('is--hide');
    }
  });
  
  // グローバル管理に追加
  window.intersectionObservers.add(observer);
}, {
  root: null,
  threshold: .2
});

if (lastItem) {
  observer.observe(lastItem);
  // グローバル管理に追加
  window.intersectionObservers.add(observer);
}


// HoverEffectインスタンス管理
const hoverEffectInstances = new Map();
const isInitializing = new Set();
// 初期化スキップ時の再試行タイマー
const retryInitTimers = new Map();
// 未発火フォールバック用タイマー（表示後1秒でis--showを強制）
const forceShowTimers = new Map();

// グローバルなobserver管理（メモリリーク防止）
if (!window.intersectionObservers) {
  window.intersectionObservers = new Set();
}
if (!window.hoverEffectInstances) {
  window.hoverEffectInstances = hoverEffectInstances;
}

// WebGLコンテキスト数の制限（スマホでの安定性向上）
const MAX_WEBGL_CONTEXTS = 3;

// ハイブリッドアプローチ：保持するCanvas数（表示中 + 前後1記事）
const MAX_KEPT_CANVASES = 3;

// ハイブリッド管理：保持されているCanvas要素
const keptCanvases = new Set();

// スマホでの初期化頻度制限
let lastInitTime = 0;
const INIT_COOLDOWN = 2000; // 元の設定に戻す

// メモリ使用量監視（スマホクラッシュ対策）
let memoryCheckInterval;
function startMemoryMonitoring() {
  if (window.innerWidth > 767) return; // PCでは不要
  
  memoryCheckInterval = setInterval(() => {
    if (performance.memory) {
      const usedMB = performance.memory.usedJSHeapSize / 1024 / 1024;
      // console.log('Memory usage:', usedMB.toFixed(2), 'MB');
      
      // メモリ使用量が30MBを超えた場合、古いリソースを強制解放
      if (usedMB > 30) {
        console.warn('High memory usage detected, forcing cleanup');
        forceCleanupOldResources();
      }
    }
  }, 3000); // 3秒ごとにチェック
}

function forceCleanupOldResources() {
  // 画面外の古いHoverEffectを強制削除
  const visibleItems = document.querySelectorAll('.p-postList__item');
  visibleItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (!isVisible) {
      const thumb = item.querySelector('.p-postList__thumb');
      if (thumb && hoverEffectInstances.has(thumb)) {
        destroyHoverEffectForThumb(thumb);
      }
    }
  });
  
  // グローバル管理に追加
  window.intersectionObservers.add(observer);
}

// 完全な遅延読み込みでHoverEffectを初期化
function initHoverEffectForThumb(el) {
  // 既にリソースが存在する場合は再初期化しない
  if (hoverEffectInstances.has(el) || isInitializing.has(el)) return;
  
  // スマホでもWebGLを使用（安全な方法で）
  const isMobile = window.innerWidth <= 767;
  
  // WebGLコンテキスト数の制限（枠が埋まっていたら最古の保持Canvasを1つ破棄して枠を確保）
  if (hoverEffectInstances.size >= MAX_WEBGL_CONTEXTS) {
    const oldestKept = keptCanvases && keptCanvases.size > 0 ? keptCanvases.values().next().value : null;
    if (oldestKept) {
      try {
        destroyHoverEffectForThumb(oldestKept, false);
      } catch (e) {
        console.warn('Failed to destroy oldest kept canvas:', e);
      }
      keptCanvases.delete(oldestKept);
      // console.log('Freed one kept canvas to init new HoverEffect');
    } else {
      // console.log('Max WebGL contexts reached, skipping');
      return;
    }
  }
  
  // スマホでの初期化頻度制限
  const now = Date.now();
  if (isMobile && (now - lastInitTime) < INIT_COOLDOWN) {
    const remaining = INIT_COOLDOWN - (now - lastInitTime);
    // console.log('Init cooldown active, retry in', remaining, 'ms');
    if (!retryInitTimers.has(el)) {
      const t = setTimeout(() => {
        retryInitTimers.delete(el);
        initHoverEffectForThumb(el);
      }, remaining + 50);
      retryInitTimers.set(el, t);
    }
    return;
  }
  lastInitTime = now;
  
  isInitializing.add(el);
  
  // console.log('Initializing HoverEffect for:', el);
  
  // デバッグ：最上位（一番最初）のitemのみログを出力
  const allItems = document.querySelectorAll('.p-postList__item');
  const isFirstItem = allItems.length > 0 && el.closest('.p-postList__item') === allItems[0];
  
    const imgs = el.querySelectorAll('img');
  if (imgs.length < 2) {
    isInitializing.delete(el);
    return;
  }

    const imgPromises = Array.from(imgs).map(img => {
      return new Promise(resolve => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = resolve;
          img.onerror = resolve;
        }
      });
    });

	Promise.all(imgPromises).then(() => {
    if (hoverEffectInstances.has(el)) {
      // console.log('HoverEffect already exists, skipping initialization for:', el);
      isInitializing.delete(el);
      return;
    }
    
    // デバッグ：最上位（一番最初）のitemのみ画像srcをログ出力（劣化原因調査）
    if (isFirstItem) {
      console.log('🔍 [FIRST] Creating HoverEffect with images:', {
        image1: imgs[0].getAttribute('src'),
        image2: imgs[1].getAttribute('src'),
        img1Width: imgs[0].naturalWidth || imgs[0].width,
        img1Height: imgs[0].naturalHeight || imgs[0].height,
        img2Width: imgs[1].naturalWidth || imgs[1].width,
        img2Height: imgs[1].naturalHeight || imgs[1].height
      });
    }
    
    // 正しいCanvas幅を計算してdata属性に保存（劣化対策）
    if (!el.dataset.correctWidth) {
      // 画像のアスペクト比とブラウザ高さから正しいwidthを計算
      const img1 = imgs[0];
      const imgWidth = img1.naturalWidth || img1.width;
      const imgHeight = img1.naturalHeight || img1.height;
      const imgAspect = imgWidth / imgHeight;
      const browserHeight = window.innerHeight;
      const correctWidth = Math.round(browserHeight * imgAspect);
      
      el.dataset.correctWidth = correctWidth;
      el.dataset.correctHeight = browserHeight;
      
      if (isFirstItem) {
        console.log('🔍 [FIRST] Saved correct size:', {
          imgWidth: imgWidth,
          imgHeight: imgHeight,
          imgAspect: imgAspect,
          browserHeight: browserHeight,
          correctWidth: correctWidth
        });
      }
    }
    
    const hoverEffect = new HoverEffect({
	    parent: el,
	    intensity: el.dataset.intensity || undefined,
	    speedIn: el.dataset.speedin || undefined,
	    speedOut: el.dataset.speedout || undefined,
	    easing: el.dataset.easing || undefined,
	    hover: el.dataset.hover || undefined,
	    image1: imgs[0].getAttribute('src'),
	    image2: imgs[1].getAttribute('src'),
	    displacementImage: el.dataset.displacement,
	    correctWidth: parseInt(el.dataset.correctWidth),
	    correctHeight: parseInt(el.dataset.correctHeight)
	  });
    
    // インスタンスを保存
    hoverEffectInstances.set(el, hoverEffect);
    isInitializing.delete(el);
    
    // 裏でレンダリング準備が完了したら画像を切り替え
    // スマホでのクラッシュ対策のため遅延を大幅調整
    const delay = window.innerWidth <= 767 ? 500 : 200;
    setTimeout(() => {
      // レンダリング準備完了フラグを設定
      const postItem = el.closest('.p-postList__item');
      if (!postItem) return;
      
      postItem.dataset.renderReady = 'true';
      
      // is--show付与前の大きいサイズでCanvasを作成
      const observerReady = postItem.dataset.observerReady === 'true';
      const shouldShow = observerReady && !postItem.classList.contains('is--show');
      
      // 第1画像を非表示にしてcanvasを表示
      imgs[0].style.display = 'none';
      imgs[1].style.display = 'none';
      
      // 新しく作成されたCanvasは1枚目の画像から開始
      if (hoverEffect.uniforms && hoverEffect.uniforms.dispFactor) {
        hoverEffect.uniforms.dispFactor.value = 0;
      }
      
      // 保存された正しいサイズでリサイズ（高品質）
      hoverEffect.onResize(true); // useCorrectSize = true
      
      // resizeイベントリスナーを登録
      if (hoverEffect.resizeHandler) {
        window.addEventListener('resize', hoverEffect.resizeHandler);
      }
      
      // Canvasを表示
      hoverEffect.fadeIn();
      
      // is--show付与（親要素サイズが変わるが、Canvasは大きいサイズを保持）
      if (shouldShow) {
        postItem.classList.add('is--show');
      }
      
      // タイピングアニメーションも開始（is--show付与後）
      if (shouldShow) {
        // ハイブリッド管理：新しく作成されたCanvasを保持リストに追加
        keptCanvases.add(el);
        
        const typingElement = postItem.querySelector('.js-typing');
        if (typingElement && postItem.dataset.typed !== 'true') {
          postItem.dataset.typed = 'true';
          typingElement.style.setProperty('opacity', '1');
          runTypingAnimation(typingElement);
        }
      }
    }, delay);
  });
  
  // グローバル管理に追加
  window.intersectionObservers.add(observer);
}

// HoverEffectリソースの破棄（ハイブリッドアプローチ）
function destroyHoverEffectForThumb(el, keepCanvas = false) {
  const hoverEffect = hoverEffectInstances.get(el);
  if (!hoverEffect) return;
  
  try {
    // GSAPアニメーションを停止
    if (hoverEffect.uniforms && hoverEffect.uniforms.dispFactor) {
      gsap.killTweensOf(hoverEffect.uniforms.dispFactor);
    }
    
    if (keepCanvas) {
      // Canvas要素を保持：hoverアウト処理を実行してから不可視化（visibility）
      hoverEffect.hoverOut();
      const elCanvas = hoverEffect.renderer.domElement;
      elCanvas.style.visibility = 'hidden';
      elCanvas.style.opacity = '0';
      // console.log('Canvas hover out and kept hidden for:', el);
    } else {
      // 完全破棄
      hoverEffect.destroy();
      hoverEffectInstances.delete(el);
      // console.log('HoverEffect completely destroyed for:', el);
    }
    
  } catch (error) {
    console.warn('Error disposing HoverEffect:', error);
  }
  
  isInitializing.delete(el);
  
  if (!keepCanvas) {
    // 完全破棄の場合：画像を新しく作り直す（劣化対策）
    const imgs = el.querySelectorAll('img');
    imgs.forEach((img, index) => {
      // 新しいimg要素を作成
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt || '';
      newImg.className = img.className;
      newImg.style.display = 'block';
      
      // 元の画像を新しい画像に置き換え
      if (img.parentNode) {
        img.parentNode.replaceChild(newImg, img);
      }
    });
    
    // 再初期化可能にするため、renderReadyフラグをリセット
    const postItem = el.closest('.p-postList__item');
    if (postItem) {
      postItem.dataset.renderReady = 'false';
    }
  }
}

// ハイブリッド管理：Canvas保持数の制限
function manageKeptCanvases() {
  if (keptCanvases.size > MAX_KEPT_CANVASES) {
    // 最も古いCanvasを完全破棄
    const oldestCanvas = keptCanvases.values().next().value;
    destroyHoverEffectForThumb(oldestCanvas, false); // 完全破棄
    keptCanvases.delete(oldestCanvas);
    // console.log('Oldest canvas destroyed, kept:', keptCanvases.size);
  }
}

// ハイブリッド管理：Canvas表示制御（1枚目の画像から開始 + 滑らかな表示）
function showKeptCanvas(el) {
  const hoverEffect = hoverEffectInstances.get(el);
  if (hoverEffect && keptCanvases.has(el)) {
    // 1枚目の画像から開始（dispFactor = 0）
    if (hoverEffect.uniforms && hoverEffect.uniforms.dispFactor) {
      hoverEffect.uniforms.dispFactor.value = 0;
    }
    // 滑らかなfade-in表示
    hoverEffect.fadeIn();
    // console.log('Kept canvas shown with fade-in (1st image) for:', el);
    return true;
  }
  return false;
}

// 記事表示時のIntersectionObserver（リソース管理付き）
function setupLazyHoverEffects() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const item = entry.target;
      const thumb = item.querySelector('.p-postList__thumb');
      
      // console.log('LazyHover observer:', entry.isIntersecting ? 'ENTERING' : 'LEAVING', item);
      // console.log('Intersection ratio:', entry.intersectionRatio);
      
      if (entry.isIntersecting) {
        // 画面に入った場合：初期化とis--show発火処理
        // observer管理の準備完了フラグを設定
        item.dataset.observerReady = 'true';
        
        // 既にrenderReadyがtrueの場合の即座発火処理
        if (item.dataset.renderReady === 'true') {
          item.classList.add('is--show');
          
          const typingElement = item.querySelector('.js-typing');
          if (typingElement && item.dataset.typed !== 'true') {
            item.dataset.typed = 'true';
            typingElement.style.setProperty('opacity', '1');
            runTypingAnimation(typingElement);
          }
        }
        
        if (thumb) {
          // ハイブリッドアプローチ：保持されたCanvasがあれば表示
          if (showKeptCanvas(thumb)) {
            // 保持されたCanvasを表示した場合、is--showを即座に発火
            item.classList.add('is--show');
            
            const typingElement = item.querySelector('.js-typing');
            if (typingElement && item.dataset.typed !== 'true') {
              item.dataset.typed = 'true';
              typingElement.style.setProperty('opacity', '1');
              runTypingAnimation(typingElement);
            }
          } else {
            // 保持されたCanvasがない場合、通常の初期化
            initHoverEffectForThumb(thumb);
          }
        }
        
        // is--show発火はinitHoverEffectForThumb内で処理される
        
        // フォールバック：1秒後に未発火なら強制でis--show付与
        if (!forceShowTimers.has(item)) {
          const t = setTimeout(() => {
            forceShowTimers.delete(item);
            if (!item.classList.contains('is--show')) {
              item.classList.add('is--show');
              const typingElement = item.querySelector('.js-typing');
              if (typingElement && item.dataset.typed !== 'true') {
                item.dataset.typed = 'true';
                typingElement.style.setProperty('opacity', '1');
                runTypingAnimation(typingElement);
              }
              // console.log('Force-applied is--show due to delayed trigger:', item);
            }
          }, 1000);
          forceShowTimers.set(item, t);
        }
      } else {
        // 完全に画面外になった時のみ非表示（fade-out）+ Canvas保持
        if (entry.intersectionRatio === 0) {
          // フォールバックタイマーがあればクリア
          const ft = forceShowTimers.get(item);
          if (ft) {
            clearTimeout(ft);
            forceShowTimers.delete(item);
          }
          if (thumb && hoverEffectInstances.has(thumb)) {
            // hoverOutで1枚目に確実に戻してから非表示
            const he = hoverEffectInstances.get(thumb);
            if (he) {
              he.hoverOut(() => {
                // 1枚目描画完了後に非表示
                destroyHoverEffectForThumb(thumb, true); // keepCanvas = true
                keptCanvases.add(thumb);
                manageKeptCanvases(); // 保持数の制限チェック
              });
            }
          }
          // console.log('Item fully left viewport, hidden with fade-out:', item);
        }
      }
    });
  }, {
    // スマホはスクロールコンテナをrootにして安定検知
    root: window.innerWidth <= 767 ? document.querySelector('.p-postList') : null,
    // 表示用のしきい値（パッと表示/消えを避ける）
    rootMargin: window.innerWidth <= 767 ? '10%' : '0%',
    threshold: window.innerWidth <= 767 ? [0.08, 0.1, 0.6] : [0, 0.2]
  });

  // 全ての記事アイテムを監視
  document.querySelectorAll('.p-postList__item').forEach(item => {
    observer.observe(item);
  });
  
  // グローバル管理に追加
  window.intersectionObservers.add(observer);
}

// スマホでの自動ホバー効果管理
let mobileHoverTimers = new Map();
let currentVisibleItem = null;

// スマホでの自動ホバー効果開始
function startMobileAutoHover() {
  const isMobile = window.innerWidth <= 767;
  if (!isMobile) return;
  
  // スマホでの安全な自動ホバー処理
  console.log('Starting safe mobile auto-hover');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const item = entry.target;
      const thumb = item.querySelector('.p-postList__thumb');
      
      if (entry.isIntersecting) {
        // 新しいアイテムが表示されたら、前のタイマーをクリア
        if (currentVisibleItem && currentVisibleItem !== item) {
          clearMobileHoverTimer(currentVisibleItem);
        }
        currentVisibleItem = item;
        
        // n秒後に安全なWebGLホバー効果を開始
        const timer1 = setTimeout(() => {
          const hoverEffect = hoverEffectInstances.get(thumb);
          if (hoverEffect && hoverEffectInstances.has(thumb)) {
            try {
              // 安全なWebGLアニメーション（軽量設定）
              gsap.to(hoverEffect.uniforms.dispFactor, {
                value: 1,
                duration: 0.8, // より短い時間で軽量化
                ease: "power2.out", // 軽量なイージング
                onComplete: () => {
                  // アニメーション完了後の処理
                  console.log('Mobile hover animation completed');
                }
              });
              
              // さらに3秒後にホバー効果を解除
              const timer2 = setTimeout(() => {
                if (hoverEffect && hoverEffectInstances.has(thumb)) {
                  try {
                    gsap.to(hoverEffect.uniforms.dispFactor, {
                      value: 0,
                      duration: 0.8, // より短い時間で軽量化
                      ease: "power2.out", // 軽量なイージング
                      onComplete: () => {
                        // 解除後に再度タイマーを開始（ループ）
                        setTimeout(() => {
                          if (currentVisibleItem === item && hoverEffectInstances.has(thumb)) {
                            startMobileHoverCycle(item);
                          }
                        }, 4000);
                      }
                    });
                  } catch (error) {
                    console.warn('Error in mobile hover animation:', error);
                  }
                }
              }, 5000);
              
              mobileHoverTimers.set(item, timer2);
            } catch (error) {
              console.warn('Error starting mobile hover animation:', error);
            }
          }
        }, 4000);
        
        mobileHoverTimers.set(item, timer1);
      } else {
        // アイテムが画面から外れたらタイマーをクリア
        if (currentVisibleItem === item) {
          currentVisibleItem = null;
        }
        clearMobileHoverTimer(item);
      }
    });
  }, {
    root: null,
    // 自動ホバー用の監視もしきい値を穏当化
    threshold: window.innerWidth <= 767 ? 0.6 : 0.2
  });

  // 全ての記事アイテムを監視
  document.querySelectorAll('.p-postList__item').forEach(item => {
    observer.observe(item);
  });
  
  // グローバル管理に追加
  window.intersectionObservers.add(observer);
}

function clearMobileHoverTimer(item) {
  const timer = mobileHoverTimers.get(item);
  if (timer) {
    clearTimeout(timer);
    mobileHoverTimers.delete(item);
  }
  
  // WebGLアニメーションを安全に停止
  const thumb = item.querySelector('.p-postList__thumb');
  if (thumb) {
    const hoverEffect = hoverEffectInstances.get(thumb);
    if (hoverEffect && hoverEffect.uniforms && hoverEffect.uniforms.dispFactor) {
      try {
        gsap.killTweensOf(hoverEffect.uniforms.dispFactor);
      } catch (error) {
        console.warn('Error stopping mobile hover animation:', error);
      }
    }
  }
}

function startMobileHoverCycle(item) {
  const thumb = item.querySelector('.p-postList__thumb');
  const hoverEffect = hoverEffectInstances.get(thumb);
  if (!hoverEffect) return;

  try {
    // 安全なWebGLアニメーション（軽量設定）
    gsap.to(hoverEffect.uniforms.dispFactor, {
      value: 1,
      duration: 0.8, // より短い時間で軽量化
      ease: "power2.out", // 軽量なイージング
      onComplete: () => {
        setTimeout(() => {
          if (hoverEffect && currentVisibleItem === item) {
            try {
              gsap.to(hoverEffect.uniforms.dispFactor, {
                value: 0,
                duration: 0.8, // より短い時間で軽量化
                ease: "power2.out", // 軽量なイージング
                onComplete: () => {
                  setTimeout(() => {
                    if (currentVisibleItem === item) {
                      startMobileHoverCycle(item);
                    }
                  }, 4000);
                }
              });
            } catch (error) {
              console.warn('Error in mobile hover cycle:', error);
            }
          }
        }, 5000);
      }
    });
  } catch (error) {
    console.warn('Error starting mobile hover cycle:', error);
  }
}

// DistortionHoverEffect 初期化（遅延読み込みのみ）
function initDistortionEffects() {
  // 遅延読み込みの監視を開始
  setupLazyHoverEffects();
  
  // スマホでの自動ホバー処理を開始
  startMobileAutoHover();
}