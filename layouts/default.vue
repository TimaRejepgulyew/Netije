<template>
  <div id="root">
    <div :class="cssClasses">
      <app-content
        class="content"
        :title="title"
        :is-x-small="screen.isXSmall"
        :is-large="screen.isLarge"
      >
        <template #footer>
          <the-footer class="footer" />
        </template>
      </app-content>
    </div>
  </div>
</template>

<script>
import AppContent from "./side-nav-inner-toolbar";
import DxButton from "devextreme-vue/button";
import TheFooter from "~/components/Layout/the-footer";
import { sizes, subscribe, unsubscribe } from "./media-query";
import tkMessages from "../lang/devExtremeLocalization/tk.json";
import ruMessages from "../lang/devExtremeLocalization/ru.json";
import { locale, loadMessages } from "devextreme/localization";
function getScreenSizeInfo() {
  const screenSizes = sizes();

  return {
    isXSmall: screenSizes["screen-x-small"],
    isLarge: screenSizes["screen-large"],
    cssClasses: Object.keys(screenSizes).filter(cl => screenSizes[cl])
  };
}

export default {
  name: "app",
  data() {
    return {
      title: "TTDoc",
      screen: getScreenSizeInfo(),
    };
  },
  computed: {
    cssClasses() {
      return ["app"].concat(this.screen.cssClasses);
    }
  },
  methods: {
    screenSizeChanged() {
      this.screen = getScreenSizeInfo();
    }
  },
  beforeCreate() {
    //TODO: Выбрать лучшее  место
    let token = this.$store.getters["oidc/oidcAccessToken"];
    this.$axios.setToken(token, "Bearer");
    this.$axios.setHeader("Accept-Language", this.$i18n.locale);
    loadMessages(tkMessages);
    loadMessages(ruMessages);
    locale(this.$i18n.locale);
  },

  mounted() {
    subscribe(this.screenSizeChanged);
  },

  beforeDestroy() {
    unsubscribe(this.screenSizeChanged);
  },

  components: {
    TheFooter,
    AppContent,
    DxButton
  }
};
</script>

<style lang="scss">
html,
body {
  margin: 0px;
  min-height: 100%;
  height: 100%;
}

#root {
  height: 100vh;
}
.footer {
  height: 10vh;
  margin-top: auto;
}
* {
  box-sizing: border-box;
}

.app {
  @import "~assets/themes/generated/variables.base.scss";
  background-color: darken($base-bg, 5);
  display: flex;
  height: 100%;
  width: 100%;
}
</style>
