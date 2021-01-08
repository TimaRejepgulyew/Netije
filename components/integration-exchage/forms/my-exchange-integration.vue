<template>
  <div>
    <Header
      :showTitle="!isCard"
      :isbackButton="!isCard"
      :isNew="isNew"
      :headerTitle="$t('exchange.headers.myExchangeIntegration')"
    ></Header>
    <toolbar
      @saveChanges="handleSubmit"
      :canSave="isNew && $store.getters['permissions/IsAdmin']"
    />
    <DxForm
      ref="form"
      :col-count="3"
      :scrolling-enabled="true"
      :form-data.sync="box"
      :read-only="readOnly"
      :show-colon-after-label="true"
      :show-validation-summary="true"
      validation-group="integration-box-form"
    >
      <DxGroupItem :col-count="2" :col-span="2">
        <DxSimpleItem data-field="name">
          <DxLabel location="top" :text="$t('exchange.fields.name')" />
          <DxRequiredRule :message="$t('exchange.validation.nameRequired')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="organizationId">
          <DxLabel
            location="top"
            :text="$t('exchange.fields.organizationId')"
          />
          <DxRequiredRule
            :message="$t('exchange.validation.organizationIdRequired')"
          />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="businessUnitId"
          template="businessUnitIdSelectBox"
        >
          <DxLabel location="top" :text="$t('exchange.fields.businessUnit')" />
          <DxRequiredRule
            :message="$t('exchange.validation.businessUnitRequired')"
          />
        </DxSimpleItem>
        <DxSimpleItem data-field="responsibleId" template="responsibleId">
          <DxLabel location="top" :text="$t('exchange.fields.responsible')" />
          <DxRequiredRule
            :message="$t('exchange.validation.responsibleRequired')"
          />
        </DxSimpleItem>

        <DxSimpleItem
          :col-span="3"
          data-field="status"
          :editor-options="statusOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('exchange.fields.status')" />
        </DxSimpleItem>
      </DxGroupItem>
      <DxGroupItem :col-count="1" :col-span="2">
        <DxSimpleItem :editor-options="passwordOptions" data-field="password">
          <DxLabel location="top" :text="$t('exchange.fields.password')" />
          <DxRequiredRule
            :message="$t('exchange.validation.passwordRequired')"
          />
        </DxSimpleItem>
        <DxSimpleItem template="certificate">
          <DxLabel location="top" :text="$t('exchange.fields.certificate')" />
        </DxSimpleItem>
      </DxGroupItem>
      <DxSimpleItem
        :col-span="3"
        :col-count="2"
        data-field="note"
        :editor-options="{ height: 90 }"
        editor-type="dxTextArea"
      >
        <DxLabel location="top" :text="$t('exchange.fields.note')" />
      </DxSimpleItem>
      <template #businessUnitIdSelectBox>
        <business-unit-select-box
          valueExpr="id"
          :value="box.businessUnitId"
          :read-only="readOnly"
          validatorGroup="integration-box-form"
          @valueChanged="setBusinessUnitId"
        />
      </template>
      <template #responsibleId>
        <employee-select-box
          valueExpr="id"
          :value="box.responsibleId"
          :read-only="readOnly"
          validatorGroup="integration-box-form"
          @valueChanged="setResponsibleId"
        />
      </template>
      <template #certificate>
        <Certificate-uploader @valueChanged="setCertificate" />
      </template>
    </DxForm>
  </div>
</template>
<script>
import Status from "~/infrastructure/constants/status";
import RoutingTypeGuid from "../infrastructure/constants/routing.js";
import CertificateUploader from "../components/certificate-uploader.vue";
import EmployeeSelectBox from "~/components/employee/custom-select-box.vue";
import BusinessUnitSelectBox from "~/components/company/organization-structure/business-unit/custom-select-box";
import Toolbar from "~/components/shared/base-toolbar.vue";
import Header from "~/components/page/page__header";
import "devextreme-vue/text-area";
import DataSource from "devextreme/data/data_source";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule,
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
export default {
  components: {
    Header,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    DxForm,
    Toolbar,
    BusinessUnitSelectBox,
    EmployeeSelectBox,
    CertificateUploader,
  },
  props: ["data", "isCard"],
  created() {
    if (this.data) {
      this.box = this.data;
    }
  },
  data() {
    return {
      box: {
        name: null,
        note: null,
        organizationId: null,
        businessUnitId: null,
        responsibleId: null,
        routing: RoutingTypeGuid.BoxResponsible,
        certificate: null,
        password: null,
        status: Status.Active,
      },
      statusOptions: {
        dataSource: this.$store.getters["status/status"](this),
        valueExpr: "id",
        displayExpr: "status",
        showClearButton: true,
      },
      routingDataSource: [
        {
          name: this.$t("exchange.routingType.BoxResponsible"),
          id: RoutingTypeGuid.BoxResponsible,
        },
      ],
      passwordOptions: {
        mode: "password",
      },
    };
  },
  computed: {
    isNew() {
      return this.data ? false : true;
    },
    readOnly() {
      return !this.$store.getters["permissions/IsAdmin"];
    },
  },
  methods: {
    generateFormData(data) {
      const file = new FormData();
      function appenFormData(key, value) {
        if (value !== null) {
          file.append(key, value);
        }
      }
      for (let prop in this.box) {
        appenFormData(prop, this.box[prop]);
      }

      return file;
    },
    setCertificate(value) {
      this.box.certificate = value;
    },
    setBusinessUnitId(data) {
      this.box.businessUnitId = data;
    },
    setResponsibleId(data) {
      this.box.responsibleId = data;
    },
    goBack() {
      this.$emit("close");
    },
    postRequest() {
      var res = this.$refs["form"].instance.validate();
      if (!res.isValid || !this.box.certificate) return;
      const file = this.generateFormData(this.box);
      this.$awn.asyncBlock(
        this.$axios.post(dataApi.boxes.Boxes, file),
        (e) => {
          this.$emit("create", this.box);
          this.$awn.success();
        },
        (e) => this.$awn.alert()
      );
    },
    putRequest() {
      var res = this.$refs["form"].instance.validate();
      if (!res.isValid || !this.box.certificate) return;
      const file = this.generateFormData(this.box);
      this.$awn.asyncBlock(
        this.$axios.put(dataApi.boxes.Boxes + "/" + this.box.id, file),
        (e) => {
          this.$emit("valueChanged", this.box);
          this.$awn.success();
        },
        (e) => this.$awn.alert()
      );
    },
    handleSubmit() {
      if (!this.isNew) {
        this.putRequest();
      } else {
        this.postRequest();
      }
    },
  },
};
</script>

