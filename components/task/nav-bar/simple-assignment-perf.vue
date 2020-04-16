<template>
  <div class="nav-bar">
    <DxButton
      icon="check"
      :height="40"
      :on-click="completeAssignment"
      :text="$t('translations.links.complete')"
    ></DxButton>
  </div>
</template>
<script>
import DxButton from "devextreme-vue/button";
export default {
  components: {
    DxButton
  },
  methods: {
    completeAssignment() {
      const store = {};
      store.assignmentType = this.store.assignmentType;
      store.assignmentId = parseInt(this.$route.params.id);
      store.attachmentDetails = this.store.attachmentDetails;

      this.$axios
        .post(
          "http://192.168.4.57:8090/api/Assignment/CompleteAssignment",
          store
        )
        .then(() => (this.store.status = 2))
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>