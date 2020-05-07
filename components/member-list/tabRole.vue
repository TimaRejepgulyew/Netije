<template>
  <DxTabPanel>
    <DxItem :title="$t('translations.fields.members')" template="members-list" />
    <MemberListRoles v-if="'Roles' == memberList" slot="members-list" :data="data" />
    
    <MemberListDepartments
      v-else-if="'Departments' == memberList"
      slot="members-list"
      :data="data"
    />
    <DxItem :title="$t('translations.fields.permissions')" template="access-right-list" />
    <permissions slot="access-right-list" :data="data" />
  </DxTabPanel>
</template>

<script>
import { DxTabPanel, DxItem } from "devextreme-vue/tab-panel";
import MemberListRoles from "~/components/administration/member-list";
import MemberListDepartments from "~/components/departments/member-list";
import permissions from "~/components/administration/permissions";
export default {
  components: {
    DxTabPanel,
    DxItem,
    MemberListRoles,
    MemberListDepartments,
    Permissions
  },

  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    memberList: {
      type: String
    }
  }
};
</script>