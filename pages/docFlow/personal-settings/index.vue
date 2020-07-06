<template>
  <div>
    <div>
      <Header :headerTitle="$t('docFlow.personalSetting.mySetting')"></Header>
      <toolbar
        @saveChanges="handleSubmit"
        :canSave="$store.getters['permissions/allowUpdating'](this.entityType)"
      />
      <DxForm
        ref="form"
        :col-count="1"
        :form-data.sync="personalSettings"
        :read-only="!$store.getters['permissions/allowUpdating'](entityType)"
        :show-colon-after-label="true"
      >
        <DxGroupItem :col-count="1">
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
      </DxForm>
    </div>
  </div>
</template>
<script>
import Toolbar from "~/components/shared/base-toolbar.vue";
import EntityType from "~/infrastructure/constants/entityTypes";
import Status from "~/infrastructure/constants/status";
import { DxTagBox } from "devextreme-vue/tag-box";
import Header from "~/components/page/page__header";
import DataSource from "devextreme/data/data_source";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel
} from "devextreme-vue/form";

import dataApi from "~/static/dataApi";

export default {
  components: {
    Header,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxForm,
    Toolbar
  },
  async asyncData({ app, params }) {
    var res = await app.$axios.get(dataApi.docFlow.PersonalSettings);
    return {
      personalSettings: res.data
    };
  },
  data() {
    return {
      entityType: EntityType.PersonalSettings
    };
  },
  methods: {
    handleSubmit() {
      var res = this.$refs["form"].instance.validate();
      if (!res.isValid) return;
      const object = { ...this.personalSettings };
      this.$awn.asyncBlock(
        this.$axios.put(`${dataApi.docFlow.PersonalSettings}`, object),
        res => this.$awn.success(),
        err => this.$awn.alert()
      );
    }
  },
  computed: {
    businessUnitOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.BusinessUnit,
          filter: ["status", "=", Status.Active]
        })
      };
    },
    deparmentOptions() {
      let businessUnitId = this.personalSettings.businessUnitId;
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Department,
          filter: [
            ["businessUnitId", "=", businessUnitId],
            "and",
            ["status", "=", Status.Active]
          ]
        })
      };
    }
  }
};
</script>
