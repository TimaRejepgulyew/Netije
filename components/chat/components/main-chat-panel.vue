<template>
    <div class="d-flex">
        <aside-bar class="aside" @createRoom="showCreatingPanel" />
        <transition mode="out-in" name="slide-to-top">
            <chating-panel
                v-if="activePanel === 'chating-panel'"
                class="chating-panel"
                :options="options"
            />
            <creating-panel
                v-else-if="activePanel === 'creating-panel'"
                :options="options"
                class="creating-panel"
            />

            <empty-panel v-else class="chating-panel" />
        </transition>
    </div>
</template>

<script>
import chatingPanel from "./chating-panel/index.vue";
import creatingPanel from "./creating-panel/index.vue";
import emptyPanel from "./empty-panel.vue";
import asideBar from "./side-bar/index.vue";
import RoomType from "~/components/chat/infrastructure/constants/roomType.js";
export default {
    components: {
        asideBar,
        emptyPanel,
        creatingPanel,
        chatingPanel
    },
    provide() {
        return {
            openPrivateChatByUser: async user => {
                const room = this.$store.getters["chatStore/hasPrivatRoomWith"](
                    user.id
                );
                if (room)
                    return this.showChatingPanel({
                        roomId: room.id,
                        roomType: RoomType.Private
                    });
                else {
                    const roomId = await this.$chat.createPrivateRoom([
                        user.id
                    ]);
                    return this.showChatingPanel({
                        roomId,
                        roomType: RoomType.Private
                    });
                }
            },
            openPrivateChat: roomId => {
                return this.showChatingPanel({
                    roomId,
                    roomType: RoomType.Private
                });
            },
            openGroupChat: roomId => {
                this.showChatingPanel({
                    roomId: roomId,
                    roomType: RoomType.Group
                });
            },
            creatingRoom: options => {
                this.showCreatingPanel(options);
            }
        };
    },
    data() {
        return {
            activePanel: "creating-panel",
            options: { roomType: 1 }
        };
    },
    methods: {
        showCreatingPanel(options) {
            this.activePanel = "creating-panel";
            this.options = options;
        },
        showChatingPanel(options) {
            this.activePanel = "chating-panel";
            this.options = options;
        }
    }
};
</script>

<style lang="scss">
.aside {
    flex-basis: 300px;
    min-width: 300px;
}
.chating-panel {
    flex-grow: 1;
}
.creating-panel {
    flex-grow: 1;
}
.slide-to-top-enter-active {
    transition: 0.3s;
    // opacity: 0.5;
    // transform: translateY(50vh);
}

.slide-to-top-leave-active {
    transition: 0.5s;
    // transform: translateY(-60vh);
    // opacity: 0.5;
}
.slide-to-top-leave-to {
    transition: 0.5s;
    transform: translateY(-80vh);
    opacity: 0.5;
}
.slide-to-top-enter {
    transition: 0.5s;
    transform: translateY(80vh);
    opacity: 0.5;
}
.unread-message-count {
    position: relative;
    right: -90px;
    background: $base-accent;
    min-width: 25px;
    height: 25px;
    border-radius: 50%;
    
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}
</style>
