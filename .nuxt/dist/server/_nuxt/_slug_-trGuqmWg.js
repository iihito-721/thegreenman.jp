import { defineComponent, withAsyncContext, computed, unref, useSSRContext } from "vue";
import { ssrRenderTeleport, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { u as useAsyncData, _ as _imports_0 } from "./asyncData-DUrUgTkv.js";
import { u as useRoute, c as createError } from "../server.mjs";
import "minimark/hast";
import "/Users/nats/Sites/thegreenman-dev/node_modules/hookable/dist/index.mjs";
import { u as useHead } from "./v3--g8tXPCi.js";
import "#internal/nuxt/paths";
import "/Users/nats/Sites/thegreenman-dev/node_modules/perfect-debounce/dist/index.mjs";
import "ofetch";
import "/Users/nats/Sites/thegreenman-dev/node_modules/unctx/dist/index.mjs";
import "/Users/nats/Sites/thegreenman-dev/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/nats/Sites/thegreenman-dev/node_modules/radix3/dist/index.mjs";
import "/Users/nats/Sites/thegreenman-dev/node_modules/defu/dist/defu.mjs";
import "/Users/nats/Sites/thegreenman-dev/node_modules/ufo/dist/index.mjs";
import "/Users/nats/Sites/thegreenman-dev/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b, _c, _d, _e;
    let __temp, __restore;
    const route = useRoute();
    const { data: article } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `article-${route.params.slug}`,
      () => $fetch("/api/posts").then(
        (posts) => posts.find((p) => p.slug === route.params.slug)
      )
    )), __temp = await __temp, __restore(), __temp);
    const { data: allPosts } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "all-posts",
      () => $fetch("/api/posts")
    )), __temp = await __temp, __restore(), __temp);
    const relatedPosts = computed(() => {
      if (!allPosts.value || !article.value) return [];
      const currentSlug = article.value.slug;
      const limit = 10;
      let filtered = allPosts.value.filter((post) => post.slug !== currentSlug);
      return filtered.slice(0, limit);
    });
    if (!article.value) {
      throw createError({
        statusCode: 404,
        statusMessage: "記事が見つかりません"
      });
    }
    useHead({
      title: (_a = article.value) == null ? void 0 : _a.title,
      meta: [
        { name: "description", content: (_b = article.value) == null ? void 0 : _b.description },
        { property: "og:title", content: (_c = article.value) == null ? void 0 : _c.title },
        { property: "og:description", content: (_d = article.value) == null ? void 0 : _d.description },
        { property: "og:image", content: (_e = article.value) == null ? void 0 : _e.cover }
      ]
    });
    function repeatText(text, count) {
      return text.repeat(count);
    }
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        var _a2, _b2, _c2, _d2, _e2;
        _push2(`<header class="p-headerSlug"><h1><svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 118.4 84.2"><path class="st0" d="M23.3 54h-3.8l-1-2.7c-1.6 2.2-4.3 3.1-6.9 3.1C4.1 54.4.1 48.7.1 41.6s.9-6.9 3-9.5C5.5 29 8.6 28 12.4 28c5.9 0 9.9 3 11 8.9l-7.6.8c-.3-2.1-1.2-4-3.5-4-3.6 0-3.8 4.9-3.8 7.5s0 3.4.7 4.7c.6 1.5 1.9 2.5 3.5 2.5s3.5-1.2 3.5-3.2H12v-5.4h11.5v14.3ZM34.9 54H27V28.4h13c2.2 0 4.7.3 6.6 1.6 2.1 1.3 3.1 3.6 3.1 6.1s-1.5 5.4-4.5 6.8l4.6 11.2h-8.7l-3.7-9.8h-2.5v9.8Zm0-15.2h2.9c1.7 0 3.8-.3 3.8-2.5s-.4-1.7-1.2-2.1c-.7-.3-1.5-.3-2.2-.3H35v4.9ZM71.7 54H52.5V28.4h19.2v5.9H60.2V38h9.3v5.7h-9.3v4.1h11.5v6.1ZM93.7 54H74.5V28.4h19.2v5.9H82.2V38h9.3v5.7h-9.3v4.1h11.5v6.1ZM112 54l-7.4-12-2.3-4.6v.4c.4 1.6.5 2.5.5 4.3V54h-6.4V28.4h7.4l8.6 14.3-.6-7.2v-7.1h6.4V54h-6.4ZM50.2 84.2h-7.3V65.9l-4.7 18.3h-5l-4.8-18.3v18.3h-5.9V58.6h10.3l3.7 13.6L40 58.6h10.3v25.6ZM67 79.1h-6.8l-1.6 5h-6.4l8-25.6h8.3l8 25.6h-8l-1.5-5Zm-1.3-5.6-2.1-7.4-2.1 7.4h4.2ZM93.9 84.2l-7.4-12-2.3-4.6v.4c.4 1.6.5 2.5.5 4.3v11.9h-6.4V58.6h7.4l8.6 14.3-.6-7.2v-7.1h6.4v25.6h-6.4ZM85.8 16.2c-.1-.2-.4-.3-.6-.2-3.8 1.8-6.4 0-7.3-.9-.4-.4-.8-.9-1.1-1.4 1.2-1.3 1.8-2.8 1.7-4.1 0-.2-.2-.4-.5-.4-1.7 0-2.4 1-2.6 1.6-.3.8-.2 1.8.2 2.8-.4.4-.9.8-1.5 1.1-1.7 1.1-4 1.8-5.6.8-.8-.5-.9-2-.9-3.4-.1-2.1-.2-4.7-2.7-5-1.3-.2-2.5.2-3.6 1v-.3c.3-.8.6-1.7.9-2.5 1.2-1.5 2.1-3.1 2.5-4.7 0-.2 0-.4-.2-.5-.2 0-.4 0-.6.1-1.1 1.4-1.9 3-2.5 4.7-4.3 5.4-12.4 9.3-14.9 9.4-.5 0-.5-.1-.6-.2-.2-.4-.1-1.1.2-2.1 1.2-1.9 2.3-3.8 3.2-5.6h2.6c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-2.1c.4-.9.8-1.7 1.1-2.4 0-.2 0-.5-.2-.6-.2-.1-.5 0-.6.1 0 0-.8 1.2-1.8 2.8H37.8c-.3 0-.5.2-.5.5s.2.5.5.5h10c-.9 1.6-1.8 3.5-2.4 5.1-2.4 3.6-5.3 7-8.2 7.7-.2 0-.4.3-.3.6 0 .2.2.4.5.4h.1c2.7-.6 5.3-3.2 7.6-6.3 0 .3 0 .6.2.8.2.3.6.7 1.4.7 2.4-.1 9.4-3.3 14-8 0 .1 0 .2-.1.4-.2.6-.4 1.2-.7 1.9-1.5 1.6-2.6 3.8-3.1 5.7 0 .2 0 .4.2.5.2.1.4 0 .6 0 1.5-1.6 2.4-3.7 3.1-5.7 1.2-1.2 2.6-2 4.1-1.8 1.6.2 1.8 1.7 1.9 4.1 0 1.7.2 3.4 1.4 4.2 2 1.2 4.7.4 6.6-.8.5-.3 1-.7 1.4-1.1.3.5.7.9 1.1 1.4 2.2 2.1 5.4 2.5 8.4 1.1.2-.1.3-.4.2-.6Zm-9.5-5.1c.2-.6.7-.8 1.3-.9 0 .8-.5 1.8-1.2 2.6-.2-.6-.2-1.2 0-1.7Z"></path></svg><span class="visually-hidden">The GREEN MAM</span></h1></header>`);
        if (unref(article)) {
          _push2(`<main class="main"><section class="c-mainContainer c-mainContainer--slug"><div class="p-post__top">the GREEN MAN</div><div class="p-post__back">&lt; Back</div><div class="p-postMV"><div class="p-postHeader"><div class="p-postHeader__meta"><p class="p-postHeader__title is--fred">${ssrInterpolate(repeatText(((_a2 = unref(article)) == null ? void 0 : _a2.bgtitle.trim()) + " ", 15))}</p><p class="p-postHeader__subtitle is--baby">${ssrInterpolate(repeatText((_b2 = unref(article)) == null ? void 0 : _b2.bgtext, 60))}</p></div><img${ssrRenderAttr("src", _imports_0)} alt="The GREEN MAM" width="500" height="500"></div><div class="p-postThumb"><div class="p-postThumb__svgWrap"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 449.8 43.7"><path class="st0" d="M151.7 43.1h-6.4l-1.7-4.5c-2.7 3.6-7.1 5.1-11.5 5.1-12.4 0-19-9.5-19-21.2s1.4-11.4 5-15.8c4-5.1 9.2-6.8 15.4-6.8 9.8 0 16.4 5 18.3 14.7l-12.6 1.3c-.5-3.4-1.9-6.6-5.9-6.6-6 0-6.4 8.1-6.4 12.4s.1 5.6 1.1 7.8c1.1 2.5 3.1 4.1 5.8 4.1s5.8-2 5.8-5.4h-7v-9h19.1V43ZM171 43.1h-13.2V.6h21.6c3.7 0 7.8.5 11 2.6 3.5 2.2 5.2 6 5.2 10.2s-2.5 8.9-7.5 11.2l7.7 18.5h-14.5l-6.2-16.2H171v16.2Zm0-25.3h4.8c2.8 0 6.3-.4 6.3-4.1s-.7-2.8-2-3.5c-1.1-.6-2.5-.6-3.7-.6h-5.3v8.1ZM232 43.1h-31.9V.6H232v9.8h-19.1v6.2h15.5v9.5h-15.5V33H232v10.2ZM268.5 43.1h-31.9V.6h31.9v9.8h-19.1v6.2h15.5v9.5h-15.5V33h19.1v10.2ZM298.9 43.1l-12.2-19.9-3.8-7.7h-.1c0 .1.1.6.1.6.6 2.7.9 4.2.9 7.1V43h-10.6V.6h12.3l14.2 23.7h.1c0-.1-.9-11.9-.9-11.9V.6h10.6v42.5h-10.7ZM366.6 43.1h-12.1V12.8h-.1l-7.7 30.3h-8.3l-8-30.3h-.1v30.3h-9.8V.6h17l6.1 22.5h.1L349.5.6h17.2v42.5ZM394.5 34.7h-11.3l-2.6 8.4H370L383.2.6H397l13.3 42.5H397l-2.4-8.4Zm-2.2-9.2-3.5-12.3-3.5 12.3h6.9ZM439.2 43.1 427 23.2l-3.8-7.7h-.1c0 .1.1.6.1.6.6 2.7.9 4.2.9 7.1V43h-10.6V.6h12.3L440 24.3h.1c0-.1-.9-11.9-.9-11.9V.6h10.6v42.5h-10.7ZM98.3 35.4c-.2-.5-.8-.7-1.2-.5-7.7 3.6-12.9 0-14.7-1.8-.9-.8-1.6-1.8-2.2-2.7 2.4-2.6 3.7-5.6 3.4-8.2 0-.5-.5-.8-1-.8-3.5.1-4.7 2-5.2 3.2-.6 1.6-.4 3.6.4 5.5-.9.8-1.9 1.6-3 2.3-3.3 2.1-8 3.7-11.3 1.7-1.6-1-1.7-4-1.9-6.9-.2-4.2-.5-9.3-5.4-10-2.6-.3-5.1.5-7.3 2 0-.2.1-.4.2-.5l1.8-5.1c2.3-3 4.1-6.1 5.1-9.5.1-.4 0-.9-.5-1.1-.4-.2-.9 0-1.2.2-2.2 2.8-3.8 6-5.1 9.3-8.7 10.8-24.9 18.6-29.9 18.9-.9 0-1.1-.3-1.2-.4-.4-.8-.2-2.3.4-4.2 2.4-3.7 4.6-7.6 6.4-11.1h5.2c.5 0 .9-.4.9-.9s-.4-.9-.9-.9h-4.3c.8-1.7 1.6-3.4 2.2-4.8.2-.4 0-.9-.4-1.2-.4-.2-.9 0-1.2.3 0 0-1.6 2.4-3.6 5.7H1.9c-.5 0-.9.4-.9.9s.4.9.9.9h20c-1.8 3.2-3.7 6.9-4.7 10.1-4.8 7.3-10.6 14-16.5 15.3-.5.1-.8.6-.7 1.1.1.4.5.7.9.7h.2c5.3-1.2 10.6-6.4 15.2-12.6 0 .6.2 1.2.4 1.7.4.7 1.2 1.5 2.9 1.4 4.9-.3 18.7-6.7 28.1-16.1 0 .2-.2.5-.3.7-.4 1.3-.9 2.5-1.3 3.7-3 3.3-5.2 7.7-6.2 11.5-.1.4 0 .9.5 1.1.4.2.9.1 1.1-.2 2.9-3.3 4.8-7.3 6.3-11.5 2.4-2.5 5.2-4 8.3-3.6 3.2.4 3.5 3.4 3.8 8.2.2 3.4.3 6.9 2.7 8.4 4 2.4 9.4.7 13.2-1.7 1-.7 2-1.4 2.9-2.2.6 1 1.4 1.9 2.3 2.7 4.5 4.1 10.7 4.9 16.8 2.1.5-.2.7-.8.5-1.2ZM79.2 25.2c.4-1.2 1.5-1.7 2.5-1.9-.1 1.7-1 3.5-2.4 5.2-.4-1.2-.5-2.4-.1-3.4Z"></path></svg></div><img class="p-postThumb__img c-imageContainer"${ssrRenderAttr("src", unref(article).cover)} alt=""></div></div><div class="p-postINFO"><div class="p-postTitle"><p class="p-postTitle__title">${((_d2 = (_c2 = unref(article)) == null ? void 0 : _c2.copyText) == null ? void 0 : _d2.replace(/\n/g, "<br>")) ?? ""}</p><p class="p-postTitle__date">${ssrInterpolate(unref(article).date)}</p></div><div class="p-postContents"><div>${((_e2 = unref(article)) == null ? void 0 : _e2.content) ?? ""}</div></div></div></section><section class="p-related" data-tag="all" data-limit="10"><div class="p-related__inner"><h2 class="p-related__title">posts</h2><ul class="p-related__list"><!--[-->`);
          ssrRenderList(unref(relatedPosts), (relatedPost) => {
            _push2(`<li class="p-related__item"><a${ssrRenderAttr("href", relatedPost._path)} class="p-related__link"><div class="p-related__thumb"><img${ssrRenderAttr("src", relatedPost.cover)}${ssrRenderAttr("alt", relatedPost.title)} class="p-related__img"></div><div class="p-related__body"><h3 class="p-related__itemTitle">${ssrInterpolate(relatedPost.title)}</h3></div></a></li>`);
          });
          _push2(`<!--]--></ul></div></section><footer class="c-footer"><p class="c-cp">©︎ The GREEN MAM</p></footer></main>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/the-rocker-room/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_slug_-trGuqmWg.js.map
