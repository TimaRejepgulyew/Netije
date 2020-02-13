<template>
  <header class="header-component">
    <dx-toolbar class="header-toolbar">
      <dx-item :visible="menuToggleEnabled" location="before" css-class="menu-button">
        <!-- eslint-disable vue/no-unused-vars -->
        <dx-button icon="menu" styling-mode="text" @click="toggleMenuFunc" slot-scope="_" />
        <!-- eslint-enable -->
      </dx-item>

      <dx-item v-if="title" location="before" css-class="header-title dx-toolbar-label">
        <!-- eslint-disable vue/no-unused-vars -->
        <div slot-scope="_">{{ title }}</div>
        <!-- eslint-enable -->
      </dx-item>

      <dx-item location="after" locate-in-menu="auto" menu-item-template="menuUserItem">
        <!-- eslint-disable vue/no-unused-vars -->
        <div slot-scope="_">
          <!-- eslint-enable -->
          <lang-panel />
        </div>
      </dx-item>
      <!-- eslint-disable vue/no-unused-vars -->

      <!-- eslint-enable -->
      <dx-item location="after" locate-in-menu="auto" menu-item-template="menuUserItem">
        <!-- eslint-disable vue/no-unused-vars -->
        <div slot-scope="_">
          <!-- eslint-enable -->
          <dx-button
            class="user-button authorization"
            :width="200"
            height="100%"
            styling-mode="text"
          >
            <user-panel :menu-items="userMenuItems" menu-mode="context" />
          </dx-button>
        </div>
      </dx-item>
      <!-- eslint-disable vue/no-unused-vars -->
    </dx-toolbar>
  </header>
</template>

<script>
import DxButton from "devextreme-vue/button";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import UserPanel from "./user-panel";
import LangPanel from "./lang-panel.vue";
import oidc from "~/plugins/oidc-plugin";
export default {
  props: {
    menuToggleEnabled: Boolean,
    title: String,
    toggleMenuFunc: Function,
    logOutFunc: Function
  },
  data() {
    return {
      userMenuItems: [
        {
          text: this.$t("translations.menu.profile") ,
          icon: "user",
          onClick: this.onProfileClick
        },
        {
          text: this.$t("translations.menu.logout"),
          icon: "runner",
          onClick: this.onLogoutClick
        }
      ]
    };
  },
  methods: {
    onLogoutClick() {
      oidc.signoutRedirect();
    },
    onProfileClick() {
      window.location.href = "http://192.168.4.99/Identity/Account/Manage";
    }
  },
  computed: {
  },
  components: {
    DxButton,
    DxToolbar,
    DxItem,
    UserPanel,
    LangPanel
  }
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";

.header-component {
  flex: 0 0 auto;
  z-index: 1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  .dx-toolbar .dx-toolbar-item.menu-button > .dx-toolbar-item-content .dx-icon {
    color: $base-accent;
  }
}

.dx-toolbar.header-toolbar .dx-toolbar-items-container .dx-toolbar-after {
  padding: 0 40px;

  .screen-x-small & {
    padding: 0 20px;
  }
}

.dx-toolbar .dx-toolbar-item.dx-toolbar-button.menu-button {
  width: $side-panel-min-width;
  text-align: center;
  padding: 0;
}

.header-title .dx-item-content {
  padding: 0;
  margin: 0;
}

.dx-theme-generic {
  .dx-toolbar {
    padding: 10px 0;
  }

  .user-button > .dx-button-content {
    padding: 3px;
  }
}
</style>
