<template >
  <DxForm
    :col-count="1"
    :read-only="readOnly"
    :show-colon-after-label="true"
    :show-validation-summary="false"
  >
    <DxGroupItem :col-count="1">
      <DxGroupItem :caption="$t('document.groups.captions.numberAndDate')">
        <DxSimpleItem
          data-field="registrationNumber"
        >
          <DxLabel location="left" />
        </DxSimpleItem>

        <DxSimpleItem data-field="documentRegister">
          <DxLabel
            location="left"
            :text="$t('document.fields.documentRegisterId')"
          />
        </DxSimpleItem>

        <DxSimpleItem data-field="registrationDate" editor-type="dxDateBox">
          <DxLabel
            location="left"
            :text="$t('document.fields.registrationDate')"
          />
        </DxSimpleItem>
        <DxSimpleItem data-field="deliveryMethodId" editor-type="dxSelectBox">
          <DxLabel
            location="left"
            :text="$t('document.fields.deliveryMethodId')"
          />
        </DxSimpleItem>
      </DxGroupItem>
      <DxGroupItem :caption="$t('document.groups.captions.storing')">
        <DxSimpleItem data-field="caseFileId" editor-type="dxSelectBox">
          <DxLabel location="left" :text="$t('document.fields.caseFileId')" />
        </DxSimpleItem>

        <DxSimpleItem data-field="placedToCaseFileDate" editor-type="dxDateBox">
          <DxLabel
            location="left"
            :text="$t('document.fields.placedToCaseFileDate')"
          />
        </DxSimpleItem>
      </DxGroupItem>
    </DxGroupItem>
  </DxForm>
</template>
<script>
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
} from "devextreme-vue/form";
export default {
  components: {
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxForm,
  },
  props: ["readOnly"],

  computed: {},
};
</script>
