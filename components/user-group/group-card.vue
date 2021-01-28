<template>
  <div>
    <Header :headerTitle="headerTitle" :isbackButton="!isCard" :isNew="isNew"></Header>
    <toolbar @saveChanges="saveChanges" :canSave="true" />
    <DxForm :form-data="group">
      <DxSimpleItem data-field="name" editor-type="dxTextBox">
        <DxLabel :text="$t('shared.name')" />
        <DxRequiredRule />
      </DxSimpleItem>
      <DxSimpleItem data-field="recipients" template="recipients">
        <DxLabel :visible="false" />
      </DxSimpleItem>
      <template #recipients>
        <MembersGrid @membersChanged="membersChanged" :value="group.members" />
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
import MembersGrid from "~/components/user-group/members-grid.vue";
import Header from "~/components/page/page__header.vue";
import Toolbar from "~/components/shared/base-toolbar.vue";
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
    MembersGrid
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
        ? this.$t("companyStructure.groups.group")
        : this.group.name;
    }
  },
  methods: {
    membersChanged(value) {
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
  }
};
</script>