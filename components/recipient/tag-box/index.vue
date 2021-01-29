<template>
  <DxDropDownBox
    ref="dropDownBox"
    @valueChanged="setRecipient"
    :value.sync="items"
    :show-clear-button="true"
    :read-only="readOnly"
    field-template="customfield"
  >
    <DxValidator v-if="validatorGroup" :validation-group="validatorGroup">
      <DxRequiredRule :message="$t(messageRequired)" />
    </DxValidator>
    <template #customfield>
      <DxTagBox
        width="100%"
        @valueChanged="setRecipient"
        :multiline="true"
        displayExpr="name"
        :value.sync="items"
      />
    </template>
    <template #content>
      <div>
        <div class="drop_down_content">
          <div class="content">
            <gropuList
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
export default {
  components: {
    DxDropDownBox,
    DxTagBox,
    DxValidator,
    DxRequiredRule,
    groupType,
    gropuList,
  },
  props: {
    recipients: {
      type: Array,
      default: [],
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    messageRequired: {},
    validatorGroup: {},
    valueExpr: {},
  },
  data() {
    return {
      groupType: [],
      items: this.recipients,
    };
  },
  methods: {
    setRecipient(e) {
      if (e.value === null) {
        this.items = [];
      } else {
        this.items = e.value;
      }
      this.$emit("setRecipients", e.value);
    },
    setItem(value) {
      this.items = value;
    },
    groupTypeChanged(value) {
      this.groupType = value;
    },
  },
};
</script>

<style lang="scss">
.drop_down_content {
  display: flex;
  width: 100%;
  .type {
    margin: 0 0 0 10px;
    max-width: 250px;
  }
}
</style>
