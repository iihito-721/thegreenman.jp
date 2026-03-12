<template>

<teleport to="body" v-cloak>
	    
    <header class="p-headerSlug">
		<h1>
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 118.4 84.2">
			<path class="st0" d="M23.3 54h-3.8l-1-2.7c-1.6 2.2-4.3 3.1-6.9 3.1C4.1 54.4.1 48.7.1 41.6s.9-6.9 3-9.5C5.5 29 8.6 28 12.4 28c5.9 0 9.9 3 11 8.9l-7.6.8c-.3-2.1-1.2-4-3.5-4-3.6 0-3.8 4.9-3.8 7.5s0 3.4.7 4.7c.6 1.5 1.9 2.5 3.5 2.5s3.5-1.2 3.5-3.2H12v-5.4h11.5v14.3ZM34.9 54H27V28.4h13c2.2 0 4.7.3 6.6 1.6 2.1 1.3 3.1 3.6 3.1 6.1s-1.5 5.4-4.5 6.8l4.6 11.2h-8.7l-3.7-9.8h-2.5v9.8Zm0-15.2h2.9c1.7 0 3.8-.3 3.8-2.5s-.4-1.7-1.2-2.1c-.7-.3-1.5-.3-2.2-.3H35v4.9ZM71.7 54H52.5V28.4h19.2v5.9H60.2V38h9.3v5.7h-9.3v4.1h11.5v6.1ZM93.7 54H74.5V28.4h19.2v5.9H82.2V38h9.3v5.7h-9.3v4.1h11.5v6.1ZM112 54l-7.4-12-2.3-4.6v.4c.4 1.6.5 2.5.5 4.3V54h-6.4V28.4h7.4l8.6 14.3-.6-7.2v-7.1h6.4V54h-6.4ZM50.2 84.2h-7.3V65.9l-4.7 18.3h-5l-4.8-18.3v18.3h-5.9V58.6h10.3l3.7 13.6L40 58.6h10.3v25.6ZM67 79.1h-6.8l-1.6 5h-6.4l8-25.6h8.3l8 25.6h-8l-1.5-5Zm-1.3-5.6-2.1-7.4-2.1 7.4h4.2ZM93.9 84.2l-7.4-12-2.3-4.6v.4c.4 1.6.5 2.5.5 4.3v11.9h-6.4V58.6h7.4l8.6 14.3-.6-7.2v-7.1h6.4v25.6h-6.4ZM85.8 16.2c-.1-.2-.4-.3-.6-.2-3.8 1.8-6.4 0-7.3-.9-.4-.4-.8-.9-1.1-1.4 1.2-1.3 1.8-2.8 1.7-4.1 0-.2-.2-.4-.5-.4-1.7 0-2.4 1-2.6 1.6-.3.8-.2 1.8.2 2.8-.4.4-.9.8-1.5 1.1-1.7 1.1-4 1.8-5.6.8-.8-.5-.9-2-.9-3.4-.1-2.1-.2-4.7-2.7-5-1.3-.2-2.5.2-3.6 1v-.3c.3-.8.6-1.7.9-2.5 1.2-1.5 2.1-3.1 2.5-4.7 0-.2 0-.4-.2-.5-.2 0-.4 0-.6.1-1.1 1.4-1.9 3-2.5 4.7-4.3 5.4-12.4 9.3-14.9 9.4-.5 0-.5-.1-.6-.2-.2-.4-.1-1.1.2-2.1 1.2-1.9 2.3-3.8 3.2-5.6h2.6c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-2.1c.4-.9.8-1.7 1.1-2.4 0-.2 0-.5-.2-.6-.2-.1-.5 0-.6.1 0 0-.8 1.2-1.8 2.8H37.8c-.3 0-.5.2-.5.5s.2.5.5.5h10c-.9 1.6-1.8 3.5-2.4 5.1-2.4 3.6-5.3 7-8.2 7.7-.2 0-.4.3-.3.6 0 .2.2.4.5.4h.1c2.7-.6 5.3-3.2 7.6-6.3 0 .3 0 .6.2.8.2.3.6.7 1.4.7 2.4-.1 9.4-3.3 14-8 0 .1 0 .2-.1.4-.2.6-.4 1.2-.7 1.9-1.5 1.6-2.6 3.8-3.1 5.7 0 .2 0 .4.2.5.2.1.4 0 .6 0 1.5-1.6 2.4-3.7 3.1-5.7 1.2-1.2 2.6-2 4.1-1.8 1.6.2 1.8 1.7 1.9 4.1 0 1.7.2 3.4 1.4 4.2 2 1.2 4.7.4 6.6-.8.5-.3 1-.7 1.4-1.1.3.5.7.9 1.1 1.4 2.2 2.1 5.4 2.5 8.4 1.1.2-.1.3-.4.2-.6Zm-9.5-5.1c.2-.6.7-.8 1.3-.9 0 .8-.5 1.8-1.2 2.6-.2-.6-.2-1.2 0-1.7Z"/></svg>
			<span class="visually-hidden">The GREEN MAM</span>
		</h1>
    </header>
    
	<main class="main" v-if="article" >
		<section class="c-mainContainer c-mainContainer--slug">
			<div class="p-post__top" @click="navigateToTop">the GREEN MAN</div>
			<div class="p-post__back" @click="navigateBack">< Back</div>

			<div class="p-postMV">
				<div class="p-postHeader">
					<div class="p-postHeader__meta">
						<p class="p-postHeader__title is--fred">{{ repeatText(article?.bgtitle.trim() + ' ', 15) }}</p>
						<p class="p-postHeader__subtitle is--baby">{{ repeatText(article?.bgtext, 60) }}</p>
					</div>
					<img src="/images/logo.gif" alt="The GREEN MAM" width="500" height="500">
				</div>
				
				<div class="p-postThumb">
					<div class="p-postThumb__svgWrap">
						<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 449.8 43.7"><path class="st0" d="M151.7 43.1h-6.4l-1.7-4.5c-2.7 3.6-7.1 5.1-11.5 5.1-12.4 0-19-9.5-19-21.2s1.4-11.4 5-15.8c4-5.1 9.2-6.8 15.4-6.8 9.8 0 16.4 5 18.3 14.7l-12.6 1.3c-.5-3.4-1.9-6.6-5.9-6.6-6 0-6.4 8.1-6.4 12.4s.1 5.6 1.1 7.8c1.1 2.5 3.1 4.1 5.8 4.1s5.8-2 5.8-5.4h-7v-9h19.1V43ZM171 43.1h-13.2V.6h21.6c3.7 0 7.8.5 11 2.6 3.5 2.2 5.2 6 5.2 10.2s-2.5 8.9-7.5 11.2l7.7 18.5h-14.5l-6.2-16.2H171v16.2Zm0-25.3h4.8c2.8 0 6.3-.4 6.3-4.1s-.7-2.8-2-3.5c-1.1-.6-2.5-.6-3.7-.6h-5.3v8.1ZM232 43.1h-31.9V.6H232v9.8h-19.1v6.2h15.5v9.5h-15.5V33H232v10.2ZM268.5 43.1h-31.9V.6h31.9v9.8h-19.1v6.2h15.5v9.5h-15.5V33h19.1v10.2ZM298.9 43.1l-12.2-19.9-3.8-7.7h-.1c0 .1.1.6.1.6.6 2.7.9 4.2.9 7.1V43h-10.6V.6h12.3l14.2 23.7h.1c0-.1-.9-11.9-.9-11.9V.6h10.6v42.5h-10.7ZM366.6 43.1h-12.1V12.8h-.1l-7.7 30.3h-8.3l-8-30.3h-.1v30.3h-9.8V.6h17l6.1 22.5h.1L349.5.6h17.2v42.5ZM394.5 34.7h-11.3l-2.6 8.4H370L383.2.6H397l13.3 42.5H397l-2.4-8.4Zm-2.2-9.2-3.5-12.3-3.5 12.3h6.9ZM439.2 43.1 427 23.2l-3.8-7.7h-.1c0 .1.1.6.1.6.6 2.7.9 4.2.9 7.1V43h-10.6V.6h12.3L440 24.3h.1c0-.1-.9-11.9-.9-11.9V.6h10.6v42.5h-10.7ZM98.3 35.4c-.2-.5-.8-.7-1.2-.5-7.7 3.6-12.9 0-14.7-1.8-.9-.8-1.6-1.8-2.2-2.7 2.4-2.6 3.7-5.6 3.4-8.2 0-.5-.5-.8-1-.8-3.5.1-4.7 2-5.2 3.2-.6 1.6-.4 3.6.4 5.5-.9.8-1.9 1.6-3 2.3-3.3 2.1-8 3.7-11.3 1.7-1.6-1-1.7-4-1.9-6.9-.2-4.2-.5-9.3-5.4-10-2.6-.3-5.1.5-7.3 2 0-.2.1-.4.2-.5l1.8-5.1c2.3-3 4.1-6.1 5.1-9.5.1-.4 0-.9-.5-1.1-.4-.2-.9 0-1.2.2-2.2 2.8-3.8 6-5.1 9.3-8.7 10.8-24.9 18.6-29.9 18.9-.9 0-1.1-.3-1.2-.4-.4-.8-.2-2.3.4-4.2 2.4-3.7 4.6-7.6 6.4-11.1h5.2c.5 0 .9-.4.9-.9s-.4-.9-.9-.9h-4.3c.8-1.7 1.6-3.4 2.2-4.8.2-.4 0-.9-.4-1.2-.4-.2-.9 0-1.2.3 0 0-1.6 2.4-3.6 5.7H1.9c-.5 0-.9.4-.9.9s.4.9.9.9h20c-1.8 3.2-3.7 6.9-4.7 10.1-4.8 7.3-10.6 14-16.5 15.3-.5.1-.8.6-.7 1.1.1.4.5.7.9.7h.2c5.3-1.2 10.6-6.4 15.2-12.6 0 .6.2 1.2.4 1.7.4.7 1.2 1.5 2.9 1.4 4.9-.3 18.7-6.7 28.1-16.1 0 .2-.2.5-.3.7-.4 1.3-.9 2.5-1.3 3.7-3 3.3-5.2 7.7-6.2 11.5-.1.4 0 .9.5 1.1.4.2.9.1 1.1-.2 2.9-3.3 4.8-7.3 6.3-11.5 2.4-2.5 5.2-4 8.3-3.6 3.2.4 3.5 3.4 3.8 8.2.2 3.4.3 6.9 2.7 8.4 4 2.4 9.4.7 13.2-1.7 1-.7 2-1.4 2.9-2.2.6 1 1.4 1.9 2.3 2.7 4.5 4.1 10.7 4.9 16.8 2.1.5-.2.7-.8.5-1.2ZM79.2 25.2c.4-1.2 1.5-1.7 2.5-1.9-.1 1.7-1 3.5-2.4 5.2-.4-1.2-.5-2.4-.1-3.4Z"/></svg>
          </div>
					<img class="p-postThumb__img c-imageContainer" :src="article.cover" alt="">
				</div>
			</div>

			<div class="p-postINFO">
				<div class="p-postTitle">
					<p class="p-postTitle__title" v-html="article?.copyText?.replace(/\n/g, '<br>')"></p>
					<p class="p-postTitle__date">{{ article.date }}</p>
				</div>

				<div class="p-postContents">
					<div v-html="article?.content"></div>
				</div>
			</div>
			
		</section>
		
		<section class="p-related" data-tag="all" data-limit="10">
			<div class="p-related__inner">
				<h2 class="p-related__title">posts</h2>
				<ul class="p-related__list">
					<li v-for="relatedPost in relatedPosts" :key="relatedPost.slug" class="p-related__item">
						<a :href="relatedPost._path" class="p-related__link">
							<div class="p-related__thumb">
								<img :src="relatedPost.cover" :alt="relatedPost.title" class="p-related__img">
							</div>
							<div class="p-related__body">
								<!-- <p class="p-related__date">{{ relatedPost.date }}</p> -->
								<h3 class="p-related__itemTitle">{{ relatedPost.title }}</h3>
								<!-- <p class="p-related__desc">{{ relatedPost.description }}</p> -->
								<!-- <div class="p-related__tags">
									<span v-for="tag in relatedPost.tags" :key="tag" class="p-related__tag">{{ tag }}</span>
								</div> -->
							</div>
						</a>
					</li>
				</ul>
			</div>
		</section>
		
		<footer class="c-footer">
			<p class="c-cp">©︎ The GREEN MAM</p>
		</footer>
		
	</main>

</teleport>

</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useAsyncData, queryCollection, createError } from '#imports'
import { useHead } from '#imports'

const route = useRoute()
const { data: article } = await useAsyncData(`article-${route.params.slug}`, () => 
  $fetch('/api/posts').then((posts: any[]) => 
    posts.find(p => p.slug === route.params.slug)
  )
)

// 全記事データを取得
const { data: allPosts } = await useAsyncData('all-posts', () => 
  $fetch('/api/posts') as Promise<any[]>
)

// 関連記事を計算（リアクティブ）
const relatedPosts = computed(() => {
  if (!allPosts.value || !article.value) return []
  
  const currentSlug = article.value.slug
  const filterTag = 'all' // data属性から取得する予定（今はハードコード）
  const limit = 10 // data属性から取得する予定（今はハードコード）
  
  let filtered = allPosts.value.filter(post => post.slug !== currentSlug)
  
  // タグでフィルタリング（'all'以外の場合）
  if (filterTag !== 'all') {
    filtered = filtered.filter(post => 
      post.tags && post.tags.includes(filterTag)
    )
  }
  
  // 表示数を制限
  return filtered.slice(0, limit)
})

// 記事が見つからない場合は404エラーを表示
if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '記事が見つかりません',
  })
}

// SEO対策
useHead({
  title: article.value?.title,
  meta: [
    { name: 'description', content: article.value?.description },
    { property: 'og:title', content: article.value?.title },
    { property: 'og:description', content: article.value?.description },
    { property: 'og:image', content: article.value?.cover }
  ]
})

const factor = 0.1
const DEFAULT_COLOR = '#eee' // デフォルト色を一元管理
let colorOptions = {
  mostFrequent: DEFAULT_COLOR,
  brightest: DEFAULT_COLOR, 
  mostSaturated: DEFAULT_COLOR,
  complementary: DEFAULT_COLOR,
  darkest: DEFAULT_COLOR
}

const onScroll = () => {
  window.requestAnimationFrame(() => {
    document.querySelectorAll<SVGElement>('.p-postThumb__svgWrap').forEach(svg => {
      const rect = svg.getBoundingClientRect()
      const offset = (rect.top - window.innerHeight / 2) * factor
      svg.style.transform = `translateY(${offset}px)`
    })
    
    // コンテンツ要素の位置をチェック
    const contentEl = document.querySelector('.p-postContents')
    if (contentEl) {
      const rect = contentEl.getBoundingClientRect()
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        document.body.classList.add('is--slug-content')
      } else {
        document.body.classList.remove('is--slug-content')
      }
    }
  })
}

onMounted(async () => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  
  // 画像から4つの色を取得
  if (article.value?.cover) {
    try {
      colorOptions = await getColorOptions(article.value.cover)
      console.log('Color options:', colorOptions)
      
      // 色オプションをグローバルに保存（後で手動調整用）
      ;(window as any).colorOptions = colorOptions
      
      // CSS変数として:rootに設定
      const root = document.documentElement
      root.style.setProperty('--color-most-frequent', colorOptions.mostFrequent)
      root.style.setProperty('--color-brightest', colorOptions.brightest)
      root.style.setProperty('--color-most-saturated', colorOptions.mostSaturated)
      root.style.setProperty('--color-complementary', colorOptions.complementary)
      root.style.setProperty('--color-darkest', colorOptions.darkest)
      
    } catch (error) {
      console.error('Error getting color options:', error)
    }
  }

})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function repeatText(text: string, count: number): string {
  return text.repeat(count)
}

const navigateToTop = () => {
  window.location.href = '/'
}

const navigateBack = () => {
  window.history.back()
}

// 補色を計算する関数
function getComplementaryColor(hexColor: string): string {
  // #を除去してRGB値を取得
  const hex = hexColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  
  // 補色を計算（255から各値を引く）
  const complementaryR = (255 - r).toString(16).padStart(2, '0')
  const complementaryG = (255 - g).toString(16).padStart(2, '0')
  const complementaryB = (255 - b).toString(16).padStart(2, '0')
  
  return `#${complementaryR}${complementaryG}${complementaryB}`
}

// 画像から5つの異なる色を取得する関数
function getColorOptions(imageSrc: string): Promise<{
  mostFrequent: string,
  brightest: string,
  mostSaturated: string,
  complementary: string,
  darkest: string
}> {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        resolve({
          mostFrequent: DEFAULT_COLOR,
          brightest: DEFAULT_COLOR,
          mostSaturated: DEFAULT_COLOR,
          complementary: DEFAULT_COLOR,
          darkest: DEFAULT_COLOR
        })
        return
      }
      
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      
      // 色の出現回数をカウント
      const colorCounts: { [key: string]: number } = {}
      const colorInfo: { [key: string]: { r: number, g: number, b: number, brightness: number, saturation: number } } = {}
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        
        // グレースケールを除外し、彩度の高い色のみを対象
        const saturation = Math.max(r, g, b) - Math.min(r, g, b)
        if (saturation > 30) {
          const color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
          colorCounts[color] = (colorCounts[color] || 0) + 1
          
          if (!colorInfo[color]) {
            const brightness = (r * 299 + g * 587 + b * 114) / 1000
            colorInfo[color] = {
              r, g, b,
              brightness,
              saturation
            }
          }
        }
      }
      
      // 1. 最も出現回数の多い色
      let mostFrequent = DEFAULT_COLOR
      let maxCount = 0
      for (const [color, count] of Object.entries(colorCounts)) {
        if (count > maxCount) {
          maxCount = count
          mostFrequent = color
        }
      }
      
      // 2. 最も明るい色
      let brightest = DEFAULT_COLOR
      let maxBrightness = 0
      for (const [color, info] of Object.entries(colorInfo)) {
        if (info.brightness > maxBrightness) {
          maxBrightness = info.brightness
          brightest = color
        }
      }
      
      // 3. 最も彩度の高い色
      let mostSaturated = DEFAULT_COLOR
      let maxSaturation = 0
      for (const [color, info] of Object.entries(colorInfo)) {
        if (info.saturation > maxSaturation) {
          maxSaturation = info.saturation
          mostSaturated = color
        }
      }
      
      // 4. 最も暗い色
      let darkest = DEFAULT_COLOR
      let minBrightness = 255
      for (const [color, info] of Object.entries(colorInfo)) {
        if (info.brightness < minBrightness) {
          minBrightness = info.brightness
          darkest = color
        }
      }
      
      // 補色を計算
      const complementary = getComplementaryColor(mostSaturated)
      
      resolve({
        mostFrequent,
        brightest,
        mostSaturated,
        complementary,
        darkest
      })
    }
    
    img.onerror = () => {
      resolve({
        mostFrequent: DEFAULT_COLOR,
        brightest: DEFAULT_COLOR,
        mostSaturated: DEFAULT_COLOR,
        complementary: DEFAULT_COLOR,
        darkest: DEFAULT_COLOR
      })
    }
    
    img.src = imageSrc
  })
}
</script>