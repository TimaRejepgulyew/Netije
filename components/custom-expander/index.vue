<template>
  <dl class="expander">
    <dt class="expander__header" @click="toggle">
      <expander :swiched="swiched" :expander-icon="expanderIcon" />
      <div v-if="headerTemplate">
        <slot :name="headerTemplate" />
      </div>
      <default-head v-else :icon="expanderIcon" :text="header.text" />
    </dt>
    <transition name="expand">
      <dd v-show="swiched" class="expander__body">
        <div v-if="bodyTemplate">
          <slot :name="bodyTemplate" />
        </div>
        <default-body v-else :item="item" />
      </dd>
    </transition>
  </dl>
</template>

<script>
import expander from "./expander.vue";
import defaultHead from "./default-header.vue";
import defaultBody from "./default-body.vue";
export default {
  components: {
    defaultHead,
    defaultBody,
    expander
  },
  props: {
    expanderIcon: {},
    header: {
      type: Object
    },
    item: {
      type: Object
    },
    expantedDefault: {
      type: Boolean,
      default: false
    },
    headerTemplate: {
      type: String
    },
    bodyTemplate: {
      type: String
    }
  },
  data() {
    return {
      swiched: this.expantedDefault
    };
  },
  methods: {
    toggle() {
      this.swiched = !this.swiched;
    }
  }
};
</script>

<style lang="scss" scoped>
.expander {
  border-radius: $base-border-radius;
  border: 0.5px solid $base-border-color;
  overflow: hidden;
  width: 100%;
  .expander__header {
    background: $base-bg;
    position: relative;
    z-index: 5;
    cursor: pointer;
    width: 100%;
    padding: 8px;
    display: flex;
    align-items: center;
    align-content: center;
  }
  .expander__body {
    z-index: 1;
  }
  dd {
    margin: 0;
  }
  .expand-enter,
  .expand-leave-to {
    transform: translateY(-20vh);
  }
  .expand-enter-active,
  .expand-leave-active {
    transition: transform 0.5s;
  }
}
</style>
