<template>
  <div>
    <img class="icon" :src="iconByType" />
  </div>
</template>

<script>
import DocumentTypeModel from "~/infrastructure/models/DocumentType.js";
export default {
  props: {
    type: {
      type: Number
    }
  },
  created() {
    console.log(this.iconByType);
  },
  computed: {
    iconByType() {
      return new DocumentTypeModel(this).getById(this.type).icon;
    }
  }
};
</script>

<style>
.icon {
  margin: 0 8px;
  width: 20px;
  height: auto;
  display: block;
}
</style>
