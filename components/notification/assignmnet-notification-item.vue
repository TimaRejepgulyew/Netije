<template>
  <div>
    <div class="d-flex list border-bottom">
      <div class="list__icon">
        <img :src="assignmentModel.getById(item.data.assignmnetType).icon" />
      </div>
      <div class="list__content f-grow-1 max-width-200px">{{ item.data.subject}}</div>
      <div class="list__content">{{ assignmentModel.getById(item.data.assignmnetType).text}}</div>
      <div class="list__btn-group js-self-flex-end">
        <DxButton @click="()=>removeLink(item.data.assignmentId)" icon="clear" stylingMode="text"></DxButton>
      </div>
    </div>
  </div>
</template>

<script>
import DxButton from "devextreme-vue/button";
import AssignmentType from "~/infrastructure/models/AssignmentType.js";
import { mapGetters } from "vuex";
import DxList from "devextreme-vue/list";
export default {
  props: ["item", "assignmentModel"],
  components: {
    DxButton,
    DxList,
  },
  computed: {
    ...mapGetters({
      notification: "notificationHub/assignmentNotification",
    }),
  },
  methods: {
    removeLink(notifyId) {},
    selectNotify(currentNotification) {
      this.$emit("selectedNotification", currentNotification);
    },
  },
};
</script>

<style lang="scss">
.list {
  cursor: pointer;
}
.list:hover {
  background: green;
}
.f-grow-1 {
  flex-grow: 1;
}
.list__content {
  line-height: 30px;
}
.max-width-200px {
  max-width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.list__icon {
  font-size: 25px;
  padding: 0 10px;
  img {
    width: 22px;
  }
}
.js-self-flex-end {
  margin-left: auto;
  justify-self: flex-end;
}
// .border-bottom {
//   padding-bottom: 5px;
//   border-bottom: 1px solid gray;
// }
</style>
