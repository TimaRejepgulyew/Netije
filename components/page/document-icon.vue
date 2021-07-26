<template>
    <i
        :class="{
            [slicedExtension + ' icons_style']: true,
            [size]: true
        }"
    >
        </i
    >
</template>

<script>
export default {
    props: {
        extension: {
            type: String
        },
        size: {
            type: String,
            default: "sm"
        }
    },

    computed: {
        slicedExtension() {
            if (this.extension) {
                return "flaticon-" + this.extension.slice(1);
            } else {
                return "flaticon-blank";
            }
        }
    }
};
</script>

<style lang="scss">
[class^="flaticon-"]:before,
[class*=" flaticon-"]:before,
[class^="flaticon-"]:after,
[class*=" flaticon-"]:after {
    width: 18px;
    height: 18px;
    background-position: 0 0;
    background-size: 18px 18px;
    padding: 0;

    text-align: center;
    line-height: 20px;
    margin: 0;
}
.small::after,
.sm::before {
    font-size: 18px;
}
.md ::after,
.md::before {
    font-size: 50px;
}
</style>
