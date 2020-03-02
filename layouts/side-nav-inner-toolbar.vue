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
          text: this.$t("translations.menu.contractors"),
          icon: "group",
          path: "/parties",
          items: [
            {
              text: this.$t("translations.menu.company"),
              icon: "fields",
              path: "/parties/organizations/company"
            },
            {
              text: this.$t("translations.menu.banks"),
              icon: "fields",
              path: "/parties/organizations/bank"
            },
            {
              text: this.$t("translations.menu.contacts"),
              icon: "fields",
              path: "/parties/organizations/contact"
            },
            {
              text: this.$t("translations.menu.counterPartList"),
              icon: "fields",
              path: "/parties/counterParts/"
            },
            {
              text: this.$t("translations.menu.person"),
              icon: "fields",
              path: "/parties/persons/"
            }
          ]
        },
        {
          text: this.$t("translations.menu.company-structure"),
          icon: "detailslayout",
          path: "/company",
          items: [
            {
              text: this.$t("translations.menu.businessUnit"),
              path: "/company/organizationStructure/businessUnits"
            },
            {
              text: this.$t("translations.menu.department"),
              path: "/company/organizationStructure/departments"
            },
            {
              text: this.$t("translations.menu.employee"),
              path: "/company/staff/employees"
            },
            {
              text: this.$t("translations.fields.jobTitleId"),
              path: "/company/staff/jobTitles"
            },
            {
              text: this.$t("translations.menu.managersAssistant"),
              path: "/company/staff/managerAssistants"
            }
          ]
        },
        {
          text: this.$t("translations.menu.document-circulation"),
          icon: "docfile",
          path: "/document-circulation",
          items: [
            {
              text: this.$t("translations.menu.documentType"),
              icon: "user",
              path: "/document-circulation/document-type"
            },
           
          ]
        },
        {
          text: this.$t("translations.menu.shared-directory"),
          icon: "docfile",
          path: "/shared-directory",
          items: [
            {
              text: this.$t("translations.menu.countries"),
              icon: "isnotblank",
              path: "/shared-directory/territorialStructure/countries"
            },
            {
              text: this.$t("translations.menu.region"),
              icon: "isnotblank",
              path: "/shared-directory/territorialStructure/region"
            },
            {
              text: this.$t("translations.menu.locality"),
              icon: "isnotblank",
              path: "/shared-directory/territorialStructure/localities"
            },
            {
              text: this.$t("translations.menu.currencies"),
              icon: "isnotblank",
              path: "/shared-directory/currencies"
            }
          ]
        },
        {
          text: this.$t("translations.menu.docFlow"),
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
        },
        {
          text: this.$t("translations.menu.administration"),
          path: "/admin",
          icon: "admin",

          items: [
            {
              text: this.$t("translations.menu.roles"),
               path: "/admin/roles",
              icon: "user"
            },
           
          ]
        },
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
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";

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
  min-height: 100vh;
}

.main-content {
  min-height: 80vh;
  background: $base-bg;
  margin: 1vw 0.5vw 0 1vw;
  padding: 10px 15px;
  -webkit-box-shadow: 0px 0.1vw 1vw 0px rgba(104, 104, 104, 0.5);
  -moz-box-shadow: 0px 0.1vw 1vw 0px rgba(104, 104, 104, 0.5);
  box-shadow: 0px 0.1vw 1vw 0px rgba(104, 104, 104, 0.5);
}
.footer {
  margin-top: auto;
  min-height: 10vh;
}
</style>
