<template>
  <div class="content">
    <div class="side-nav-outer-toolbar">
      <header-toolbar
        class="layout-header"
        :menu-toggle-enabled="true"
        :toggle-menu-func="toggleMenu"
        :title="title"
      />
      <dx-drawer
        class="layout-body"
        position="before"
        template="menu"
        :opened.sync="menuOpened"
        :opened-state-mode="drawerOptions.menuMode"
        :reveal-mode="drawerOptions.menuRevealMode"
        :min-size="drawerOptions.minMenuSize"
        :shading="drawerOptions.shaderEnabled"
        :close-on-outside-click="drawerOptions.closeOnOutsideClick"
      >
        <dx-scroll-view class="with-footer">
          <div class="main-content">
            <nuxt></nuxt>
          </div>
          <slot name="footer" />
        </dx-scroll-view>
        <!-- eslint-disable vue/no-unused-vars -->
        <side-nav-menu
          slot="menu"
          class="dx-swatch-additional"
          :compact-mode="!menuOpened"
          :selected-item="$route.path"
          :items="menuItems"
          @click="handleSideBarClick"
        />
        <!-- eslint-enable -->
      </dx-drawer>
    </div>
  </div>
</template>

<script>
import Header from "~/components/page/page__header";
import DxButton from "devextreme-vue/button";
import DxDrawer from "devextreme-vue/drawer";
import DxScrollView from "devextreme-vue/scroll-view";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import HeaderToolbar from "~/components/Layout/header-toolbar";
import SideNavMenu from "~/components/Layout/side-nav-menu";

export default {
  props: {
    title: String,
    isXSmall: Boolean,
    isLarge: Boolean
  },
  methods: {
    toggleMenu(e) {
      const pointerEvent = e.event;
      pointerEvent.stopPropagation();
      if (this.menuOpened) {
        this.menuTemporaryOpened = false;
      }
      this.menuOpened = !this.menuOpened;
    },
    handleSideBarClick() {
      if (this.menuOpened === false) this.menuTemporaryOpened = true;
      this.menuOpened = true;
    }
  },
  data() {
    return {
      menuOpened: this.isLarge,
      menuTemporaryOpened: false,
      list: [],
      property: []
    };
  },
  computed: {
    menuItems() {
      return this.$store.getters["menu/menuList"];
    },
    drawerOptions() {
      const shaderEnabled = !this.isLarge;
      return {
        menuMode: this.isLarge ? "shrink" : "overlap",
        menuRevealMode: this.isXSmall ? "slide" : "expand",
        minMenuSize: 0,
        menuOpened: this.isLarge,
        closeOnOutsideClick: shaderEnabled,
        shaderEnabled
      };
    },
    headerMenuTogglerEnabled() {
      return this.isXSmall;
    }
  },

  watch: {
    isLarge() {
      if (!this.menuTemporaryOpened) {
        this.menuOpened = this.isLarge;
      }
    },
    $route() {
      if (this.menuTemporaryOpened || !this.isLarge) {
        this.menuOpened = false;
        this.menuTemporaryOpened = false;
      }
    }
  },
  components: {
    DxButton,
    DxDrawer,
    DxScrollView,
    DxToolbar,
    DxItem,
    HeaderToolbar,
    SideNavMenu,
    Header
  }
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";

.side-nav-outer-toolbar {
  flex-direction: column;
  display: flex;
  height: 100%;
  width: 100%;
}

.layout-header {
  z-index: 101;
}

.layout-body {
  flex: 1;
  min-height: 0;
}

.content {
  flex-grow: 1;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.main-content {
  margin: 5px;
  position: relative;
  box-sizing: border-box;
  min-height: 90vh;
  height: auto;
  background: $base-bg;
  padding: 0.5vh 0.5vw;
  overflow: auto;
}
</style>
