<template>
    <div class="file_uploader_wrapper">
        <label for="custom_file_uploader_for_employee" class="image_wrapper">
            <img class="image" ref="image" :src="fileSrc" v-if="fileSrc"/>
            <img class="image" ref="image" src="~static/icons/user.svg" v-else />
        </label>
        <input @change="fileChanged" :accept="allowedFile" ref="fileUploader" type="file" id="custom_file_uploader_for_employee">
    </div>
</template>


<script>
export default {
    props:{
        path:{
            type:String,
            default:null
        },
    },
    data() {
        return {
            allowedFileExtensions: ['.png','.jpeg','.jpg'],
            file: null,
            fileSrc:null,
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
            this.fileSrc = this.path
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
    max-width: 300px;
    height: 150px;
    border-radius: 50%;
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