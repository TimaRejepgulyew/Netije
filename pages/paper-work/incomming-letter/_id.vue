<template>
  <div id="form-demo">
    <div class="widget-container">
      <MainForm :store="store">
        <DxForm
          :col-count="1"
          :form-data.sync="store"
          :read-only="false"
          :show-colon-after-label="true"
          :show-validation-summary="true"
          validation-group="OfficialDocument"
        >
          <DxGroupItem :col-count="2">
            <DxGroupItem :caption="$t('translations.fields.fromWhom')">
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

              <DxSimpleItem
                data-field="ourSignatoryId"
                :editor-options="employeeOptions"
                editor-type="dxSelectBox"
              >
                <DxLabel location="top" :text="$t('translations.fields.signatory')" />
              </DxSimpleItem>

              <DxSimpleItem
                data-field="preparedById"
                :editor-options="employeeOptions"
                editor-type="dxSelectBox"
              >
                <DxLabel location="top" :text="$t('translations.fields.prepared')" />
                <DxRequiredRule :message="$t('translations.fields.preparedByIdRequired')" />
              </DxSimpleItem>
            </DxGroupItem>

            <DxGroupItem :caption="$t('translations.fields.whom')">
              <DxSimpleItem
                data-field="correspondentId"
                :editor-options="counterPartOptions"
                editor-type="dxSelectBox"
              >
                <DxLabel location="top" :text="$t('translations.fields.counterPart')" />
                <DxRequiredRule :message="$t('translations.fields.counterPartRequired')" />
              </DxSimpleItem>

              <DxSimpleItem
                data-field="contactId"
                :visible="isCompany"
                :editor-options="contactOptions"
                editor-type="dxSelectBox"
              >
                <DxLabel location="top" :text="$t('translations.fields.contactId')" />
              </DxSimpleItem>

              <DxSimpleItem
                data-field="deliveryMethodId"
                :editor-options="deliveryMethodOptions"
                editor-type="dxSelectBox"
              >
                <DxLabel location="top" :text="$t('translations.fields.mailDeliveryMethod')" />
              </DxSimpleItem>
              <DxSimpleItem
                data-field="inResponseToId"
                :editor-options="inResponseToIdOptions"
                editor-type="dxSelectBox"
              >
                <DxLabel location="top" :text="$t('translations.fields.inResponseTold')" />
              </DxSimpleItem>
            </DxGroupItem>

            <DxSimpleItem :col-span="2" data-field="note" editor-type="dxTextArea">
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
      </MainForm>
    </div>
  </div>
</template>
<script>
import MainForm from "~/components/paper-work/main-doc-form/main";

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
    MainForm,
    DxButton,
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
    notify
  },
  created() {
    this.eventIsModified();
    this.$store.dispatch("paper-work/setMainFormProperties", {
      correspondent: ""
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
      addressPost: dataApi.paperWork.OutgoingLetterPost,
      isUpdating: false,
      headerTitle: this.$t("translations.headers.outgoingLetter"),
      store: {
        subject: "",
        ourSignatoryId: null,
        contactId: null,
        correspondentId: null,
        contactId: null,
        inResponseToId: null,
        deliveryMethodId: null,
        note: null,
        caseFileId: null,
        placedToCaseFileDate: null,
        businessUnitId: null,
        departmentId: null,
        ourSignatoryId: null,
        preparedById: null,
        version: null
      },
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

    counterPartOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.contragents.CounterPart
        }),
        onSelectionChanged: e => {
          if (e.selectedItem) {
            this.isCompany = e.selectedItem.type != "Person";
            this.$store.dispatch("paper-work/setMainFormProperties", {
              correspondent: e.selectedItem.name
            });
          } else {
            this.$store.dispatch("paper-work/setMainFormProperties", {
              correspondent: ""
            });
            this.isCompany = false;
          }
        },
        onValueChanged: e => {
          // this.store.contactId = null;
        }
      };
    },
    deliveryMethodOptions() {
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.docFlow.MailDeliveryMethod
      });
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
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.BusinessUnit,
          filter: ["status", "=", 0]
        }),
        onValueChanged: e => {
          this.store.departmentId = null;
          this.store.ourSignatoryId = null;
          this.store.preparedById = null;
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
    },
    employeeOptions() {
      let businessUnitId = this.store.businessUnitId;
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.company.Employee,
        filter: [
          ["businessUnitId", "=", businessUnitId],
          "and",
          ["status", "=", 0]
        ]
      });
    },
    inResponseToIdOptions() {
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.paperWork.IncommingLetter
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
