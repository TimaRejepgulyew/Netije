<template>
  <DxTabPanel>
    <DxItem :title="$t('translations.fields.members')" template="members-list" />
    <MemberList slot="members-list" :data="data" />
    <DxItem :title="$t('translations.fields.accessRights')" template="access-right-list" />
    <AccessRightList slot="access-right-list" :data="data" />
  </DxTabPanel>
</template>

<script>
import { DxTabPanel, DxItem } from "devextreme-vue/tab-panel";
import MemberList from "~/components/administration/member-list";
import AccessRightList from "~/components/administration/access-right-list";
export default {
  components: {
    DxTabPanel,
    DxItem,
    MemberList,
    AccessRightList
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>