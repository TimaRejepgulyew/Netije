<template>
    <div id="right-bar-wrapper">
        <bar-cells class="miniRoomList" @openForm="openForm" />

        <transition name="slide-fade">
            <main @click.self="closeForm" v-if="isActive" class="chatContainer">
                <button @click="closeForm" class="close-btn">
                    <i class="dx-icon-close" />
                </button>
                <main-chat-panel class="main-chat-panel" />
            </main>
        </transition>
    </div>
</template>

<script>
import barCells from "~/components/chat/bar-cells.vue";
import mainChatPanel from "./components/main-chat-panel.vue";
export default {
    components: {
        barCells,
        mainChatPanel
    },
    data() {
        return {
            isActive: false
        };
    },

    mounted() {
        this.$chat.connect();
    },
    methods: {
        openForm() {
            this.isActive = true;
        },
        closeForm() {
            this.isActive = false;
        }
    }
};
</script>

<style lang="scss">
.close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 999;
    top: 5%;
    height: 40px;
    width: 50px;
    border-radius: 20px 0 0 20px;
    color: $base-accent;
    cursor: pointer;
    background-color: $base-border-color;
}
.chatContainer {
    z-index: 1000;
    position: fixed;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba($color: #000000, $alpha: 0.3);

    display: flex;
    justify-content: flex-end;
}
.main-chat-panel {
    background-color: $base-bg;
    color: $base-text-color;
    width: 60vw;
    max-height: 100vh;
    overflow: hidden;
}
.miniRoomList {
    z-index: 1000;
    height: 100%;
    min-width: 60px;
    padding: 50px 0;
    position: relative;
    //  box-shadow: 0px 1px 1px rgba($color: black, $alpha: 1);
    &:hover {
        background: $base-border-color;
        opacity: 0.8;
        transition: 0.2s;
    }
}
#right-bar-wrapper {
    width: auto;
    right: 0;
    bottom: 0;
    position: relative;
    height: 100%;
    // overflow: hidden;
}
.slide-fade-enter-active {
    transition: 0.2s;
    width: 100vw;
}

.slide-fade-leave-active {
    transition: 0.2s;
    width: 30vw;
    opacity: 0;
}
// .slide-fade-leave-to,
.slide-fade-enter {
    transition: 0.2s;
    width: 100vw;
}
</style>
