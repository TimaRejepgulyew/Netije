<template>
  <DxPopup 
    :visible.sync="visible"
  >
  </DxPopup>
</template>

<script>
import { DxPopup } from 'devextreme-vue/popup';

export default {
  components:{
    DxPopup
  },
  data(){
    return{
      visible:true
    }
  }
}
</script>