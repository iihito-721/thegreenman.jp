<template>

<teleport to="body" v-cloak>
	    
    <header>
		<h1>
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 118.4 84.2">
			<path class="st0" d="M23.3 54h-3.8l-1-2.7c-1.6 2.2-4.3 3.1-6.9 3.1C4.1 54.4.1 48.7.1 41.6s.9-6.9 3-9.5C5.5 29 8.6 28 12.4 28c5.9 0 9.9 3 11 8.9l-7.6.8c-.3-2.1-1.2-4-3.5-4-3.6 0-3.8 4.9-3.8 7.5s0 3.4.7 4.7c.6 1.5 1.9 2.5 3.5 2.5s3.5-1.2 3.5-3.2H12v-5.4h11.5v14.3ZM34.9 54H27V28.4h13c2.2 0 4.7.3 6.6 1.6 2.1 1.3 3.1 3.6 3.1 6.1s-1.5 5.4-4.5 6.8l4.6 11.2h-8.7l-3.7-9.8h-2.5v9.8Zm0-15.2h2.9c1.7 0 3.8-.3 3.8-2.5s-.4-1.7-1.2-2.1c-.7-.3-1.5-.3-2.2-.3H35v4.9ZM71.7 54H52.5V28.4h19.2v5.9H60.2V38h9.3v5.7h-9.3v4.1h11.5v6.1ZM93.7 54H74.5V28.4h19.2v5.9H82.2V38h9.3v5.7h-9.3v4.1h11.5v6.1ZM112 54l-7.4-12-2.3-4.6v.4c.4 1.6.5 2.5.5 4.3V54h-6.4V28.4h7.4l8.6 14.3-.6-7.2v-7.1h6.4V54h-6.4ZM50.2 84.2h-7.3V65.9l-4.7 18.3h-5l-4.8-18.3v18.3h-5.9V58.6h10.3l3.7 13.6L40 58.6h10.3v25.6ZM67 79.1h-6.8l-1.6 5h-6.4l8-25.6h8.3l8 25.6h-8l-1.5-5Zm-1.3-5.6-2.1-7.4-2.1 7.4h4.2ZM93.9 84.2l-7.4-12-2.3-4.6v.4c.4 1.6.5 2.5.5 4.3v11.9h-6.4V58.6h7.4l8.6 14.3-.6-7.2v-7.1h6.4v25.6h-6.4ZM85.8 16.2c-.1-.2-.4-.3-.6-.2-3.8 1.8-6.4 0-7.3-.9-.4-.4-.8-.9-1.1-1.4 1.2-1.3 1.8-2.8 1.7-4.1 0-.2-.2-.4-.5-.4-1.7 0-2.4 1-2.6 1.6-.3.8-.2 1.8.2 2.8-.4.4-.9.8-1.5 1.1-1.7 1.1-4 1.8-5.6.8-.8-.5-.9-2-.9-3.4-.1-2.1-.2-4.7-2.7-5-1.3-.2-2.5.2-3.6 1v-.3c.3-.8.6-1.7.9-2.5 1.2-1.5 2.1-3.1 2.5-4.7 0-.2 0-.4-.2-.5-.2 0-.4 0-.6.1-1.1 1.4-1.9 3-2.5 4.7-4.3 5.4-12.4 9.3-14.9 9.4-.5 0-.5-.1-.6-.2-.2-.4-.1-1.1.2-2.1 1.2-1.9 2.3-3.8 3.2-5.6h2.6c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-2.1c.4-.9.8-1.7 1.1-2.4 0-.2 0-.5-.2-.6-.2-.1-.5 0-.6.1 0 0-.8 1.2-1.8 2.8H37.8c-.3 0-.5.2-.5.5s.2.5.5.5h10c-.9 1.6-1.8 3.5-2.4 5.1-2.4 3.6-5.3 7-8.2 7.7-.2 0-.4.3-.3.6 0 .2.2.4.5.4h.1c2.7-.6 5.3-3.2 7.6-6.3 0 .3 0 .6.2.8.2.3.6.7 1.4.7 2.4-.1 9.4-3.3 14-8 0 .1 0 .2-.1.4-.2.6-.4 1.2-.7 1.9-1.5 1.6-2.6 3.8-3.1 5.7 0 .2 0 .4.2.5.2.1.4 0 .6 0 1.5-1.6 2.4-3.7 3.1-5.7 1.2-1.2 2.6-2 4.1-1.8 1.6.2 1.8 1.7 1.9 4.1 0 1.7.2 3.4 1.4 4.2 2 1.2 4.7.4 6.6-.8.5-.3 1-.7 1.4-1.1.3.5.7.9 1.1 1.4 2.2 2.1 5.4 2.5 8.4 1.1.2-.1.3-.4.2-.6Zm-9.5-5.1c.2-.6.7-.8 1.3-.9 0 .8-.5 1.8-1.2 2.6-.2-.6-.2-1.2 0-1.7Z"/></svg>
			<span class="visually-hidden">The GREEN MAM</span>
		</h1>
    </header>

    <div class="c-floating-green">
		<img src="/images/logo.gif" alt="The GREEN MAM" width="500" height="500">
    </div>

    <main class="main">
		<section class="c-mainContainer">
			<div class="p-post__next" :class="{ 'is--hide': isLastItemReached }">NEXT<span><</span><span><</span><span><</span></div>
		
			<ul class="p-postList">
			<li v-for="post in posts" :key="post._path" class="p-postList__item">
				<div class="p-postList__meta">
					<p class="p-postList__title is--fred js-repeat-text">{{ repeatText(post.bgtitle.trim() + ' ', 10) }}</p>
					<p class="p-postList__subtitle is--baby js-repeat-text">{{ repeatText(post.bgtext, 60) }}</p>
				</div>
				<a :href="post._path" class="p-postList__thumb c-imageWrap" :data-displacement="`/images/displacement/${post.displacement}.jpg`" data-intensity="-0.65" data-speedIn="1.2" data-speedOut="1.2">
					<img class="p-postList__img c-imageContainer" :src="post.cover" :alt="post.title">
					<img class="p-postList__img c-imageContainer" :src="post.hover" :alt="post.title">
				</a>
				<div class="p-postList__body">
					<p class="p-postList__text js-typing" v-html="post.copyText"></p>
					<p class="p-postList__date">{{ post.date }}</p>
				</div>
			</li>
			</ul>
		</section>

		<footer class="c-footer">
			<p class="c-cp">©︎ The GREEN MAM</p>
		</footer>

    </main>

  </teleport>

</template>

<script setup lang="ts">
useHead({
  title: 'The GREEN MAM',
  meta: [
    { name: 'viewport', content: 'width=device-width' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'copyright', content: '© The GREEN MAM' },
    { property: 'og:title', content: 'The GREEN MAM' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: 'https://thegreenman.jp/' },
    { property: 'og:image', content: 'https://thegreenman.jp/ogp.png' },
    { property: 'og:site_name', content: 'The GREEN MAM' },
    { property: 'og:locale', content: 'ja_JP' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [
    { rel: 'apple-touch-icon', href: 'https://thegreenman.jp//apple-touch-icon.png', sizes: '144x144' },
    { rel: 'shortcut icon', href: 'https://thegreenman.jp/favicon.ico' }
  ]
})

function repeatText(text: string, count: number): string {
  return text.repeat(count)
}

interface Post {
  [x: string]:
  /// <reference types="../node_modules/.vue-global-types/vue_3.5_0.d.ts" />
  any;
  _path: string;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  date: string;
  cover: string;
  hover: string;
  copyText: string;
  content: string;
}

const { data: posts } = await useAsyncData('posts', () => 
  $fetch('/api/posts') as Promise<Post[]>
)

const isLastItemReached = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isLastItemReached.value = entry.isIntersecting
      })
    },
    {
      threshold: 0.5
    }
  )

  nextTick(() => {
    const postItems = document.querySelectorAll('.p-postList__item')
    if (postItems.length > 0) {
      const lastItem = postItems[postItems.length - 1]
      observer.observe(lastItem)
    }
  })

  onUnmounted(() => {
    observer.disconnect()
    
    // グローバルなクリーンアップ（メモリリーク防止）
    if (typeof window !== 'undefined') {
      // 全てのHoverEffectインスタンスを破棄
      if (window.hoverEffectInstances) {
        window.hoverEffectInstances.forEach((effect, el) => {
          try {
            effect.destroy()
          } catch (error) {
            console.warn('Error destroying HoverEffect:', error)
          }
        })
        window.hoverEffectInstances.clear()
      }
      
      // 全てのIntersectionObserverを切断
      if (window.intersectionObservers) {
        window.intersectionObservers.forEach(observer => {
          try {
            observer.disconnect()
          } catch (error) {
            console.warn('Error disconnecting observer:', error)
          }
        })
        window.intersectionObservers.clear()
      }
      
      // GSAPアニメーションのクリア
      if (typeof gsap !== 'undefined') {
        gsap.killTweensOf('*')
      }
    }
  })
})


</script>
