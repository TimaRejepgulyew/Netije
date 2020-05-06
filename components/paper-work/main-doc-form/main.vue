<template>
  <div id="form-demo">
    <div class="widget-container">
      <DxLoadPanel :visible.sync="loadingVisible" id="large-indicator" :indicatorSrc="icon" />
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
            @setPermissions="setPermissions($event)"
          ></popupCancelDocumentRegistry>

          <popup-registy-document
            v-else
            :docType="docType"
            @setPermissions="setPermissions($event)"
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
import { DxLoadPanel } from "devextreme-vue/load-panel";
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
      this.setIsRegistered();
    }
    this.setPermissions();
  },
  data() {
    return {
      addressGet: dataApi.paperWork.GetDocumentById,
      addressPost: requests.post[this.docType],
      addressPut: requests.put[this.docType],
      isUpdating: false,
      popupRegistyDocument: false,
      hasPermissions: true,
      isRegistered: false,
      loadingVisible: false,
      icon: require("~/static/icons/loading.gif")
    };
  },
  methods: {
    setIsRegistered() {
      this.store.registrationState === 0
        ? (this.isRegistered = true)
        : (this.isRegistered = false);
    },
    setPermissions(isRegistered) {
      if (isRegistered !== undefined) {
        this.isRegistered = isRegistered;
      }
      if (!this.isUpdating) {
        this.$store.commit("paper-work/SET_HAS_PERMISSIONS", true);
      } else {
        const factors = [!this.isRegistered];
        this.$store.commit(
          "paper-work/SET_HAS_PERMISSIONS",
          undefined ==
            factors.find(el => {
              return el == false;
            })
        );
        this.hasPermissions = this.$store.getters["paper-work/hasPermissions"];
      }
    },
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
    handleSubmit(e) {
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

      e.preventDefault();
    }
  },
  computed: {
    saveButtonOptions() {
      return {
        ...this.$store.getters["globalProperties/btnSave"](this),
        disabled: this.isSaved
      };
    },
    cancelButtonOptions() {
      return this.$store.getters["globalProperties/btnCancel"](
        this,
        this.backTo
      );
    },
    isRegsitrible() {
      return this.$store.getters["paper-work/documentKind"]("numberingType") !=
        3
        ? true
        : false;
    },
    registryState() {
      const registryState = {
        isRegistered: this.isRegistered,
        isRegsitrible: this.isRegsitrible,
        registeryAllowed: this.isSaved
      };
      console.log(registryState);
      return registryState;
    },
    entityType() {
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
