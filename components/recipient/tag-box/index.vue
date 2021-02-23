<template>
  <DxDropDownBox
    @focusIn="focusIn"
    ref="dropDownBox"
    @valueChanged="setRecipient"
    :value.sync="items"
    :read-only="readOnly"
    field-template="customfield"
    :show-clear-button="true"
  >
    <DxValidator v-if="isRequired" :validation-group="validatorGroup">
      <DxRequiredRule :message="$t(messageRequired)" />
    </DxValidator>
    <template #customfield>
      <DxTagBox
        width="100%"
        @valueChanged="setRecipient"
        :openOnFieldClick="false"
        :multiline="multiline"
        displayExpr="name"
        :value.sync="items"
      />
    </template>
    <template #content>
      <div>
        <div class="drop_down_content">
          <div class="content">
            <userGropuList
              v-if="isUserGroup"
              @closeDropDown="closeDropDown"
              @selectUserGroupItem="selectUserGroupItem"
            />
            <gropuList
              v-else
              :selectedItems="items"
              :groupType="groupType"
              @selectItem="setItem"
            />
          </div>
          <div class="type">
            <group-type @groupType="groupTypeChanged" />
          </div>
        </div>
      </div>
    </template>
  </DxDropDownBox>
</template>
<script>
import DxDropDownBox from "devextreme-vue/drop-down-box";
import { DxTagBox } from "devextreme-vue";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import groupType from "~/components/recipient/tag-box/components/group-type.vue";
import gropuList from "~/components/recipient/tag-box/components/group-list.vue";
import userGropuList from "~/components/recipient/tag-box/components/user-group-list.vue";
export default {
  components: {
    DxDropDownBox,
    DxTagBox,
    DxValidator,
    DxRequiredRule,
    groupType,
    gropuList,
    userGropuList,
  },
  props: {
    value: {
      type: Array,
      default: [],
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    isRequired: {
      default: false,
    },
    messageRequired: {
      type: String,
    },
    validatorGroup: {
      type: String,
    },
    valueExpr: {},
  },
  data() {
    return {
      groupType: [],
      items: this.value,
    };
  },
  computed: {
    multiline() {
      if (this.items === null) {
        return false;
      } else {
        return this.items.length > 1;
      }
    },
    isUserGroup() {
      return this.groupType === "userGroup";
    },
  },
  methods: {
    focusIn() {
      this.$emit("focusIn", this.value);
    },
    closeDropDown() {
      this.$refs["dropDownBox"].instance.close();
    },
    setRecipient(e) {
      if (e.value === null) {
        this.items = [];
      } else {
        this.items = e.value;
      }
      this.$emit("valueChanged", this.items);
    },
    setItem(value) {
      this.items = value;
    },
    selectUserGroupItem(value) {
      const newArray = [];
      value.forEach((element) => {
        if (
          this.items.every((el) => {
            return el.id !== element.id;
          })
        ) {
          newArray.push(element);
        }
      });
      this.items = this.items.concat(newArray);
    },
    groupTypeChanged(value) {
      this.groupType = value;
    },
  },
};
</script>

<style lang="scss">
// .dx-dropdowneditor-input-wrapper .dx-selectbox-container {
//   width: 100%;
// }
.drop_down_content {
  display: grid;
  grid-template-columns: 1fr 250px;
  grid-column-gap: 20px;
}
</style>
