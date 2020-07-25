<template>
  <div>
    <div class="d-flex align-center">
      <label class="pr-2">{{$t("assignment.readdressToEmployee")}}</label>
      <div class="f-grow-1">
        <employee-select-box
          valueExpr="id"
          :read-only="!canUpdate"
          :value="addresseeId"
          @valueChanged="valueChanged"
        />
      </div>
    </div>
    <ul>
      <li v-for="item in projectReslotions.entities" :key="item.attachmentId">
        <resolutionTask :key="item.attachmentId" :task="item" />
      </li>
    </ul>
  </div>
</template>

<script>
import resolutionTask from "~/components/workFlow/resolution-task-list.vue";
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
export default {
  components: {
    employeeSelectBox,
    resolutionTask
  },
  props: ["assignmentId"],
  methods: {
    valueChanged(id) {
      this.$store.commit(
        `assignments/${this.assignmentId}/SET_ADDRESSEE_ID`,
        id
      );
    }
  },
  computed: {
    addresseeId() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`]
        .addresseeId;
    },
    canUpdate() {
      return this.$store.getters[`assignments/${this.assignmentId}/canUpdate`];
    },
    projectReslotions() {
      const attachments = this.$store.getters[
        `assignments/${this.assignmentId}/assignment`
      ].attachmentGroups;
      return attachments.find(attachment => {
        return attachment.groupId === 11;
      });
    }
  }
};
</script>

<style>
.pr-2 {
  padding-right: 20px;
}
</style>