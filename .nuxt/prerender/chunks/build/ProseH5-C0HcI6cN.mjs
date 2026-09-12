import { computed, mergeProps, unref, useSSRContext } from 'file:///Users/nats/Sites/thegreenman-dev/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderSlot } from 'file:///Users/nats/Sites/thegreenman-dev/node_modules/vue/server-renderer/index.mjs';
import { e as useRuntimeConfig } from './server.mjs';
import 'file:///Users/nats/Sites/thegreenman-dev/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/nats/Sites/thegreenman-dev/node_modules/h3/dist/index.mjs';
import 'file:///Users/nats/Sites/thegreenman-dev/node_modules/ufo/dist/index.mjs';
import 'file:///Users/nats/Sites/thegreenman-dev/node_modules/destr/dist/index.mjs';
import 'file:///Users/nats/Sites/thegreenman-dev/node_modules/hookable/dist/index.mjs';
import 'file:///Users/nats/Sites/thegreenman-dev/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/nats/Sites/thegreenman-dev/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/nats/Sites/thegreenman-dev/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/nats/Sites/thegreenman-dev/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/nats/Sites/thegreenman-dev/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/nats/Sites/thegreenman-dev/node_modules/ohash/dist/index.mjs';
import 'file:///Users/nats/Sites/thegreenman-dev/node_modules/klona/dist/index.mjs';
import 'file:///Users/nats/Sites/thegreenman-dev/node_modules/defu/dist/defu.mjs';
import 'file:///Users/nats/Sites/thegreenman-dev/node_modules/scule/dist/index.mjs';
import 'file:///Users/nats/Sites/thegreenman-dev/node_modules/unctx/dist/index.mjs';
import 'file:///Users/nats/Sites/thegreenman-dev/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/nats/Sites/thegreenman-dev/node_modules/pathe/dist/index.mjs';
import 'file:///Users/nats/Sites/thegreenman-dev/node_modules/db0/dist/connectors/node-sqlite.mjs';
import 'file:///Users/nats/Sites/thegreenman-dev/node_modules/vue-router/dist/vue-router.node.mjs';

const _sfc_main = {
  __name: "ProseH5",
  __ssrInlineRender: true,
  props: {
    id: { type: String, required: false }
  },
  setup(__props) {
    const props = __props;
    const { headings } = useRuntimeConfig().public.mdc;
    const generate = computed(() => {
      var _a;
      return props.id && (typeof (headings == null ? void 0 : headings.anchorLinks) === "boolean" && (headings == null ? void 0 : headings.anchorLinks) === true || typeof (headings == null ? void 0 : headings.anchorLinks) === "object" && ((_a = headings == null ? void 0 : headings.anchorLinks) == null ? void 0 : _a.h5));
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<h5${ssrRenderAttrs(mergeProps({
        id: props.id
      }, _attrs))}>`);
      if (props.id && unref(generate)) {
        _push(`<a${ssrRenderAttr("href", `#${props.id}`)}>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</a>`);
      } else {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      }
      _push(`</h5>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ProseH5-C0HcI6cN.mjs.map
