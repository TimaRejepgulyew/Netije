<template>
  <div id="list_container">
    <chatSearchPanel @createRoom="createRoom" />
    <DxList :data-source="dataSource" height="100%" search-expr="name">
      <!-- :searchEditorOptions="searchEditorOptions" -->
      <!-- :search-enabled="true" -->
      <template #item="{ data }">
        <div @click="setCurrentRoom(data.id)">
          <roomInfo :room="data" />
        </div>
      </template>
    </DxList>
    <!-- <div class="notifications_btn">Уведомления</div> -->
  </div>
</template>


<script>
import DxList from "devextreme-vue/list";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";
import dataApi from "~/static/dataApi";
import roomInfo from "~/components/chat/components/room-info.vue";
import chatSearchPanel from "~/components/chat/components/chat-search-panel/index.vue";

export default {
  components: {
    DxList,
    roomInfo,
    chatSearchPanel
  },
  data() {
    return {
      searchInProgress: false,
      searchValue: ""
    };
  },
  computed: {
    dataSource() {
      if (this.searchValue !== "" || this.searchInProgress) {
        return this.rooms;
      }
      return this.lastRooms;
    },
    searchEditorOptions() {
      return {
        template: "searchPanel"
        // value: this.searchValue,
        // onValueChanged: e => {
        //   this.searchValue = e.value;
        // },
        // onFocusIn: () => {
        //   this.searchInProgress = true;
        // },
        // onFocusOut: () => {
        //   this.searchInProgress = false;
        // }
      };
    },
    rooms() {
      const dataSource = new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.Employee
        }),
        filter: ["name", "contains", this.searchValue],
        paginate: false,
        pageSize: 10,
        displayExpr: "name"
      });
      return dataSource;
    },
    lastRooms() {
      const dataSource = new ArrayStore({
        key: "id",
        data: this.$store.getters["chatStore/rooms"]
      });
      return dataSource;
    }
  },
  methods: {
    setCurrentRoom(id) {
      this.$store.commit("chatStore/SET_CURRENT_ROOM", id);
    },
    createRoom(roomType) {
      this.$emit("createRoom", roomType);
    }
  }
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";

#list_container {
  padding: 10px 10px 10px 10px;
  height: 100%;
  border-right: 1px solid $base-border-color;
  .notifications_btn {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    background-color: red;
  }
}
</style>