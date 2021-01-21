<template>
  <div>
    <Header :headerTitle="headerTitle" :isbackButton="true" :isNew="false" />
    <toolbar @saveChanges="saveChanges" :canSave="true" />
    <DxForm ref="form" :form-data.sync="settings">
      <DxSimpleItem editorType="dxCheckBox" data-field="needRestrictVisibility">
        <DxLabel location="left" :text="$t('companyStructure.company.limitVisibility')" />
      </DxSimpleItem>
      <DxSimpleItem template="whoSees" data-field="unrestrictedRecipients">
        <DxLabel location="left" :text="$t('companyStructure.company.whoSees')" />
      </DxSimpleItem>
      <DxSimpleItem template="hiddenEmployees" data-field="hiddenRecipients">
        <DxLabel location="left" :text="$t('companyStructure.company.hiddenEmployees')" />
      </DxSimpleItem>
      <template #whoSees>
        <RecipientTagBox
          :recipients="settings.unrestrictedRecipients"
          @setRecipients="changeUnrestrictedRecipients"
        />
      </template>
      <template #hiddenEmployees>
        <RecipientTagBox
          :recipients="settings.hiddenRecipients"
          @setRecipients="changeHiddenEmployees"
        />
      </template>
    </DxForm>
  </div>
</template>

<script>
import {
  DxForm,
  DxSimpleItem,
  DxGroupItem,
  DxLabel
} from "devextreme-vue/form";
import Header from "~/components/page/page__header.vue";
import Toolbar from "~/components/shared/base-toolbar.vue";
import RecipientTagBox from "~/components/recipient/tag-box/index.vue";

import dataApi from "~/static/dataApi";
export default {
  components: {
    DxForm,
    DxSimpleItem,
    DxGroupItem,
    DxLabel,
    Header,
    Toolbar,
    RecipientTagBox
  },

  data() {
    return {
      headerTitle: this.$t("companyStructure.company.visibilitySetting"),
      settings: null
    };
  },
  methods: {
    changeHiddenEmployees(value) {
      this.settings.hiddenRecipients = value;
    },
    changeUnrestrictedRecipients(value) {
      this.settings.unrestrictedRecipients = value;
    },
    async saveChanges() {
      this.$awn.asyncBlock(
        this.$axios.put(dataApi.visibilitySettings.settings, this.settings),
        e => {
          this.$awn.success();
        },
        e => {
          this.$awn.alert();
        }
      );
    }
  },
  created() {
    this.$awn.asyncBlock(
      this.$axios.get(dataApi.visibilitySettings.settings),
      ({ data }) => {
        this.settings = data;
      },
      e => {
        this.$awn.alert();
      }
    );
  }
};
</script>