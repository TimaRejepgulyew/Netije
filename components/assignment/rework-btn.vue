<template>
  <div>
    <DxPopup
      :showTitle="false"
      :visible.sync="showComment"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      :width="500"
      :height="'auto'"
    >
      <div>
        <comment-form @sendRequest="reworkAssignment" @tooglePopup="tooglePopup" />
      </div>
    </DxPopup>
    <DxButton :text="$t('buttons.rework')" icon="undo" type="danger" :on-click="tooglePopup" />
  </div>
</template>
<script>
import ReviewResult from "~/infrastructure/constants/reviewResult.js";
import commentForm from "~/components/assignment/comment-form.vue";
import AssignmentType from "~/infrastructure/constants/assignmentType.js";
import { DxPopup } from "devextreme-vue/popup";
import { DxButton } from "devextreme-vue";
export default {
  components: {
    ReviewResult,
    commentForm,
    DxButton,
    DxPopup
  },
  data() {
    return {
      showComment: false
    };
  },
  methods: {
    tooglePopup() {
      this.showComment = !this.showComment;
    },
    reworkAssignment() {
      this.$awn.asyncBlock(
        this.$store.dispatch(
          "currentAssignment/complete",
          ReviewResult.ForRework
        ),
        e => {
          this.$router.go(-1);
          this.$awn.success();
        },
        e => this.$awn.alert()
      );
    }
  },
  computed: {}
};
</script>

<style>
</style>