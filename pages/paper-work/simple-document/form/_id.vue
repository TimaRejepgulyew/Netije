<template>
  <div id="form-demo">
    <div class="widget-container">
      <Header :headerTitle="headerTitle"></Header>
      <DxPopup
        :visible.sync="popupRegistyDocument"
        :drag-enabled="false"
        :close-on-outside-click="true"
        :show-title="true"
        :width="500"
        :height="'auto'"
        :title="registryState.isRegistered ? $t('translations.fields.cancelRegistration'):$t('translations.fields.registration')"
      >
        <div v-if="popupRegistyDocument">
          <popupCancelDocumentRegistry
            v-if="
          registryState.isRegistered"
            @popupDisabled="popupDisabled('popupRegistyDocument')"
          ></popupCancelDocumentRegistry>

          <popup-registy-document
            v-else
            :docType="5"
            @popupDisabled="popupDisabled('popupRegistyDocument')"
          />
        </div>
      </DxPopup>
      <navBar :registryState="registryState" @popupVisible="popupVisible('popupRegistyDocument')"></navBar>

      <form class="d-flex" @submit="handleSubmit">
        <div class="item f-grow-3">
          <mainFocForm @eventWatch="modified()" :properties="store" :docType="5"></mainFocForm>
          <DxForm
            :col-count="1"
            :form-data.sync="store"
            :read-only="false"
            :show-colon-after-label="true"
            :show-validation-summary="true"
            validation-group="OfficialDocument"
          >
            <DxGroupItem :col-count="1">
              <DxGroupItem>
                <DxSimpleItem
                  data-field="businessUnitId"
                  :editor-options="businessUnitOptions"
                  editor-type="dxSelectBox"
                >
                  <DxLabel location="top" :text="$t('translations.fields.businessUnitId')" />
                  <DxRequiredRule :message="$t('translations.fields.businessUnitIdRequired')" />
                </DxSimpleItem>
                <DxSimpleItem
                  data-field="departmentId"
                  :editor-options="deparmentOptions"
                  editor-type="dxSelectBox"
                >
                  <DxLabel location="top" :text="$t('translations.fields.departmentId')" />
                  <DxRequiredRule :message="$t('translations.fields.departmentIdRequired')" />
                </DxSimpleItem>
              </DxGroupItem>
              <DxGroupItem></DxGroupItem>
              <DxSimpleItem :col-span="1" data-field="note" editor-type="dxTextArea">
                <DxLabel location="top" :text="$t('translations.fields.note')" />
              </DxSimpleItem>
              <DxGroupItem :col-count="12" :col-span="2">
                <DxButtonItem
                  :col-span="1"
                  :button-options="saveButtonOptions"
                  horizontal-alignment="right"
                />
                <DxButtonItem
                  :col-span="1"
                  :button-options="cancelButtonOptions"
                  horizontal-alignment="right"
                />
              </DxGroupItem>
            </DxGroupItem>
          </DxForm>
        </div>
        <div class="item">
          <docRegistration @eventWatch="modified()" :properties="store" :docType="5"></docRegistration>
        </div>
        <div v-if="isUpdating" class="item">
          <docVersion></docVersion>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import docVersion from "~/components/paper-work/main-doc-form/doc-version";
import navBar from "~/components/paper-work/main-doc-form/nav-bar";
import docRegistration from "~/components/paper-work/main-doc-form/doc-registration";
import popupCancelDocumentRegistry from "~/components/paper-work/main-doc-form/popup-cancel-document-registry";
import popupRegistyDocument from "~/components/paper-work/main-doc-form/popup-registy-document";
import mainFocForm from "~/components/paper-work/main-doc-form";
import { DxPopup } from "devextreme-vue/popup";
import "devextreme-vue/text-area";
import Header from "~/components/page/page__header";
import DataSource from "devextreme/data/data_source";

import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
  DxRequiredRule,
  DxCompareRule,
  DxRangeRule,
  DxStringLengthRule,
  DxPatternRule,
  DxAsyncRule
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
import notify from "devextreme/ui/notify";
import DxButton from "devextreme-vue/button";
let unwatch;
export default {
  components: {
    docVersion,
    navBar,
    docRegistration,
    popupCancelDocumentRegistry,
    popupRegistyDocument,
    DxButton,
    mainFocForm,
    Header,
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxRequiredRule,
    DxCompareRule,
    DxPatternRule,
    DxRangeRule,
    DxForm,
    DxAsyncRule,
    DxPopup,
    notify
  },
  created() {
    this.eventIsModified();
    this.$store.dispatch("paper-work/setMainFormProperties", {
      correspondentId: this.store.correspondentId
    });
  },
  async asyncData({ app, params }) {
    if (params.id != "add") {
      let store = await app.$axios.get(
        dataApi.paperWork.GetDocumentById + params.id
      );
      return {
        store: store.data.document,
        isUpdating: true
      };
    } else {
      return {};
    }
  },
  data() {
    return {
      addressGet: dataApi.paperWork.GetDocumentById,
      addressPost: dataApi.paperWork.SimpleDocumentPost,
      isUpdating: false,
      headerTitle: this.$t("translations.headers.simpleDocument"),
      store: {
        name: "",
        subject: "",
        note: "",
        documentKindId: null,
        caseFileId: null,
        placedToCaseFileDate: null,
        businessUnitId: null,
        departmentId: null
      },
      popupRegistyDocument: false,
      isDefaultName: false,
      isSaved: false
    };
  },
  methods: {
    modified() {
      console.log("watch is work ");
      this.isSaved = false;
      unwatch();
    },
    eventIsModified() {
      if (this.isUpdating) {
        this.isSaved = true;
        unwatch = this.$watch("store", this.modified, { deep: true });
      }
    },
    popupDisabled(popup) {
      this[popup] = false;
    },
    popupVisible(popup) {
      this[popup] = true;
    },
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
    updateRequest() {
      // this.$axios
      //   .put(this.address,)
      //   .then(res => {
      //     this.backTo();
      //     this.notify(
      //       this.$t("translations.headers.updateDocKindSucces"),
      //       "success"
      //     );
      //   })
      //   .catch(e => {
      //     this.notify(
      //       this.$t("translations.headers.updateDocKindError"),
      //       "error"
      //     );
      //   });
    },
    addRequest() {
      this.store = Object.assign(
        this.store,
        this.$store.getters["paper-work/mainFormProperties"]
      );
      this.$axios
        .post(this.addressPost, this.store)
        .then(res => {
          this.notify(
            this.$t("translations.headers.addDoctKindSucces"),
            "success"
          );
          this.$router.push({
            name: this.$route.name,
            params: { id: res.data }
          });
        })
        .catch(e => {
          this.notify(
            this.$t("translations.headers.addDoctKindError"),
            "error"
          );
        });
    },
    handleSubmit(e) {
      if (this.isUpdating) {
        this.updateRequest();
      } else {
        this.addRequest();
      }

      e.preventDefault();
    }
  },
  computed: {
    saveButtonOptions() {
      return this.$store.getters["globalProperties/btnSave"](this);
    },
    cancelButtonOptions() {
      return this.$store.getters["globalProperties/btnCancel"](
        this,
        this.backTo
      );
    },
    registryState() {
      const isRegsitrible =
        this.$store.getters["paper-work/documentKind"]("numberingType") != 3
          ? true
          : false;
      return {
        isRegsitrible,
        isRegistered: this.store.registrationState == 0,
        registeryAllowed: !this.store.registrationState && this.isSaved
      };
    },
    businessUnitOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.BusinessUnit,
          filter: ["status", "=", 0]
        }),
        onValueChanged: e => {
          this.store.departmentId = null;
        }
      };
    },
    deparmentOptions() {
      let businessUnitId = this.store.businessUnitId;
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.company.Department,
        filter: [
          ["businessUnitId", "=", businessUnitId],
          "and",
          ["status", "=", 0]
        ]
      });
    }
  }
};
</script>
<style>
form {
  margin: 10px;
}
.navBar {
  display: flex;
  justify-content: flex-end;
}
.mr-top-auto {
  margin-top: 40%;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
</style>

