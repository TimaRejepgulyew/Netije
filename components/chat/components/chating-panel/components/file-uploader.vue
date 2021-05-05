<template>
    <input
        type="file"
        multiple
        id="versionFileUploader"
        @change="uploadFiles"
    />
</template>

<script>
export default {
    data() {
        return {
            files: null
        };
    },
    methods: {
        uploadFiles(e) {
            console.log(e.target.files);
            this.$emit("uploadFiles", e.target.files);
        }
    },
    computed: {
        acceptExtension() {
            return this.$store.getters["cache/acceptExtension"];
        }
    }
};
</script>

<style lang="scss">
#versionFileUploader {
    opacity: 0;
    width: 1px;
    height: 1px;
    position: absolute;
    z-index: -1;
}
</style>
