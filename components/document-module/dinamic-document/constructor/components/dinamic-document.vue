<template>
  <div>
    <DxForm
      :scrolling-enabled="true"
      ref="form"
      :form-data="{ test: 'nnn', best: 'mmm' }"
      :show-colon-after-label="true"
      :show-validation-summary="false"
      :col-count="3"
      :items="items"
    >
      <template #autocomlete="data">
        <AutocomleteTextArea
          value="test"
          :options="{}"
          @valueChanged="(value) => change(data, value)"
        />
      </template>
    </DxForm>
  </div>
</template>

<script>
import DxForm from "devextreme-vue/form";
import AutocomleteTextArea from "~/components/autocomplete-text/text-area/index.vue";
export default {
  components: {
    DxForm,
    AutocomleteTextArea,
  },
  //   data() {
  //     document: ["nnn", "mmm"];
  //   },
  computed: {
    items() {
      return [
        {
          colSpan: 3,
          dataField: "test",
          isRequired: true,
          editorType: "dxSelectBox",
          label: { text: "brsre" },
        },
        {
          dataField: "test",
          colSpan: 3,
          name: "name",
          template: "autocomlete",
        },
      ];
    },
  },
  methods: {
    change(value, e) {
      console.log(value, e);
    },
  },
};
</script>

<style>
</style>