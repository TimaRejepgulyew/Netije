<template>
  <div>
    <DxPopup
      width="90%"
      height="auto"
      :showTitle="false"
      :visible.sync="isOpenCardUpdate"
      :drag-enabled="false"
      :close-on-outside-click="true"
    >
      <div class="scrool-auto">
        <contact
          :correspondentId="correspondentId"
          @valueChanged="valueChanged"
          v-if="isOpenCardUpdate"
          :contactId="id"
          :isCard="true"
          key="update"
        />
      </div>
    </DxPopup>
    <DxPopup
      width="90%"
      height="auto"
      :showTitle="false"
      :visible.sync="isOpenCardCreate"
      :drag-enabled="false"
      :close-on-outside-click="true"
    >
      <div class="scrool-auto">
        <contact
          :correspondentId="correspondentId"
          @valueChanged="valueChanged"
          v-if="isOpenCardCreate"
          :isCard="true"
          :contactId="false"
          key="create"
        />
      </div>
    </DxPopup>
    <DxButton
      :visible="showBtn && allowReadContactDetails"
      :on-click="this.openUpdateCard"
      icon="info"
      type="default"
      stylingMode="text"
      :hint="$t('translations.fields.moreAbout')"
      :useSubmitBehavior="false"
    ></DxButton>
    <DxButton
      :disabled="readOnly"
      :visible="allowCreateContact"
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
import contact from "~/components/parties/contact/card.vue";
import { DxPopup } from "devextreme-vue/popup";
import { DxButton } from "devextreme-vue";
import EntityType from "~/infrastructure/constants/entityTypes";
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
      return this.id ? true : false;
    },
    allowReadContactDetails() {
      return this.$store.getters["permissions/allowReading"](
        EntityType.Contact
      );
    },
    allowCreateContact() {
      return this.$store.getters["permissions/allowCreating"](
        EntityType.Contact
      );
    }
  },
  methods: {
    valueChanged(data) {
      this.$emit("valueChanged", data);
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
  props: ["id", "type", "correspondentId", "readOnly"]
};
</script>
<style lang="scss">
.scrool-auto {
  width: 100%;
  overflow: auto;
}
</style>
