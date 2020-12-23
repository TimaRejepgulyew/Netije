<template>
  <header class="header-component">
    <dx-toolbar class="header-toolbar">
      <dx-item
        :visible="menuToggleEnabled"
        location="before"
        css-class="menu-button"
      >
        <!-- eslint-disable vue/no-unused-vars -->

        <dx-button
          icon="menu"
          styling-mode="text"
          @click="toggleMenuFunc"
          slot-scope="_"
        />

        <!-- eslint-enable -->
      </dx-item>

      <dx-item v-if="title" location="before">
        <!-- eslint-disable vue/no-unused-vars -->
        <img
          class="menu-icon"
          :src="require('~/static/icons/main-logo.svg')"
          slot-scope="_"
        />
        <!-- eslint-enable -->
      </dx-item>
      <dx-item locateInMenu="auto" location="before">
        <!-- eslint-disable vue/no-unused-vars -->
        <div class="create-btn" slot-scope="_">
          <!-- eslint-enable -->

          <create-btn-panel menu-mode="context" />
        </div>
      </dx-item>
      <dx-item locateInMenu="auto" location="before">
        <!-- eslint-disable vue/no-unused-vars -->
        <div class="search-btn" slot-scope="_">
          <!-- eslint-enable -->

          <search-panel menu-mode="context" />
        </div>
      </dx-item>
      <dx-item location="after">
        <!-- eslint-disable vue/no-unused-vars -->
        <div slot-scope="_">
          <!-- eslint-enable -->
          <lang-panel />
        </div>
      </dx-item>
      <!-- eslint-disable vue/no-unused-vars -->
      <dx-item location="after">
        <!-- eslint-disable vue/no-unused-vars -->
        <div slot-scope="_">
          <!-- eslint-enable -->
          <info-panel />
        </div>
      </dx-item>
      <!-- eslint-enable -->
      <dx-item location="after">
        <!-- eslint-disable vue/no-unused-vars -->
        <div slot-scope="_">
          <!-- eslint-enable -->

          <user-panel menu-mode="context" />
        </div>
      </dx-item>
      <!-- eslint-disable vue/no-unused-vars -->
    </dx-toolbar>
  </header>
</template>

<script>
import infoPanel from "./info-panel";
import searchPanel from "~/components/Layout/search-panel.vue";
import DxButton from "devextreme-vue/button";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import UserPanel from "./user-panel";
import LangPanel from "./lang-panel.vue";
import CreateBtnPanel from "./create-btn-panel.vue";
export default {
  props: {
    menuToggleEnabled: Boolean,
    title: String,
    toggleMenuFunc: Function,
    logOutFunc: Function,
  },
  data() {
    return {};
  },
  computed: {},
  components: {
    searchPanel,
    DxButton,
    DxToolbar,
    DxItem,
    UserPanel,
    LangPanel,
    CreateBtnPanel,
    infoPanel,
  },
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";

.header-component {
  flex: 0 0 auto;
  z-index: 1;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
  .header-toolbar {
    box-sizing: border-box;
    height: 50px;
    padding: 5px 0;
  }
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

.menu-icon {
  height: 40px;
}
.create-btn {
  margin-left: 3.5vw;
}
.search-btn {
  margin-left: 1vw;
}
</style>
