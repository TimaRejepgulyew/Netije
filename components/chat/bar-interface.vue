<template>
    <div>
        <div @click="closeForm" class="color-wrapper" v-if="isActive" />
        <transition name="slide-fade">
            <div v-if="isActive" id="bar-interface">
                <button @click="closeForm" class="close-btn">
                    <i class="dx-icon-close" />
                </button>
                <div class="bar-interface-content">
                    <div class="left-side">
                        <ContactList
                            @setRoom="setRoom"
                            @openRoomConstructor="openRoomConstructor"
                        />
                    </div>
                    <div class="right-side">
                        <ConstructorChatRoom :roomType="roomType" v-if="isCreateRoom" />
                        <ChatRoom v-if="currentRoom && !isCreateRoom" />
                        <EmptyLayout v-if="currentRoom == null && !isCreateRoom" />
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import ContactList from "~/components/chat/components/contact-list/index.vue";
import ChatRoom from "~/components/chat/components/chat-room/index.vue";
import EmptyLayout from "~/components/chat/components/constructor-chat-room/empty-layout.vue";
import ConstructorChatRoom from "~/components/chat/components/constructor-chat-room/index.vue";

export default {
    components: {
        ContactList,
        ConstructorChatRoom,
        ChatRoom,
        EmptyLayout,
    },
    props: {
        isActive: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isCreateRoom: false,
            roomType: null,
        };
    },
    computed: {
        currentRoom() {
            return this.$store.getters["chatStore/currentRoom"];
        },
    },
    methods: {
        openRoomConstructor(roomType) {
            this.roomType = roomType;
            this.isCreateRoom = true;
        },
        setRoom() {
            this.isCreateRoom = false;
        },
        closeForm() {
            this.$emit("closeForm");
            this.$store.commit("chatStore/CLEAR_CURRENT_ROOM");
            this.isCreateRoom = false;
        },
    },
};
</script>

<style lang="scss">
.slide-fade-enter-active {
    transition: all 0.3s ease;
}

.slide-fade-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(100%);
    opacity: 0;
}

.color-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: 500;
    background-color: rgba(#000, 0.8);
}

#bar-interface {
    position: fixed;
    background-color: $base-bg;
    z-index: 1000;
    height: 100%;
    width: 80vw;
    top: 0;
    right: 0;
    transition: 0.3s;

    .close-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        z-index: 1000;
        left: -50px;
        top: 5vh;
        height: 40px;
        width: 50px;
        border-radius: 10px 0 0 10px;
        color: #fff;
        cursor: pointer;
        background-color: $base-accent;
    }

    .bar-interface-content {
        height: 100%;
        width: 100%;
        display: flex;

        .left-side {
            width: 20vw;
        }

        .right-side {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
