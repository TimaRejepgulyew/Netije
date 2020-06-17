<template>
  <card-task />
</template>
<script>
import dataApi from "~/static/dataApi";
import cardTask from "~/components/task/index.vue";
export default {
  components: {
    cardTask
  },
  asyncData({ app, params }) {
    app.store.dispatch("currentTask/load", {
      type: +params.type,
      id: +params.id
    });
  }
};
</script>
