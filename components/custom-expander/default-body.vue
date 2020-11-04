<template>
  <div >
   <template v-if="body">
      {{item}}
   </template>
   <template v-else>
       {{$t("shared.noData")}}  
   </template>
  </div>
</template>

<script>
export default {
props:["item"]
}
</script>

<style lang="scss" scoped>

</style>

</style>