<template>
  <div>{{ itemData.key }}</div>
</template>
<script>
export default {
  props: {
    itemData: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
