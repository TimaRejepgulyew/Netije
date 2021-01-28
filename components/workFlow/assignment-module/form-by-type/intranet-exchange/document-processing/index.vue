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
import formByType from "../../../infrastructure/mixins/form-types";
import AdditionalInfo from "./components/additional-info.vue";
import Toolbar from "./components/toolbar.vue";
export default {
  name: "document-processing",
  mixins: [formByType],
  components: {
    Toolbar,
    AdditionalInfo,
  },
};
</script>


