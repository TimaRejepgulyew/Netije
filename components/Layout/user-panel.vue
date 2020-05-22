<template>
  <dx-button class="user-button authorization"  width="auto" styling-mode="text">
    <div class="user-panel">
      <div class="user-info">
        <div>
          <icon-by-name  />
        </div>
        <div class="user-name">{{fullName}}</div>
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
import dataApi from "~/static/dataApi";
import iconByName from "~/components/Layout/iconByName.vue";
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
          text: this.$t("panel.profile"),
          icon: "user",
          onClick: this.onProfileClick
        },
        {
          text: this.$t("panel.logout"),
          icon: "runner",
          onClick: this.onLogoutClick
        }
      ]
    };
  },
  computed: {
    fullName() {
      return this.$store.getters["user/name"];
    }
  },
  methods: {
    onLogoutClick() {
      this.$store.dispatch("oidc/signOutOidc");
    },
    onProfileClick() {
      window.location.href = dataApi.account;
    }
  },
  components: {
    DxContextMenu,
    DxList,
    DxButton,
    iconByName
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

  .user-name {
    text-overflow: ellipsis;
    font-size: 12px;
    color: $base-text-color;
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
