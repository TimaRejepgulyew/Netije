<template>
  <div>
    <div class="d-flex message" v-if="isImportant">
      <i class="dx-icon dx-icon-info"></i>
      <span>{{$t('translations.fields.importanceMessage')}}</span>
    </div>
    <div class="d-flex isCompleted" v-if="isCompleted">
      <i class="dx-icon dx-icon-check"></i>
      <span>{{$t('translations.fields.completedMessage')}}</span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isImportant() {
      return this.$store.getters["currentAssignment/isImportant"];
    },
    isCompleted() {
      return this.$store.getters["currentAssignment/isCompleted"];
    }
  }
};
</script>

<style lang="scss" scoped >
.message {
  margin: 10px 0 10px 0;
  padding: 5px 10px;
  background: coral;
  color: aliceblue;
}
.isCompleted {
  margin: 10px 0 10px 0;
  padding: 5px 10px;
  background: green;
  color: aliceblue;
  .dx-icon-check {
    margin: 0px 5px;
    border: 3px solid aliceblue;
    border-radius: 30px;
  }
}
.dx-icon-info {
  padding-right: 10px;
  font-size: 25px;
}
</style>