<template>
    <div id="right-bar-wrapper">
        <BarCells @openForm="openForm" />
        <BarInterface :isActive="isActive" @closeForm="closeForm" />
    </div>
</template>

<script>
import BarInterface from "~/components/chat/bar-interface.vue";
import BarCells from "~/components/chat/bar-cells.vue";

export default {
    components: {
        BarInterface,
        BarCells,
    },
    data() {
        return {
            isActive: false,
        };
    },
    methods: {
        openForm() {
            this.isActive = true;
        },
        closeForm() {
            this.isActive = false;
        },
    },
    mounted() {
        this.$chat.connect();
    },
};
</script>

<style lang="scss">
#right-bar-wrapper {
    height: 100vh;
    width: 60px;
    padding: 50px 0;
    position: relative;
    box-shadow: 0px 1px 1px rgba($color: black, $alpha: 1);
}
</style>
