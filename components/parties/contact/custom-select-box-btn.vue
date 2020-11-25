<template>
  <div>
    <DxButton
      :visible="hasValue && allowReadContactDetails"
      :on-click="this.showCardUpdate"
      icon="info"
      type="default"
      stylingMode="text"
      :hint="$t('translations.fields.moreAbout')"
      :useSubmitBehavior="false"
    ></DxButton>
    <DxButton
      :disabled="readOnly"
      :visible="allowCreateContact"
      :on-click="this.showCardCreate"
      icon="plus"
      type="default"
      stylingMode="text"
      :hint="$t('buttons.add')"
      :useSubmitBehavior="false"
    ></DxButton>
  </div>
</template>
<script>
import { DxButton } from "devextreme-vue";
import EntityType from "~/infrastructure/constants/entityTypes";
export default {
  components: {
    DxButton
  },
  props: ["id", "type", "correspondentId", "readOnly"],
  data() {
    return {
      isOpenCardUpdate: false,
      isOpenCardCreate: false
    };
  },
  computed: {
    hasValue() {
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
    showCardUpdate() {
      this.$popup.contactCard(
        this,
        {
          contactId: this.id,
          correspondentId: this.correspondentId
        },
        {
          listeners: [
            { eventName: "valueChanged", handlerName: "valueChanged" }
          ]
        }
      );
    },
    showCardCreate() {
      this.$popup.contactCard(
        this,
        {
          correspondentId: this.correspondentId
        },
        {
           showLoadingPanel:false,
          listeners: [
            { eventName: "valueChanged", handlerName: "valueChanged" }
          ]
        }
      );
    },
    closeCard() {
      this.isOpenCardUpdate = false;
      this.isOpenCardCreate = false;
    },
    openCreateCard() {
      this.isOpenCardCreate = !this.isOpenCardCreate;
    }
  }
};
</script>
<style lang="scss">
.scrool-auto {
  width: 100%;
  overflow: auto;
}
</style>
