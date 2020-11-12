<template>
  <div class="list-container">
    <DxPopup
      position="{ my: 'center', at: 'center', of: window }"
      :visible.sync="isOpenPopup"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="false"
      width="90%"
      height="95%"
    >
      <div class="scrool-auto">
        <document-card
          v-if="isOpenPopup"
          :isCard="true"
          @onClose="togglePopup"
          :documentId="currentRelationId"
        />
      </div>
    </DxPopup>
    <DxButton
      :hint="$t('buttons.refresh')"
      class="refresh-btn"
      icon="refresh"
      :onClick="refresh"
    ></DxButton>
    <DxList :data-source="store" :search-enabled="false">
      <template #item="item">
        <div
          @dblclick="
            openDocumentCard({
              documentTypeGuid: item.data.documentTypeGuid,
              documentId: item.data.id
            })
          "
        >
          <div class="d-flex">
            <img
              class="custom-icon"
              :src="getIcon(item.data.documentTypeGuid)"
              alt
            />

            <div>
              <div class="list__content">{{ item.data.name }}</div>
            </div>
          </div>
          <div class="list__content">
            {{ getUserById(item.data.authorId) }}
            {{ item.data.placedToCaseFileDate | formatDate }}
          </div>
        </div>
      </template>
    </DxList>
  </div>
</template>
<script>
import { load } from "~/infrastructure/services/documentService.js";
import routeGenerator from "~/infrastructure/routing/routeGenerator.js";
import DxList from "devextreme-vue/list";
import dataApi from "~/static/dataApi";
import { DxButton } from "devextreme-vue";
import DataSource from "devextreme/data/data_source";
import moment from "moment";
import DocumentType from "~/infrastructure/models/DocumentType.js";
import { DxPopup } from "devextreme-vue/popup";
export default {
  components: {
    DxList,
    DxButton,
    DxPopup,
    documentCard: async () =>
      import("~/components/document-module/main-doc-form/index.vue")
  },
  props: ["documentId"],
  async created() {
    const { data } = await this.getData(dataApi.company.Employee);
    this.employee = data;
  },
  data() {
    return {
      isOpenPopup: false,
      store: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: `${dataApi.documentModule.Relation}${
            this.$store.getters[`documents/${this.documentId}/document`]
              .documentTypeGuid
          }/${this.documentId}`
        }),
        paginate: false
      }),
      documentTypes: new DocumentType(this),
      employee: [],
      currentRelationId: false
    };
  },
  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    }
  },
  methods: {
    refresh() {
      this.store.reload();
    },
    togglePopup() {
      this.isOpenPopup = !this.isOpenPopup;
    },
    openDocumentCard({ documentTypeGuid, documentId }) {
      this.$awn.asyncBlock(load(this, { documentTypeGuid, documentId }), () => {
        this.currentRelationId = documentId;
        this.togglePopup();
      });
    },
    async getData(address) {
      const store = await this.$axios.get(address);
      return store.data;
    },
    getIcon(value) {
      return this.documentTypes.getById(value).icon;
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
<style>
.list-container {
  margin: 3vh auto 0 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
</style>
