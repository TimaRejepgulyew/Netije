<template>
  <div>
    <DxPopup
      width="90%"
      height="90%"
      :showTitle="true"
      :visible.sync="isOpenCardUpdate"
      :drag-enabled="false"
      :close-on-outside-click="true"
    >
      <div class="scrool-auto">
        <contact
          @setContact="setContact"
          v-if="isOpenCardUpdate"
          :counterpartId="counterpartId"
          :isCard="true"
          key="update"
        />
      </div>
    </DxPopup>
    <DxPopup
      width="90%"
      height="90%"
      :showTitle="true"
      :visible.sync="isOpenCardCreate"
      :drag-enabled="false"
      :close-on-outside-click="true"
    >
      <div class="scrool-auto">
        <contact
          @setContact="setContact"
          v-if="isOpenCardCreate"
          :isCard="true"
          :counterpartId="false"
          key="create"
        />
      </div>
    </DxPopup>
    <DxButton
      :visible="showBtn"
      :on-click="this.openUpdateCard"
      icon="info"
      type="default"
      stylingMode="text"
      :hint="$t('translations.fields.moreAbout')"
      :useSubmitBehavior="false"
    ></DxButton>
    <DxButton
      :on-click="this.openCreateCard"
      icon="plus"
      type="default"
      stylingMode="text"
      :hint="$t('buttons.add')"
      :useSubmitBehavior="false"
    ></DxButton>
  </div>
</template>
<script>
import contact from "~/components/parties/contact-card.vue";
import { DxPopup } from "devextreme-vue/popup";
import { DxButton } from "devextreme-vue";
export default {
  components: {
    DxButton,
    DxPopup,
    contact
  },
  data() {
    return {
      isOpenCardUpdate: false,
      isOpenCardCreate: false
    };
  },
  computed: {
    showBtn() {
      return this.counterpartId ? true : false;
    }
  },
  methods: {
    setContact(data) {
      this.$emit("setContact", data);
    },
    openUpdateCard() {
      this.isOpenCardUpdate = !this.isOpenCardUpdate;
    },
    closeCard() {
      this.isOpenCardUpdate = false;
      this.isOpenCardCreate = false;
    },
    openCreateCard() {
      this.isOpenCardCreate = !this.isOpenCardCreate;
    }
  },
  props: ["counterpartId", "type","filter"]
};
</script>
<style lang="scss">
.scrool-auto {
  width: 100%;
  overflow: auto;
}
</style>