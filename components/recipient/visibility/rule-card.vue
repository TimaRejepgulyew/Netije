<template>
  <div>
    <Header :headerTitle="headerTitle" :isbackButton="!isCard" :isNew="isNew"></Header>
    <toolbar @saveChanges="saveChanges" :canSave="true" />
    <DxForm :form-data="rule">
      <DxSimpleItem data-field="name" editor-type="dxTextBox">
        <DxLabel :text="$t('shared.name')" />
        <DxRequiredRule />
      </DxSimpleItem>
      <DxSimpleItem data-field="status" editor-type="dxSelectBox" :editor-options="statusOptions">
        <DxLabel :text="$t('shared.status')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="recipients" template="ruleRecipients">
        <DxLabel :visible="false" />
      </DxSimpleItem>
      <DxSimpleItem data-field="excludedMembers" template="excludedMembers">
        <DxLabel :text="$t('companyStructure.company.seesApartFrom')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="note" editor-type="dxTextArea" :editor-options="{height:'120'}">
        <DxLabel :text="$t('companyStructure.company.note')" />
      </DxSimpleItem>
      <template #excludedMembers>
        <RecipientTagBox
          :recipients="rule.excludedMembers"
          @setRecipients="value => excludedMembersChanged(value)"
        />
      </template>
      <template #ruleRecipients>
        <RuleRecipientsGrid
          @recipientsChanged="recipientsChanged"
          :value="rule.recipients"
          :recipients="rule.recipients"
          :visibleMembers="rule.visibleMembers"
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
  DxRequiredRule,
  DxLabel
} from "devextreme-vue/form";
import RuleRecipientsGrid from "~/components/recipient/visibility/rule-recipients-grid.vue";
import RecipientTagBox from "~/components/recipient/tag-box/index.vue";
import RecipientSelectBox from "~/components/recipient/select-box/index.vue";
import Header from "~/components/page/page__header.vue";
import Toolbar from "~/components/shared/base-toolbar.vue";

import Status from "~/infrastructure/constants/status.js";
import dataApi from "~/static/dataApi";

export default {
  components: {
    DxForm,
    DxSimpleItem,
    DxGroupItem,
    DxRequiredRule,
    DxLabel,
    Header,
    Toolbar,
    RecipientTagBox,
    RecipientSelectBox,
    RuleRecipientsGrid
  },
  props: {
    value: {
      type: Object
    },
    isCard: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    rule() {
      return {
        name: "",
        status: Status.Active,
        recipients: [],
        excludedMembers: [],
        note: "",
        ...this.value
      };
    },
    isNew() {
      return this.rule.id ? false : true;
    },
    headerTitle() {
      return this.isNew
        ? this.$t("companyStructure.company.visibilityRules")
        : this.rule.name;
    },
    statusOptions() {
      return {
        dataSource: this.$store.getters["status/status"](this),
        valueExpr: "id",
        displayExpr: "status"
      };
    }
  },
  methods: {
    recipientsChanged(value) {
      this.rule.recipients = value;
    },
    excludedMembersChanged(value) {
      this.rule.excludedMembers = value;
    },
    postRule() {
      this.$awn.asyncBlock(
        this.$axios.post(dataApi.visibilityRule.rule, this.rule),
        e => {
          if (!this.isCard) {
            this.$router.go(-1);
          }
          this.$awn.success();
        },
        e => {
          this.$alert();
        }
      );
    },
    putRule() {
      this.$awn.asyncBlock(
        this.$axios.put(
          dataApi.visibilityRule.rule + "/" + this.rule.id,
          this.rule
        ),
        e => {
          this.$awn.success();
          if (!this.isCard) {
            this.$router.go(-1);
          }
        },
        e => {
          this.$alert();
        }
      );
    },
    saveChanges() {
      this.isNew ? this.postRule() : this.putRule();
    }
  }
};
</script>