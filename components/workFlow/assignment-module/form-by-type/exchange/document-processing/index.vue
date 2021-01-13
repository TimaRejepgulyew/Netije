<template>
  <div>
    <Toolbar
      :assignmentId="assignmentId"
      :isCard="isCard"
      v-if="canUpdate"
      @complete="onComplete"
    >
      <slot name="createChildTask" slot="createChildTask"> </slot>
      <slot name="importanceIndicator" slot="importanceIndicator"> </slot>
    </Toolbar>

    <DxForm
      ref="form"
      :col-count="10"
      :show-colon-after-label="true"
      :show-validation-summary="true"
      :validation-group="assignmentValidatorName"
    >
      <DxGroupItem :col-span="7" :col-count="4">
        <DxGroupItem template="info" :col-span="4"> </DxGroupItem>
        <DxSimpleItem
          :col-span="4"
          editor-type="dxSelectBox"
          :editor-options="counterPartyOptions"
          data-field="counterpartyId"
        >
          <DxLabel
            location="left"
            :text="$t('assignment.fields.counterParty')"
          />
        </DxSimpleItem>
        <DxGroupItem template="thread-texts" :col-span="4"> </DxGroupItem>
        <DxGroupItem template="additional-info" :col-span="4"> </DxGroupItem>
      </DxGroupItem>
      <DxGroupItem template="attachments" :col-span="3" />
      <template #info>
        <slot name="info"></slot>
      </template>
      <template #thread-texts>
        <slot name="thread-texts" />
      </template>
      <template #additional-info>
        <Additional-info :assignmentId="assignmentId" />
      </template>
      <template #attachments>
        <slot name="attachments" />
      </template>
    </DxForm>
  </div>
</template>
<script>
import dataApi from "~/static/dataApi.js";
import formByType from "../../../infrastructure/mixins/form-types";
import AdditionalInfo from "./components/additional-info.vue";
import Toolbar from "./components/toolbar.vue";
import { DxSimpleItem, DxLabel } from "devextreme-vue/form";
export default {
  name: "document-processing",
  mixins: [formByType],
  components: {
    DxLabel,
    DxSimpleItem,
    Toolbar,
    AdditionalInfo,
  },
  computed: {
    counterPartyOptions() {
      return {
        readOnly: true,
        dataSource: this.$dxStore({
          key: "id",
          loadUrl: dataApi.contragents.CounterPart,
        }),
        value: this.assignment.counterpartyId,
        displayExpr: "name",
        valueExpr: "id",
      };
    },
  },
};
</script>


