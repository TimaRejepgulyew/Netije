<template>
  <div class="d-flex f-column js-space-between">
    <div>
      <div
        class="fon-size-1-2em"
      >{{$t("attachmentAccessRight.message.whatPermissionsWillAssignToAttachment")}}</div>
      <div>{{$t("attachmentAccessRight.message.nothaveAccessRight")}}</div>
    </div>
    <div>
      <DxButton
        v-for="btn in avaliableAccessRight"
        :text="btn.text"
        :on-click="()=>selected(btn.id)"
        :key="btn.id"
      />
      <DxButton :text="$t('buttons.cancel')" :hint="$t('buttons.cancel')" :on-click="closeDialog" />
    </div>
  </div>
</template>

<script>
import DxButton from "devextreme-vue/button";
import AttachmentAccessRightModel from "~/infrastructure/models/AttachmentAccessRight.js";
import attachmentAccessRight from "~/infrastructure/constants/attachmentAccessRight.js";
export default {
  components: {
    DxButton,
  },
  methods: {
    selected(attachmentAccessRightId) {
      this.$emit("selected", attachmentAccessRightId);
    },
    closeDialog() {
      this.$emit("close");
    },
  },
  computed: {
    avaliableAccessRight() {
      return Object.values(new AttachmentAccessRightModel(this).getAll());
    },
  },
};
</script>

<style>
</style>