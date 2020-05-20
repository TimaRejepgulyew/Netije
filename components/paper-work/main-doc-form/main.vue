<template>
  <div>
    <div>
      <Header :headerTitle="headerTitle"></Header>
      <toolbar @saveChanges="handleSubmit"></toolbar>
      <DxTabPanel :focus-state-enabled="false" class="tab-bar">
        <DxItem :title="$t('menu.mainInfo')" template="document-form" />
        <div class="d-flex" slot="document-form">
          <div class="item f-grow-3">
            <mainFocForm :properties="store" :docType="docType"></mainFocForm>
            <slot></slot>
            <DxForm
              ref="form"
              :on-field-data-changed="modified"
              :col-count="1"
              :form-data.sync="store"
              :read-only="readOnly"
              :show-colon-after-label="true"
              :show-validation-summary="false"
              validation-group="OfficialDocument"
            >
              <DxSimpleItem
                :col-span="2"
                data-field="note"
                :editor-options="noteOptions"
                editor-type="dxTextArea"
              >
                <DxLabel location="top" :text="$t('translations.fields.note')" />
              </DxSimpleItem>
            </DxForm>
          </div>
          <div class="item" v-show="isUpdating&&$store.getters['currentDocument/isRegistrable']">
            <docRegistration :properties="store" :docType="docType"></docRegistration>
          </div>
          <div v-if="isUpdating" class="item">
            <docVersion></docVersion>
          </div>
        </div>
        <DxItem v-if="isUpdating" :title="$t('menu.relation')" template="relations" />

        <Relation slot="relations"></Relation>
      </DxTabPanel>
    </div>
  </div>
</template>
<script>
import NumberingType from "~/infrastructure/constants/numberingTypes";
import Relation from "~/components/paper-work/main-doc-form/relation";
import { DxTabPanel, DxItem } from "devextreme-vue/tab-panel";
import docVersion from "~/components/paper-work/main-doc-form/doc-version";
import Toolbar from "~/components/paper-work/main-doc-form/toolbar";
import docRegistration from "~/components/paper-work/main-doc-form/doc-registration";
import mainFocForm from "~/components/paper-work/main-doc-form";
import "devextreme-vue/text-area";
import Header from "~/components/page/page__header";
import DataSource from "devextreme/data/data_source";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
  DxRequiredRule
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
import DxButton from "devextreme-vue/button";
const api = dataApi.paperWork;
const requests = {
  post: [
    ,
    api.IncommingLetterPost,
    api.OutgoingLetterPost,
    api.OrderPost,
    api.CompanyDirectivePost,
    api.SimpleDocumentPost,
    api.AddendumPost,
    api.MemoPost,
    api.PowerOfAttorneyPost
  ],
  put: [
    ,
    api.IncommingLetterPut,
    api.OutgoingLetterPut,
    api.OrderPut,
    api.CompanyDirectivePut,
    api.SimpleDocumentPut,
    api.AddendumPut,
    api.MemoPut,
    api.PowerOfAttorneyPut
  ]
};

export default {
  components: {
    Relation,
    DxTabPanel,
    DxItem,
    docVersion,
    Toolbar,
    docRegistration,
    DxButton,
    mainFocForm,
    Header,
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxForm,
    DxRequiredRule
  },
  props: ["store", "headerTitle", "docType"],
  created() {
    if (this.$route.params.id != "add") {
      this.$store.commit("currentDocument/DATA_CHANGED", false);
      this.isUpdating = true;
    }
  },
  data() {
    return {
      isUpdating: false
    };
  },
  methods: {
    modified() {
      this.$store.commit("currentDocument/DATA_CHANGED", true);
    },
    updateRequest(store, close) {
      this.$awn.asyncBlock(
        this.$axios.put(
          requests.put[this.docType] + this.$route.params.id,
          store
        ),
        res => {
          this.$awn.success();
          this.$store.commit("currentDocument/DATA_CHANGED", false);
          if (close) this.$router.go(-1);
        },
        e => {
          this.$awn.alert();
        }
      );
    },
    addRequest(store, close) {
      this.$awn.asyncBlock(
        this.$axios.post(requests.post[this.docType], store),
        res => {
          this.$awn.success();
          if (close) this.$router.go(-1);
          else
            this.$router.replace({
              name: this.$route.name,
              params: { id: res.data }
            });
        },
        e => {
          this.$awn.alert();
        }
      );
    },
    handleSubmit(close) {
      var res = this.$refs["form"].instance.validate();
      if (!res.isValid) return;
      this.loadingVisible = true;
      const store = Object.assign(
        this.store,
        this.$store.getters["paper-work/mainFormProperties"]
      );
      if (this.isUpdating) {
        this.updateRequest(store, close);
      } else {
        this.addRequest(store, close);
      }
    }
  },
  computed: {
    readOnly() {
      return this.$store.getters["currentDocument/readOnly"];
    },
    noteOptions() {
      return {
        height: 70,
        autoResizeEnabled: true
      };
    }
  }
};
</script>
<style scoped>
.tab-bar {
  margin-top: 10px;
}
.item {
  flex-grow: 1;
  padding: 0 15px;
  width: 20%;
}
.f-grow-3 {
  flex-basis: 35%;
  flex-grow: 5;
}
</style>
