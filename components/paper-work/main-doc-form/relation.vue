<template>
  <div class="list-container">
    <DxList :data-source="store" :search-expr="['name','authorId']" :search-enabled="true">
      <template #item="item">
        <div @dblclick="()=>{toDocument(item.data.documentTypeGuid,item.data.id)}" class="d-flex">
          <div>
            <i :class="['dx-icon','dx-icon-'+getIcon(item.data.documentTypeGuid)]"></i>
          </div>
          <div>
            <div class="list__content">{{ item.data.name}}</div>
            <div
              class="list__content"
            >{{ item.data.registrationDate}}{{getUserById(item.data.authorId)}} {{item.data.placedToCaseFileDate|formatDate}}</div>
          </div>
        </div>
      </template>
    </DxList>
  </div>
</template>
<script>
import routeGenerator from "~/infrastructure/routing/routeGenerator.js";
import DxList from "devextreme-vue/list";
import dataApi from "~/static/dataApi";
import { DxButton } from "devextreme-vue";
import moment from "moment";
export default {
  components: {
    DxList,
    DxButton
  },
  async created() {
    const { data } = await this.getData(dataApi.company.Employee);
    this.employee = data;
    this.store = await this.getData(
      dataApi.paperWork.Relation +
        this.$store.getters["currentDocument/document"].id
    );
  },
  data() {
    return {
      store: [],
      employee: []
    };
  },
  methods: {
    toDocument(documentTypeGuidId, documentId) {
      this.$router.push(
        `/paper-work/detail/${documentTypeGuidId}/${documentId}`
      );
    },
    async getData(address) {
      const store = await this.$axios.get(address);
      return store.data;
    },
    getIcon(value) {
      switch (value) {
        case 1:
          return "arrowdown";
          break;
        case 2:
          return "arrowup";
          break;
        default:
          return "newfolder";
      }
    },
    getUserById(id) {
      const author = this.employee.find(employeeId => {
        return employeeId === id;
      });
      if (author) return author.name;
      else return "";
    }
  },
  filters: {
    formatDate(value) {
      if (value) {
        return moment(value).format("MM.DD.YYYY");
      } else {
        return "";
      }
    }
  }
};
</script>
<style scoped>
.list-container {
  margin: 3vh auto 0 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.dx-icon {
  font-size: 30px;
  padding: 0 10px;
  font-weight: bold;
}
</style>