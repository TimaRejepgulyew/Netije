<template>
  <div>
    <div>
      <DxLoadPanel :visible.sync="loadingVisible" id="large-indicator" :indicatorSrc="icon" />
      <Header :headerTitle="headerTitle"></Header>
      <toolbar :saveChanges="handleSubmit"></toolbar>
      <DxTabPanel :focus-state-enabled="false" class="tab-bar">
        <DxItem :title="$t('menu.mainInfo')" template="members-list" />
        <form class="d-flex" @submit="handleSubmit" slot="members-list">
          <div class="item f-grow-3">
            <mainFocForm @eventWatch="modified" :properties="store" :docType="docType"></mainFocForm>
            <slot></slot>
            <DxForm
              :col-count="1"
              :form-data.sync="store"
              :read-only="readOnly"
              :show-colon-after-label="true"
              :show-validation-summary="true"
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
          <div class="item" v-if="isUpdating">
            <docRegistration @eventWatch="modified" :properties="store" :docType="docType"></docRegistration>
          </div>
          <div v-if="isUpdating" class="item">
            <docVersion></docVersion>
          </div>
        </form>
        <DxItem v-if="isUpdating" :title="$t('menu.relation')" template="relations" />
        <Relation slot="relations"></Relation>
      </DxTabPanel>
    </div>
  </div>
</template>
<script>
import NumberingType from "~/infrastructure/constants/numberingTypes";
import { DxLoadPanel } from "devextreme-vue/load-panel";
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
import notify from "devextreme/ui/notify";
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
    api.OrderPost,
    api.CompanyDirectivePut,
    api.SimpleDocumentPut,
    api.AddendumPut,
    api.MemoPut,
    api.PowerOfAttorneyPut
  ]
};

export default {
  components: {
    DxLoadPanel,
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
      this.isUpdating = true;
    }
  },
  data() {
    return {
      addressGet: dataApi.paperWork.GetDocumentById,
      addressPost: requests.post[this.docType],
      addressPut: requests.put[this.docType],
      isUpdating: false,
      loadingVisible: false,
      icon: require("~/static/icons/loading.gif")
    };
  },
  methods: {
    modified() {},
    backTo() {
      this.$router.go(-1);
    },
    notify(msgTxt, msgType) {
      notify(
        {
          message: msgTxt,
          position: {
            my: "center top",
            at: "center top"
          }
        },
        msgType,
        3000
      );
    },
    updateRequest(store) {
      store.id = +this.$route.params.id;
      this.$axios
        .put(this.addressPut + this.$route.params.id, store)
        .then(res => {
          this.loadingVisible = false;
          this.$emit("saved");
          this.notify(
            this.$t("translations.headers.updateDocKindSucces"),
            "success"
          );
        })
        .catch(e => {
          this.loadingVisible = false;
          this.notify(
            this.$t("translations.headers.updateDocKindError"),
            "error"
          );
        });
    },
    addRequest(store) {
      this.$axios
        .post(this.addressPost, store)
        .then(res => {
          this.notify(
            this.$t("translations.headers.addDoctKindSucces"),
            "success"
          );
          this.loadingVisible = false;
          this.$router.push({
            name: this.$route.name,
            params: { id: res.data }
          });
        })
        .catch(e => {
          this.loadingVisible = false;
          this.notify(
            this.$t("translations.headers.addDoctKindError"),
            "error"
          );
        });
    },
    handleSubmit() {
      this.loadingVisible = true;
      const store = Object.assign(
        this.store,
        this.$store.getters["paper-work/mainFormProperties"]
      );
      if (this.isUpdating) {
        this.updateRequest(store);
      } else {
        this.addRequest(store);
      }
    }
  },
  computed: {
    readOnly() {
      return this.$store.getters["currentDocument/readOnly"];
    },
    saveButtonOptions() {
      return {
        ...this.$store.getters["globalProperties/btnSave"](this),
        disabled: this.isDataChanged
      };
    },
    cancelButtonOptions() {
      return this.$store.getters["globalProperties/btnCancel"](
        this,
        this.backTo
      );
    },
    noteOptions() {
      return {
        onValueChanged: () => {
          this.modified();
        },

        height: 70,
        autoResizeEnabled: true
      };
    }
  }
};
</script>
<style>
.mr-top-auto {
  margin-top: 40%;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.tab-bar {
  margin-top: 10px;
}
</style>
