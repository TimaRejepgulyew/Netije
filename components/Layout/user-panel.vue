<template>
  <dx-button class="user-button authorization" :height="40" :width="150" styling-mode="text">
    <div class="user-panel">
      <div class="user-info">
        <div class="image-container">
          <div
            :style="{'background-image': 'url(' + require('~/static/icons/user-panel--icon.png') + ')' }"
            class="user-image"
          />
        </div>
        <div class="user-name">{{userName}}</div>
      </div>

      <dx-context-menu
        v-if="menuMode === 'context'"
        target=".user-button"
        :items="menuItems"
        :position="menuPositionConfig"
        show-event="dxclick"
        css-class="user-menu"
      />

      <dx-list v-if="menuMode === 'list'" class="dx-toolbar-menu-action" :items="menuItems" />
    </div>
  </dx-button>
</template>

<script>
import DxContextMenu from "devextreme-vue/context-menu";
import DxList from "devextreme-vue/list";
import DxButton from "devextreme-vue/button";

export default {
  props: {
    menuMode: String
  },
  data() {
    return {
      menuPositionConfig: {
        my: "top center",
        at: "bottom center"
      },
      menuItems: [
        {
          text: this.$t("translations.menu.profile"),
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
  computed: {
    userName() {
      return this.$store.getters["oidc/oidcUser"].name || "no found";
    }
  },
  methods: {
    onLogoutClick() {
      this.$store.dispatch("oidc/signOutOidc");
    },
    onProfileClick() {
      window.location.href = "http://192.168.4.99/Identity/Account/Manage";
    }
  },
  components: {
    DxContextMenu,
    DxList,
    DxButton
  }
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";

.user-info {
  display: flex;
  align-items: center;

  .dx-toolbar-menu-section & {
    padding: 10px 6px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .image-container {
    overflow: hidden;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    margin: 0 4px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);

    .user-image {
      width: 100%;
      height: 100%;
      border: none;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }

  .user-name {
    font-size: 14px;
    color: $base-text-color;
    margin: 0 9px;
  }
}

.user-panel {
  .dx-list-item .dx-icon {
    vertical-align: middle;
    color: $base-text-color;
    margin-right: 16px;
  }
  .dx-rtl .dx-list-item .dx-icon {
    margin-right: 0;
    margin-left: 16px;
  }
}

.dx-context-menu.user-menu.dx-menu-base {
  &.dx-rtl {
    .dx-submenu .dx-menu-items-container .dx-icon {
      margin-left: 16px;
    }
  }
  .dx-submenu .dx-menu-items-container .dx-icon {
    margin-right: 16px;
  }
  .dx-menu-item .dx-menu-item-content {
    padding: 3px 15px 4px;
  }
}

.dx-theme-generic .user-menu .dx-menu-item-content .dx-menu-item-text {
  padding-left: 4px;
  padding-right: 4px;
}
</style>
