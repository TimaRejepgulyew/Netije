<template>
    <div class="main-panel-container">
        <div>
            <div class="d-flex align-center">
                <img
                    class="chat-user-icon--small"
                    src="~/static/icons/user.svg"
                    alt="userIcon"
                />
                <div class="selector">
                    <EmployeeSelectBox
                        :value="member"
                        @valueChanged="changeMember"
                        valueExpr="id"
                    />
                </div>
            </div>
        </div>
        <div class="creating-descriptions">
            <section>
                <img
                    class="chat-user-icon"
                    src="~/static/icons/user.svg"
                    alt="userIcon"
                />
            </section>
            <h3>{{ $t("chat.creatingPanel.privateChat") }}</h3>
            <p class="creating-panel-description">
                {{ $t("chat.creatingPanel.privateChatDescr") }}
            </p>
            <h1 class="start_btn">
                <DxButton
                    :disabled="!isValideRoom"
                    type="success"
                    text="Начать чат"
                    @click="createPrivateRoom"
                ></DxButton>
            </h1>
        </div>
    </div>
</template>

<script>
import userIcon from "~/static/icons/user.svg";
import customSelectItem from "~/components/employee/custom-select-box-item.vue";
import RoomType from "~/components/chat/infrastructure/constants/roomType.js";
import EmployeeSelectBox from "~/components/employee/custom-select-box.vue";
import { DxButton } from "devextreme-vue";
export default {
    components: {
        customSelectItem,
        EmployeeSelectBox,
        DxButton
    },
    inject: ["openPrivateChat"],
    props: {
        roomType: {
            type: Number
        }
    },
    data() {
        return {
            member: null
        };
    },
    computed: {
        isValideRoom() {
            return this.member;
        }
    },
    methods: {
        changeMember(val) {
            this.member = val;
        },
        async createPrivateRoom() {
            const roomId = await this.$chat.createPrivateRoom([this.member]);
            this.openPrivateChat(roomId);
        }
    }
};
</script>

<style lang="scss"></style>
