import CustomStore from "devextreme/data/custom_store";
export default async ({ $axios, store }, inject) => {
  const cache = new Map();
  function createStore(key, minutes = 30) {
    const store = new CustomStore({
      key: "id",
      errorHandler: () => {},
      load: async loadOptions => {
        if (cache.has(key)) {
          const data = cache.get(key);
          if (data.expiration <= new Date().getTime()) {
            cache.delete(key);
          } else {
            return cache.get(key).data;
          }
        }
        const { data } = await $axios.get(key);

        const cacheData = {
          expiration: new Date().getTime() + 1000 * 60 * minutes,
          data: data
        };
        cache.set(key, cacheData);

        return data;
      },
      byKey: async key => {
        return { id: 1, name: "2" };
      }
    });
    store._useDefaultSearch = true;
    return store;
  }
  inject("cacheStore", createStore);
};
