<template>
  <ol class="left-side-bar--container">
    <transition-group name="flip-list">
      <li
        class="d-flex left-side-bar--item"
        :class="{ isCurrent: el.id === currentPageId }"
        @click="() => setCurrentPage(el.id)"
        v-for="(el, index) in files"
        :key="el.id"
      >
        <span> {{ index + 1 }}.</span>
        <img
          class="item__page"
          :class="{ ['rotate-' + el.rotate]: el.rotate }"
          :src="'data:image/png;base64,' + el.data"
        />
      </li>
    </transition-group>
  </ol>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters({
      files: "scanner/files",
      currentPageId: "scanner/currentPageId",
    }),
  },
  methods: {
    ...mapMutations({ setCurrentPage: "scanner/SET_CURRENT_PAGE_ID" }),
  },
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
* {
  box-sizing: border-box;
}
.flip-list-move {
  transition: transform 0.6s;
}
.item__page {
  background: #f4f4f4;
  display: block;
  margin: 5px auto;
  width: 80%;
  height: 100%;
  min-height: 200px;
  max-height: 50%;
  transition: 0.4s border;
  border: 2px solid white;
  &::after {
    z-index: 2;
    content: "";
  }
  &:hover {
    border: 2px solid $base-accent;
  }
}

.left-side-bar--container {
  height: 80vh;
}
ol {
  margin: 0;
  padding: 0;
}
.left-side-bar--item {
  width: 100%;
  height: auto;
  align-items: flex-end;
  box-sizing: border-box;
}
</style>