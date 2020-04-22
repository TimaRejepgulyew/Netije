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
            >{{ item.data.registrationDate}}{{item.data.authorId}} {{item.data.placedToCaseFileDate|getFormat}}</div>
          </div>
        </div>
      </template>
    </DxList>
  </div>
</template>
<script>
import DxList from "devextreme-vue/list";
import dataApi from "~/static/dataApi";
import { saveAs } from "file-saver";
import { DxButton } from "devextreme-vue";
import moment from "moment";

export default {
  components: {
    DxList,
    DxButton
  },
  async created() {
    this.employee = await this.getData(dataApi.company.Employee);
    this.store = await this.getData(
      dataApi.paperWork.Relation + this.$route.params.id
    );
    this.store.map(document => {
      document.authorId = this.employee.data.find(el => {
        if (document.authorId == 7) {
          return "Admin";
        } else {
          return el.id == document.authorId;
        }
      }).name;
    });
  },
  data() {
    return {
      store: [],
      employee: []
    };
  },
  methods: {
    toDocument(documentTypeGuidId, documentId) {
      const docKindPath = [
        ,
        "incomming-letter",
        "outgoing-letter",
        ,
        ,
        ,
        "addendum"
      ];
      this.$router.push(
        `/paper-work/${docKindPath[documentTypeGuidId]}/form/${documentId}`
      );
    },
    async getData(address) {
      const store = await this.$axios.get(address);

      return store.data;
    },
    getEmployee(id) {
      return this.employee.find(el => {
        return el.id == id;
      });
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
    }
  },
  filters: {
    getFormat(value) {
      if (value) {
        return moment(value).format("L");
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