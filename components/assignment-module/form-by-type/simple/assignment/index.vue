<template>
  <div>
    <Tollbar
      :isCard="iscard"
      @pasteAttachment="pasteAttachment"
      v-if="canUpdate"
      @complete="onComplete"
    >
      <slot name="importanceIndicator" slot="importanceIndicator"> </slot>
    </Tollbar>

    <form class="d-flex">
      <div class="item f-grow-3">
        <DxForm
          ref="form"
          :col-count="10"
          :show-colon-after-label="true"
          :show-validation-summary="true"
          :validation-group="assignmentValidatorName"
        >
          <DxGroupItem :col-span="7" :col-count="4">
            <DxGroupItem template="info" :col-span="2"> </DxGroupItem>
            <!-- <DxGroupItem template="description" :col-span="2"> </DxGroupItem> -->
            <DxGroupItem template="thread-texts" :col-span="2"> </DxGroupItem>
            <DxGroupItem template="additional-info" :col-span="2">
            </DxGroupItem>
          </DxGroupItem>
          <DxGroupItem template="attachments" :col-span="3" />
          <template #info>
            <slot name="info"></slot>
          </template>

          <template #thread-texts>
            <slot name="thread-texts" />
          </template>
          <template #additional-info>
            <additional-info :documentId="documentId" />
          </template>
          <template #description>
            <description :documentId="documentId" />
          </template>
          <template #attachments>
            <slot name="attachments" />
          </template>
        </DxForm>
      </div>
    </form>
  </div>
</template>
<script>
import { unload } from "~/infrastructure/services/assignmentService.js";

import Importance from "~/infrastructure/constants/assignmentImportance.js";
import AssignmentType from "~/infrastructure/constants/assignmentType.js";

import "devextreme-vue/text-area";
import dataApi from "~/static/dataApi";
import DxForm, { DxGroupItem } from "devextreme-vue/form";
export default {
  components: {
    DxGroupItem,
    DxForm,
  },
  name: "simple-assignment",
  props: ["assignmentId", "isCard"],
  inject: ["assignmentValidatorName", "isValidForm"],
  computed: {
    assignment() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`];
    },
    canUpdate() {
      return this.$store.getters[`assignments/${this.assignmentId}/canUpdate`];
    },
  },
  methods: {
    pasteAttachment(options) {
      this.$emit("pasteAttachment", options);
    },
    onComplete() {
      this.$emit("onComplete");
    },
  },
};
</script>


