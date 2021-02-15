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
      <Chat />
    </div>
  </transition>
</template>

<script>
import "devextreme/localization/globalize/date";
import AppContent from "./side-nav-inner-toolbar";
import DxButton from "devextreme-vue/button";
import TheFooter from "~/components/Layout/the-footer";
import { sizes, subscribe, unsubscribe } from "./media-query";
import tkMessages from "../lang/devExtremeLocalization/tk.json";
import ruMessages from "../lang/devExtremeLocalization/ru.json";
import { locale, loadMessages } from "devextreme/localization";
import Chat from "~/components/chat/index.vue";

import supplemental from "devextreme-cldr-data/supplemental.json";
import tkCldrData from "devextreme-cldr-data/tk.json";
import ruCldrData from "devextreme-cldr-data/ru.json";
import Globalize from "globalize";
import syncfusionLocalizationRu from "@/lang/syncfusionLocalization/ru";
import syncfusionLocalizationTk from "@/lang/syncfusionLocalization/tk";
import { L10n, setCulture } from "@syncfusion/ej2-base";
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
  components: {
    TheFooter,
    AppContent,
    DxButton,
    Chat
  },
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
    Globalize.load(tkCldrData, ruCldrData, supplemental);
    Globalize.locale(this.$i18n.locale);
    loadMessages(tkMessages);
    loadMessages(ruMessages);
    locale(this.$i18n.locale);
    L10n.load({
      ru: {
        ...syncfusionLocalizationRu
      },
      tk: {
        ...syncfusionLocalizationTk
      }
    });
  },

  created() {
    subscribe(this.screenSizeChanged);
    window.addEventListener("vuexoidc:userSignedOut", () =>
      this.$store.dispatch("oidc/signOutOidc")
    );
  },
  mounted() {

    this.$online.connectHub();
    this.$notification.connectHub(this);
    this.$nextTick(() => {
      this.$nuxt.$loading.start();

      setTimeout(() => this.$nuxt.$loading.finish(), 50000);
    });
    this.$allowNotification();
  },
  beforeRouteEnter(to, from, next) {},
  beforeDestroy() {
    unsubscribe(this.screenSizeChanged);
    window.removeEventListener("vuexoidc:userSignedOut");
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
  display: flex;
}

* {
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: rgba($color: #000000, $alpha: 0.3);
    cursor: pointer;
  }
}
.text--error {
  color: red;
}
.d-flex {
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
