import CustomStore from "devextreme/data/custom_store";
const cache = new Map();

export default async ({ $axios }, inject) => {
  function createStore(key, minutes = 30) {
    const load = async (key, loadOptions) => {
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
        data: data.data
      };
      cache.set(key, cacheData);

      return data.data;
    };

    const store = new CustomStore({
      key: "id",
      loadMode: "raw",
      errorHandler: () => {},
      load: async loadOptions => {
        return await load(key, loadOptions);
      }
    });
    store._useDefaultSearch = true;
    return store;
  }

  inject("cacheStore", createStore);
};
