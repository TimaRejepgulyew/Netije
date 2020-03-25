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
            :doctype="1"
            @popupDisabled="popupDisabled('popupRegistyDocument')"
          />
        </div>
      </DxPopup>
      <div v-if="registryState.isRegsitrible" class="navBar">
        <DxButton
          v-if="registryState.isRegistered"
          :text="$t('translations.fields.cancelRegistration')"
          icon="clear"
        ></DxButton>
        <DxButton
          v-else
          :disabled=" !registryState.registeryAllowed"
          :text="$t('translations.fields.registration')"
          icon="bulletlist"
          :onClick="()=>{
            this.popupVisible('popupRegistyDocument')
          }"
        ></DxButton>
      </div>
      <form @submit="handleSubmit">
        <mainFocForm @eventWatch="modified()" :properties="store" :docType="1"></mainFocForm>
        <DxForm
          :col-count="1"
          :form-data.sync="store"
          :read-only="false"
          :show-colon-after-label="true"
          :show-validation-summary="true"
          validation-group="incommingLetter"
        >
          <DxGroupItem :col-count="1">
            <DxGroupItem>
              <DxGroupItem :caption="$t('translations.fields.fromWhom')">
                <DxSimpleItem data-field="inNumber">
                  <DxLabel :text="$t('translations.fields.regNumberDocument')" />
                  <DxRequiredRule :message="$t('translations.fields.regNumberDocumentRequired')" />
                </DxSimpleItem>

                <DxSimpleItem
                  data-field="correspondentId"
                  :editor-options="counterPartOptions"
                  editor-type="dxSelectBox"
                >
                  <DxLabel :text="$t('translations.fields.counterPart')" />
                  <DxRequiredRule :message="$t('translations.fields.counterPartRequired')" />
                </DxSimpleItem>

                <DxSimpleItem
                  data-field="deliveryMethodId"
                  :editor-options="deliveryMethodOptions"
                  editor-type="dxSelectBox"
                >
                  <DxLabel :text="$t('translations.menu.mailDeliveryMethod')" />
                </DxSimpleItem>

                <DxGroupItem :visible="isCompany">
                  <DxSimpleItem
                    data-field="contactId"
                    :editor-options="contactOptions"
                    editor-type="dxSelectBox"
                  >
                    <DxLabel :text="$t('translations.menu.contacts')" />
                  </DxSimpleItem>

                  <DxSimpleItem
                    data-field="counterpartySignatoryId"
                    :editor-options="contactOptions"
                    editor-type="dxSelectBox"
                  >
                    <DxLabel :text="$t('translations.fields.signatury')" />
                  </DxSimpleItem>
                </DxGroupItem>

                <DxSimpleItem
                  data-field="dated"
                  :editor-options="datedOptions"
                  editor-type="dxDateBox"
                >
                  <DxLabel :text="$t('translations.fields.dated')" />
                </DxSimpleItem>
              </DxGroupItem>

              <DxGroupItem :caption="$t('translations.fields.whom')">
                <DxSimpleItem
                  data-field="businessUnitId"
                  :editor-options="businessUnitOptions"
                  editor-type="dxSelectBox"
                >
                  <DxLabel :text="$t('translations.fields.businessUnitId')" />
                  <DxRequiredRule :message="$t('translations.fields.businessUnitIdRequired')" />
                </DxSimpleItem>
                <DxSimpleItem
                  data-field="departmentId"
                  :editor-options="deparmentOptions"
                  editor-type="dxSelectBox"
                >
                  <DxLabel :text="$t('translations.fields.departmentId')" />
                  <DxRequiredRule :message="$t('translations.fields.departmentIdRequired')" />
                </DxSimpleItem>

                <DxSimpleItem
                  data-field="addresseeId"
                  :editor-options="addresseeOptions"
                  editor-type="dxSelectBox"
                >
                  <DxLabel :text="$t('translations.fields.whom')" />
                </DxSimpleItem>

                <DxSimpleItem
                  data-field="inResponseToId"
                  :editor-options="inResponseToIdOptions"
                  editor-type="dxSelectBox"
                >
                  <DxLabel :text="$t('translations.fields.inResponseTold')" />
                </DxSimpleItem>
              </DxGroupItem>

              <DxGroupItem :caption="$t('translations.fields.caseFileId')">
                <DxSimpleItem
                  data-field="caseFileId"
                  :editor-options="caseFileOptions"
                  editor-type="dxSelectBox"
                >
                  <DxLabel :text="$t('translations.fields.caseFileId')" />
                </DxSimpleItem>

                <DxSimpleItem data-field="placedToCaseFileDate" editor-type="dxDateBox">
                  <DxLabel :text="$t('translations.fields.placedToCaseFileDate')" />
                </DxSimpleItem>
                <DxSimpleItem data-field="note" editor-type="dxTextArea">
                  <DxLabel :text="$t('translations.fields.note')" />
                </DxSimpleItem>
              </DxGroupItem>
              <DxGroupItem :col-count="12" :col-span="2">
                <DxButtonItem
                  :col-span="11"
                  :button-options="addButtonOptions"
                  horizontal-alignment="right"
                />
                <DxButtonItem
                  :col-span="1"
                  :button-options="cancelButtonOptions"
                  horizontal-alignment="right"
                />
              </DxGroupItem>
            </DxGroupItem>
          </DxGroupItem>
        </DxForm>
      </form>
    </div>
  </div>
</template>
<script>
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
    this.$store.dispatch("paper-work/setDated", this.store.dated);
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
      addressPost: dataApi.paperWork.IncommingLetterPost,
      isUpdating: false,
      headerTitle: this.$t("translations.fields.addIncomLetter"),
      store: {
        subject: "",
        counterpartySignatoryId: null,
        contactId: null,
        correspondentId: null,
        dated: null,
        inResponseToId: null,
        inNumber: null,
        addresseeId: null,
        deliveryMethodId: null,
        note: null,
        caseFileId: null,
        placedToCaseFileDate: null,
        businessUnitId: null,
        departmentId: null,
        version: null
      },
      popupRegistyDocument: false,
      addButtonOptions: {
        width: 100,
        height: 50,
        text: this.$t("translations.links.add"),
        useSubmitBehavior: true,
        type: "success"
      },
      cancelButtonOptions: {
        onClick: this.backTo,
        width: 100,
        height: 50,
        text: this.$t("translations.links.cancel"),
        useSubmitBehavior: false
      },
      isCompany: false,
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
      this.$router.push("/paper-work/incomming-letter");
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
      this.$axios
        .put(this.address, object)
        .then(res => {
          this.backTo();
          this.notify(
            this.$t("translations.headers.updateDocKindSucces"),
            "success"
          );
        })
        .catch(e => {
          this.notify(
            this.$t("translations.headers.updateDocKindError"),
            "error"
          );
        });
    },
    addRequest() {
      this.store = Object.assign(
        this.store,
        this.$store.getters["paper-work/mainFormProperties"]
      );

      this.$axios
        .post(this.addressPost, this.store)
        .then(res => {
          this.this.notify(
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

    counterPartOptions() {
      return {
        dataSource: this.$dxStore({
          key: "id",
          loadUrl: dataApi.contragents.CounterPart
        }),
        onSelectionChanged: e => {
          this.isCompany = e.selectedItem.type != "Person";
        },
        onValueChanged: () => {
          this.store.contactId = null;
          this.store.counterpartySignatoryId = null;
        },
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    deliveryMethodOptions() {
      return {
        dataSource: this.$dxStore({
          key: "id",
          loadUrl: dataApi.docFlow.MailDeliveryMethod
        }),

        valueExpr: "id",
        displayExpr: "name"
      };
    },
    contactOptions() {
      const companyId = this.store.correspondentId;
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.contragents.Contact,
        filter: [["companyId", "=", companyId], "and", ["status", "=", 0]]
      });
    },
    businessUnitOptions() {
      return {
        dataSource: new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.company.BusinessUnit
          }),
          filter: ["status", "=", 0]
        }),
        onValueChanged: e => {
          this.store.departmentId = null;
        },
        valueExpr: "id",
        displayExpr: "name"
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
        ],
        onValueChanged: () => {
          this.store.addresseeId = null;
        }
      });
    },
    addresseeOptions() {
      let departmentId = this.store.departmentId;
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.company.Employee,
        filter: [["departmentId", "=", departmentId], "and", ["status", "=", 0]]
      });
    },
    caseFileOptions() {
      return {
        dataSource: new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.docFlow.CaseFile
          }),
          filter: ["status", "=", 0]
        }),
        valueExpr: "id",
        displayExpr: "title"
      };
    },
    inResponseToIdOptions() {
      return {
        dataSource: new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.paperWork.OutgoingLetter
          }),
          paginate: true,
          pageSize: 5
        }),
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    datedOptions() {
      return {
        onValueChanged: e => {
          this.$store.dispatch("paper-work/setDated", e.value);
        }
      };
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

