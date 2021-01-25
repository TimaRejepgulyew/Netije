export default async function ({ store }) {
  await store.dispatch("cache/loadAll");
  await store.dispatch("autocomlete-texts/loadTexts");
  await store.dispatch("")
}
