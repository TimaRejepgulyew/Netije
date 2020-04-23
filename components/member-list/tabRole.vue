<template>
  <DxTabPanel>
    <DxItem :title="$t('translations.fields.members')" template="members-list" />
    <MemberListRoles v-if="'Roles' == memberList" slot="members-list" :data="data" />
    <MemberListRegistrationGroup
      v-else-if="'RegistrationGroup' == memberList"
      slot="members-list"
      :data="data"
    />
    <MemberListDepartments
      v-else-if="'Departments' == memberList"
      slot="members-list"
      :data="data"
    />
    <DxItem :title="$t('translations.fields.accessRights')" template="access-right-list" />
    <AccessRightList slot="access-right-list" :data="data" />
  </DxTabPanel>
</template>

<script>
import { DxTabPanel, DxItem } from "devextreme-vue/tab-panel";
import MemberListRoles from "~/components/administration/member-list";
import MemberListDepartments from "~/components/departments/member-list";
import MemberListRegistrationGroup from "~/components/docFlow/registration-group/member-list";
import AccessRightList from "~/components/administration/access-right-list";
export default {
  components: {
    DxTabPanel,
    DxItem,
    MemberListRoles,
    MemberListDepartments,
    MemberListRegistrationGroup,
    AccessRightList
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