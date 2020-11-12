<template>
  <div class="custom-item d-flex align-center">
    <userIcon :fullName="itemData && itemData.name" :path="itemData && itemData.personalPhotoHash" />
    <div>
      <div>{{$t()}}{{itemData && itemData.name}}</div>
      <div class="grey">{{itemData && itemData.jobTitle}}</div>
    </div>
  </div>
</template>
<script>
import { DxTextBox } from "devextreme-vue";
import userIcon from "~/components/Layout/userIcon.vue";
export default {
  components: {
    DxTextBox,
    userIcon
  },
  props: {
    itemData: {
      default: () => {}
    }
  }
};
</script>
<style lang="scss">
.small {
  font-size: 20px;
}
.custom-item {
  padding: 7px;
}
.grey {
  color: gray;
  font-size: 14px;
}
</style>