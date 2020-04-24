<template>
  <div>
    <div class="filter__content">
      <div class="option--group" v-for="(item,index) in documentKinds" :key="index">
        <DxButton width="100%" align icon="plus" :text="item.text" :on-click="item.onClick" />
      </div>
    </div>
  </div>
</template>

<script>
import DxButton from "devextreme-vue/button";
export default {
  components: {
    DxButton
  },
  computed: {
    urlByTypeGuid() {
      return this.$store.getters["paper-work/urlByTypeGuid"];
    },
    nameBytypeGuid() {
      return [
        ,
        this.$t("translations.headers.incommingLetter"),
        this.$t("translations.headers.outgoingLetter"),
        this.$t("translations.headers.order"),
        this.$t("translations.headers.companyDirective"),
        this.$t("translations.headers.simpleDocument"),
        this.$t("translations.headers.addendum"),
        this.$t("translations.headers.memo"),
        this.$t("translations.headers.powerOfAttorney"),
      ];
    },
    documentKinds() {
      let obj = this.urlByTypeGuid.map((el, index) => {
        if (el) {
          return {
            text: this.nameBytypeGuid[index],
            onClick: () => {
              this.createDocument(index);
            }
          };
        }
      });
      obj.shift();

      return obj;
    }
  },
  methods: {
    createDocument(type) {
      const address = this.urlByTypeGuid[type] + "add";
      this.$router.push(address);
    }
  }
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.filter__content {
  padding: 20px 0;
  .option--group {
    padding: 10px 0;
    text-align: start;
    .dx-button-content {
      display: flex;
    }
    .option__title {
      padding: 10px 0;
    }
    .option {
      padding: 10px 10px;
    }
  }
}
</style>