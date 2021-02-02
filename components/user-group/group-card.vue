<template>
  <div>
    <Header :headerTitle="headerTitle" v-if="!isCard" :isNew="isNew"></Header>
    <toolbar
      v-if="!readOnly"
      @saveChanges="saveChanges"
      :entityId="group.id"
      :isNew="isNew"
      :canSave="true"
    />
    <DxForm :form-data="group">
      <DxSimpleItem data-field="name" editor-type="dxTextBox">
        <DxLabel :text="$t('shared.name')" />
        <DxRequiredRule />
      </DxSimpleItem>
      <DxSimpleItem data-field="recipients" template="recipients">
        <DxLabel :text="$t('translations.fields.members')" />
      </DxSimpleItem>
      <template #recipients>
        <RecipientTagBox
          :recipients="group.participants"
          @setRecipients="value => participantChanged(value)"
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
import RecipientTagBox from "~/components/recipient/tag-box/index.vue";
import Header from "~/components/page/page__header.vue";
import Toolbar from "~/components/user-group/card-toolbar.vue";
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
    RecipientTagBox
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
    readOnly() {
      return this.group.operation === 60;
    },
    group() {
      return {
        name: "",
        participants: [],
        ...this.value
      };
    },
    isNew() {
      return this.group.id ? false : true;
    },
    headerTitle() {
      return this.isNew
        ? this.$t("companyStructure.additionally.group")
        : this.group.name;
    }
  },
  methods: {
    participantChanged(value) {
      this.group.participants = value;
    },
    postGroup() {
      this.$awn.asyncBlock(
        this.$axios.post(dataApi.userGroup.group, this.group),
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
    putGroup() {
      this.$awn.asyncBlock(
        this.$axios.put(
          dataApi.userGroup.group + "/" + this.group.id,
          this.group
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
      this.isNew ? this.postGroup() : this.putGroup();
    }
  },
  created() {
    console.log("this.value", this.value);
  }
};
</script>