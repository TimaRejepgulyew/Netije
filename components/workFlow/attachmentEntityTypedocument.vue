<template>
  <div class="d-flex align-stretch align-items-center">
    <nuxt-link class="link d-flex" :to="toDetailPath">
      <documentIcon :extension="item.extension" />
      <div>{{item.name}}</div>
    </nuxt-link>
    <actionBtn :attachment="item" />
  </div>
</template>

<script>
import actionBtn from "~/components/workFlow/attachment-action-btn.vue";
import documentIcon from "~/components/page/document-icon.vue";
export default {
  components: {
    documentIcon,
    actionBtn
  },
  props: ["item"],
  computed: {
    toDetailPath() {
      return `paper-work/detail/${this.item.documentTypeGuid}/${this.item.id}`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.align-stretch {
  align-content: stretch;
}

.link {
  color: inherit;
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 3px;
  text-decoration: none;
  &:hover {
    color: inherit;
    background: darken($base-bg, 5%);
    width: auto;
  }
}
</style>