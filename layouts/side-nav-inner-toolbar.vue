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
            <nuxt />
          </div>
          <slot name="footer" />
        </dx-scroll-view>
        <!-- eslint-disable vue/no-unused-vars -->
        <side-nav-menu
          slot="menu"
          slot-scope="_"
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

      menuItems: [
        {
          text: "Dasboard",
          path: "/home",
          icon: "home"
        },
        {
          text: this.$t("translations.menu.paperwork"),
          icon: "alignjustify",
          path: "/paper-work",

          items: [
            {
              text: this.$t("translations.menu.profile"),
              path: "/paper-work/profile"
            },
            {
              text: this.$t("translations.menu.diplayData"),
              path: "/paper-work/display-data"
            }
          ]
        },
        {
          text: this.$t("translations.menu.counterPart"),
          icon: "group",
          path: "/counterPart",
          items: [
            {
              text: this.$t("translations.menu.profile"),
              icon: "user",
              path: "/guide/profile"
            },
            {
              text: this.$t("translations.menu.diplayData"),
              icon: "fields",
              path: "/display-data"
            }
          ]
        },
        {
          text: this.$t("translations.menu.company-structure"),
          icon: "detailslayout",
          path: "/company-structure",
          items: [
            {
              text: this.$t("translations.menu.profile"),
              icon: "user",
              path: "/company-structure/profile"
            },
            {
              text: this.$t("translations.menu.diplayData"),
              icon: "fields",
              path: "/company-structure/display-data"
            }
          ]
        },
        {
          text: this.$t("translations.menu.document-circulation"),
          icon: "docfile",
          path: "/document-circulation",
          items: [
            {
              text: this.$t("translations.menu.profile"),
              icon: "user",
              path: "/document-circulation/profile"
            },
            {
              text: this.$t("translations.menu.diplayData"),
              icon: "fields",
              path: "/document-circulation/display-data"
            }
          ]
        },
        {
          text: this.$t("translations.menu.geeral-handbook"),
          icon: "docfile",
          path: "/geeral-handbook",
          items: [
            {
              text: this.$t("translations.menu.countries"),
              icon: "circle",
              path: "/geeral-handbook/countries"
            },
            {
              text: this.$t("translations.menu.region"),
              icon: "circle",
              path: "/geeral-handbook/region"
            },
            {
              text: this.$t("translations.menu.human-settlement"),
              icon: "human",
              path: "/geeral-handbook/human-settlement"
            },
            {
              text: this.$t("translations.menu.currencies"),
              icon: "money",
              path: "/geeral-handbook/currencies"
            }
          ]
        },
        {
          text: this.$t("translations.menu.document-circulation"),
          icon: "docfile",

          items: [
            {
              text: this.$t("translations.menu.profile"),
              icon: "user"
            },
            {
              text: this.$t("translations.menu.diplayData"),
              icon: "fields"
            }
          ]
        }
      ]
    };
  },
  computed: {
    drawerOptions() {
      const shaderEnabled = !this.isLarge;
      return {
        menuMode: this.isLarge ? "shrink" : "overlap",
        menuRevealMode: this.isXSmall ? "slide" : "expand",
        minMenuSize: this.isXSmall ? 0 : 60,
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
    SideNavMenu
  }
};
</script>

<style lang="scss">
.side-nav-outer-toolbar {
  flex-direction: column;
  display: flex;
  height: 100%;
  width: 100%;
}

.layout-header {
  z-index: 1501;
}

.layout-body {
  flex: 1;
  min-height: 0;
}

.content {
  flex-grow: 1;
}
.main-content {
  margin: 1vw 0.5vw 0 2vw;
  -webkit-box-shadow: 0px 0.1vw 1vw 0px rgba(104, 104, 104, 0.5);
  -moz-box-shadow: 0px 0.1vw 1vw 0px rgba(104, 104, 104, 0.5);
  box-shadow: 0px 0.1vw 1vw 0px rgba(104, 104, 104, 0.5);
}
</style>
