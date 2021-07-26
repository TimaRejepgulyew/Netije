<template>
  <div>
    <Toolbar
      :assignmentId="assignmentId"
      :isCard="isCard"
      v-if="canUpdate"
      @onComplete="onComplete"
    >
      <slot name="createChildTask" slot="createChildTask"> </slot>
      <slot name="importanceIndicator" slot="importanceIndicator"> </slot>
      <slot name="markAsUnread" slot="markAsUnread"></slot>
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
          template="counterparty"
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
      <template #counterparty>
        <counterparty-custom-select-box
          valueExpr="id"
          :readOnly="true"
          :value="correspondentId"
        />
      </template>
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
import counterpartyCustomSelectBox from "~/components/parties/custom-select-box.vue";
export default {
  name: "document-processing",
  mixins: [formByType],
  components: {
    DxLabel,
    DxSimpleItem,
    Toolbar,
    AdditionalInfo,
    counterpartyCustomSelectBox,
  },
  computed: {
    correspondentId() {
      return this.assignment.counterpartyId;
    },
  },
};
</script>


