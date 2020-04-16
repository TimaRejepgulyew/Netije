<template>
  <div class="sideBar">
    <div class="btn--close right">
      <label class="filter__header">Фильтр</label>
      <DxButton icon="close" :on-click="showFilter" />
    </div>
    <div class="filter__content">
      <div class="option--group">
        <div class="option__title">Статус</div>
        <DxRadioGroup
          name="status"
          :onValueChanged="(e)=>{this.filterChaged(e,'status')}"
          valueExpr="id"
          displayExpr="name"
          :items="statusRadioItems"
        />
      </div>
      <div class="option--group">
        <div class="option__title">Тип</div>
        <DxRadioGroup
          valueExpr="id"
          displayExpr="name"
          :onValueChanged="(e)=>{this.filterChaged(e,'type')}"
          :items="typeRadioItems"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { DxCheckBox, DxRadioGroup } from "devextreme-vue";
import DxButton from "devextreme-vue/button";
export default {
  components: {
    DxRadioGroup,
    DxCheckBox,
    DxButton
  },
  data() {
    return {
      statusRadioItems: [
        {
          id: 0,
          name: this.$t("translations.fields.inProccess")
        },
        {
          id: 1,
          name: this.$t("translations.fields.all")
        }
      ],
      typeRadioItems: [
        {
          id: 2,
          name: this.$t("translations.menu.simpleAssignments")
        },
        {
          id: 3,
          name: this.$t("translations.menu.acquaintanceAssignments")
        },
        {
          id: 4,
          name: this.$t("translations.menu.actionAssignments")
        },
        {
          id: 5,
          name: this.$t("translations.menu.notices")
        },
        {
          id: 1,
          name: this.$t("translations.menu.allAssignments")
        },
        {
          id: 0,
          name: this.$t("translations.fields.all")
        }
      ],
      status: 0,
      assignmentType: 2
    };
  },
  methods: {
    filterChaged(e, name) {
      (this[name] = e.value), console.log(this[name]);
      this.$emit("changeFilter", {
        assignmentType: this.assignmentType,
        filter: ["status", "=", this.status]
      });

      //   this.$emit("filterChange", {
      //       assignmentType :this.assignmentType
      //     // inProccess: this.inProccess,
      //     // completed: this.completed,
      //     // notice: this.notice,
      //     // assignment: this.assignment
      //   });
    },
    showFilter() {
      this.$emit("showFilter");
    }
  }
};
</script>
<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.sideBar {
  border: 1px solid darken($base-bg, 5);
  height: 100%;
  min-height: auto;
  padding: 20px;
  background: $base-bg;
  position: absolute;
  right: 0;
  top: 0;
  max-width: 300px;
  width: 100%;
  z-index: 2;
  -webkit-box-shadow: 0px 0.1vw 1vw 0px rgba(104, 104, 104, 0.5);
  -moz-box-shadow: 0px 0.1vw 1vw 0px rgba(104, 104, 104, 0.5);
  box-shadow: 0px 0.1vw 1vw 0px rgba(104, 104, 104, 0.5);
  .filter__header {
    font-size: 24px;
  }
  .filter__content {
    padding: 20px 0;
    .option--group {
      padding: 10px 0;
      .option__title {
        padding: 10px 0;
      }
      .option {
        padding: 10px 10px;
      }
    }
  }
}
</style>