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
            :docType="docType"
            @popupDisabled="popupDisabled('popupRegistyDocument')"
          />
        </div>
      </DxPopup>
      <navBar :registryState="registryState" @popupVisible="popupVisible('popupRegistyDocument')"></navBar>
      <DxTabPanel>
        <DxItem :title="$t('translations.menu.mainInfo')" template="members-list" />
        <form class="d-flex" @submit="handleSubmit" slot="members-list">
          <div class="item f-grow-3">
            <mainFocForm
              @eventWatch="modified"
              :isSaved="isSaved"
              :properties="store"
              :docType="docType"
            ></mainFocForm>
            <slot></slot>
            <DxForm
              :col-count="1"
              :form-data.sync="store"
              :read-only="!hasPermissions"
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
              <DxGroupItem :col-count="12" :col-span="2">
                <DxButtonItem
                  :visible="hasPermissions"
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
            </DxForm>
          </div>
          <div class="item">
            <docRegistration @eventWatch="modified" :properties="store" :docType="docType"></docRegistration>
          </div>
          <div v-if="isUpdating" class="item">
            <docVersion></docVersion>
          </div>
        </form>
        <DxItem
          v-if="isUpdating"
          :title="$t('translations.menu.relation')"
          template="access-right-list"
        />
        <Relation slot="access-right-list"></Relation>
      </DxTabPanel>
    </div>
  </div>
</template>
<script>
import Relation from "~/components/paper-work/main-doc-form/relation";
import { DxTabPanel, DxItem } from "devextreme-vue/tab-panel";
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
  DxRequiredRule
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
import notify from "devextreme/ui/notify";
import DxButton from "devextreme-vue/button";

const requests = [
  ,
  dataApi.paperWork.IncommingLetterPost,
  dataApi.paperWork.OutgoingLetterPost,
  dataApi.paperWork.OrderPost,
  dataApi.paperWork.CompanyDirectivePost,
  dataApi.paperWork.SimpleDocumentPost,
  dataApi.paperWork.AddendumPost,
  dataApi.paperWork.MemoPost,
  dataApi.paperWork.PowerOfAttorneyPost
];
export default {
  components: {
    Relation,
    DxTabPanel,
    DxItem,
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
    DxForm,
    DxPopup,
    DxRequiredRule
  },
  props: ["store", "isSaved", "headerTitle", "docType"],
  created() {
    if (this.$route.params.id != "add") {
      this.isUpdating = true;
      this.$store.commit("paper-work/SET_IS_REGISTERED", {
        documentId: +this.$route.params.id,
        state: this.store.registrationState
      });
    }
  },
  data() {
    return {
      addressGet: dataApi.paperWork.GetDocumentById,
      addressPost: requests[this.docType],
      isUpdating: false,
      popupRegistyDocument: false
    };
  },
  methods: {
    modified() {
      this.$emit("modified");
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
      const store = Object.assign(
        this.store,
        this.$store.getters["paper-work/mainFormProperties"]
      );
      this.$axios
        .post(this.addressPost, store)
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
        isRegistered: this.$store.getters["paper-work/isRegistered"](
          this.$route.params.id
        ),
        registeryAllowed:
          !this.$store.getters["paper-work/isRegistered"](
            this.$route.params.id
          ) && this.isSaved
      };
    },
    entityTypes() {
      const entityTypes = [
        ,
        "IncomingLetter",
        "OutgoingLetter",
        "BaseOrder",
        "BaseOrder",
        "SimpleDocument",
        "Addendum",
        "Memo",
        "PowerOfAttorney"
      ];
      return entityTypes[this.docType];
    },
    hasPermissions() {
      if (!this.isUpdating) {
        return true;
      } else {
        this.$store.commit(
          "paper-work/SET_HAS_PERMISSIONS",
          this.$store.getters["permissions/allowUpdating"](this.entityTypes) &&
            !this.registryState.isRegistered
        );
        return this.$store.getters["paper-work/hasPermissions"];
      }
    },
    noteOptions() {
      return {
        onValueChanged: () => {
          this.modified();
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
