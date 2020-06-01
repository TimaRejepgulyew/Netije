<script>
export default {
  async asyncData({ app, params }) {
    await app.store.dispatch("currentDocument/initNewDocument", +params.type);
    app.router.push(
      `/paper-work/detail/${params.type}/${app.store.getters["currentDocument/document"].id}`
    );
  }
};
</script>

<style>
</style>