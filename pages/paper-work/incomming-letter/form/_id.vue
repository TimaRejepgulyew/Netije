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

        <div>
          <div class="container" v-if="
          registryState.isRegistered">
            <p>{{$t('translations.fields.areYouSure')}}</p>
            <div class="button-group mr-top-auto">
              <DxButton :text="$t('translations.links.yes')"></DxButton>
              <DxButton
                :text="$t('translations.links.no')"
                :onClick="()=>{
                  this.popupDisabled('popupRegistyDocument')
                }"
              ></DxButton>
            </div>
          </div>

          <popup-registy-document
            v-else
            :store="object"
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
          :onClick="popupVisible"
        ></DxButton>
      </div>
      <form @submit="handleSubmit">
        <mainFocForm :docType="1"></mainFocForm>
        <DxForm
          :col-count="1"
          :form-data.sync="store"
          :read-only="false"
          :show-colon-after-label="true"
          :show-validation-summary="true"
          validation-group="incommingLetter"
        >
          <DxGroupItem :col-count="2" :caption="$t('translations.fields.fromWhom')">
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

            <DxSimpleItem data-field="dated" :editor-options="datedOptions" editor-type="dxDateBox">
              <DxLabel :text="$t('translations.fields.dated')" />
            </DxSimpleItem>
          </DxGroupItem>

          <DxGroupItem :col-count="2" :caption="$t('translations.fields.whom')">
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
              <DxRequiredRule :message="$t('translations.fields.departmentIdRequired')" />
            </DxSimpleItem>

            <DxSimpleItem
              data-field="inResponseToId"
              :editor-options="inResponseToIdOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel :text="$t('translations.fields.inResponseTold')" />
            </DxSimpleItem>
          </DxGroupItem>

          <DxGroupItem :col-count="2" :caption="$t('translations.fields.caseFileId')">
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
          </DxGroupItem>
          <DxSimpleItem data-field="note" editor-type="dxTextArea">
            <DxLabel :text="$t('translations.fields.note')" />
          </DxSimpleItem>
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
        </DxForm>
      </form>
    </div>
  </div>
</template>
<script>

import popupRegistyDocument from "~/components/paper-work/main-doc-form/popup-registy-document";
import mainFocForm from "~/components/paper-work/main-doc-form/index";
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
export default {
  components: {
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
  async created() {
    if (this.$route.params.id != "add") {
      this.isUpdating = true;
    }
  },
  data() {
    return {
      addressGet: dataApi.paperWork.IncommingLetter,
      addressPost: dataApi.paperWork.IncommingLetterPost,
      isUpdating: false,
      headerTitle: this.$t("translations.headers.addDocumentKind"),
      store: {
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
        // electronicDocumentVersionId: null
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
      isDefaultName: false
    };
  },
  methods: {
    popupDisabled(popup) {
      this[popup] = false;
    },
    popupVisible() {
      this.popupRegistyDocument = true;
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
          this.backTo();
          this.notify(
            this.$t("translations.headers.addDoctKindSucces"),
            "success"
          );
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
        this.$store.getters["paper-work/documentKind"]("numberingType") != 2
          ? true
          : false;
      return {
        isRegsitrible,
        isRegistered: this.store.registrationState == 0,
        registeryAllowed: this.store.registrationState != 1
      };
    },

    counterPartOptions() {
      return {
        dataSource: this.$dxStore({
          key: "id",
          loadUrl: dataApi.contragents.CounterPart
        }),
        onSelectionChanged: e => {
          this.store.contactId = null;
          this.store.counterpartySignatoryId = null;
          this.isCompany = e.selectedItem.type != "Person";
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
      return {
        dataSource: new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.contragents.Contact
          }),
          filter: [["companyId", "=", companyId], "and", ["status", "=", 0]]
        }),
        valueExpr: "id",
        displayExpr: "name"
      };
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
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    deparmentOptions() {
      let businessUnitId = this.store.businessUnitId;
      this.store.departmentId = null;
      return {
        dataSource: new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.company.Department
          }),
          filter: [
            ["businessUnitId", "=", businessUnitId],
            "and",
            ["status", "=", 0]
          ]
        }),
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    addresseeOptions() {
      let departmentId = this.store.departmentId;
      this.store.addresseeId = null;
      return {
        dataSource: new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.company.Employee
          }),
          filter: [
            ["departmentId", "=", departmentId],
            "and",
            ["status", "=", 0]
          ]
        }),
        valueExpr: "id",
        displayExpr: "name"
      };
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

