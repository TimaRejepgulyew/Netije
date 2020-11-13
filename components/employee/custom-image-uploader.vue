<template>
    <div class="file_uploader_wrapper">
        <label for="custom_file_uploader_for_employee" class="image_wrapper">
            <img class="image" ref="image" :src="fileSrc"/>
        </label>
        <input v-if="!readOnly" @change="fileChanged" :accept="allowedFile" ref="fileUploader" type="file" id="custom_file_uploader_for_employee">
    </div>
</template>


<script>
export default {
    props:{
        path:{
            default:null
        },
        readOnly:{
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            allowedFileExtensions: ['.png','.jpeg','.jpg'],
            file: null,
            fileSrc: `${require("@/static/icons/user.svg")}`,
        };
    },
    computed:{
        allowedFile(){
            return this.allowedFileExtensions.join()
        }
    },
    methods: {
        fileChanged(e){
            const file = this.$refs.fileUploader.files[0];
            this.$emit('valueChanged',file)
            if(file){    
                const reader = new FileReader();
                reader.onload = () => {
                    const dataURL = reader.result;
                    this.fileSrc = dataURL;
                };
                reader.readAsDataURL(file);
            }
        }
    },
    created(){
        if(this.path){
            this.fileSrc = 'data:image/png;base64,' + this.path
        }
    }
};
</script>

<style lang="scss">
.file_uploader_wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
}
.image_wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    cursor: pointer;
    border: 1px solid #ddd;
    overflow: hidden;
}
.image{
    max-height: 150px;
}
.user-info-avatar{
    margin: 0;
}
#custom_file_uploader_for_employee{
    width: 1px;
    height: 1px;
    position: absolute;
    z-index: -1;
}
</style>