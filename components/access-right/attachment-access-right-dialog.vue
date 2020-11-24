<template>
  <div class="d-flex f-column js-space-between">
    <div>
      <div class="fon-size-1-2em">
        {{
          $t(
            "attachmentAccessRight.message.whatPermissionsWillAssignToAttachment"
          )
        }}
      </div>
      <div>{{ $t("attachmentAccessRight.message.nothaveAccessRight") }}</div>
    </div>
    <div class="d-flex">
      <div
        class="avaliableAccessRightBtn"
        v-for="btn in avaliableAccessRight"
        :key="btn.id"
      >
        <DxButton :text="btn.text" :on-click="() => selected(btn.id)" />
      </div>
      <div class="avaliableAccessRightBtn">
        <DxButton
          :text="$t('attachmentAccessRight.btns.DoNotAssign')"
          :hint="$t('attachmentAccessRight.btns.DoNotAssign')"
          :on-click="doNotAsign"
        />
      </div>
      <div class="avaliableAccessRightBtn">
        <DxButton
          :text="$t('buttons.cancel')"
          :hint="$t('buttons.cancel')"
          :on-click="closeDialog"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DxButton from "devextreme-vue/button";
import AttachmentAccessRightModel from "~/infrastructure/models/AttachmentAccessRight.js";
import attachmentAccessRight from "~/infrastructure/constants/attachmentAccessRight.js";
export default {
  components: {
    DxButton
  },
  props: {
    maxOperation: {
      type: Number
    }
  },
  methods: {
    selected(attachmentAccessRightId) {
      this.$emit("selected", attachmentAccessRightId);
    },
    doNotAsign() {
      this.$emit("selected");
    },
    closeDialog() {
      this.$emit("close");
    }
  },
  computed: {
    avaliableAccessRight() {
      return Object.values(
        new AttachmentAccessRightModel(this).filtering(this.maxOperation)
      );
    }
  }
};
</script>

<style lang="scss">
.avaliableAccessRightBtn {
  display: block;
  padding: 0 5px;
}
</style>
