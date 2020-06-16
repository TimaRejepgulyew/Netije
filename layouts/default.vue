<template>
  <transition name="fade">
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
  </transition>
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
  middleware: ["cache"],
  data() {
    return {
      title: "TTDoc",
      screen: getScreenSizeInfo()
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
    loadMessages(tkMessages);
    loadMessages(ruMessages);
    locale(this.$i18n.locale);
  },

  created() {
    subscribe(this.screenSizeChanged);
    window.addEventListener("vuexoidc:userSignedOut", () =>
      this.$store.dispatch("oidc/signOutOidc")
    );
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();

      setTimeout(() => this.$nuxt.$loading.finish(), 50000);
    });
  },
  beforeRouteEnter(to, from, next) {},
  beforeDestroy() {
    unsubscribe(this.screenSizeChanged);
    window.removeEventListener("vuexoidc:userSignedOut");
  },

  components: {
    TheFooter,
    AppContent,
    DxButton
  }
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
html,
body {
  margin: 0px;
  min-height: 100%;
  height: 100%;
  overflow: auto;
}

#root {
  width: 100%;
  height: 100%;
}

* {
  box-sizing: border-box;
}
.text--error {
  color: red;
}
.d-flex {
  display: flex;
  .item {
    flex-grow: 1;
    padding-right: 15px;
    width: 20%;
  }
  .f-grow-3 {
    flex-grow: 3;
  }
  .btn--group {
    margin-top: 30px;
    padding-top: 350px;
  }
}

.navBar {
  background-color: darken($base-bg, 1);
}

.app {
  background-color: darken($base-bg, 5);
  display: flex;
  height: 100%;
  width: 100%;
}

.grid--title {
  color: #333;
}

.list__content {
  justify-self: flex-start;
}
</style>
