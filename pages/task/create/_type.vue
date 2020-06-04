<script>
export default {
  async asyncData({ app, params }) {
    await app.store.dispatch("currentTask/initTask", +params.type);
    app.router.push(
      `/task/detail/${params.type}/${app.store.getters["currentTask/task"].id}`
    );
  }
};
</script>

<style>
</style>