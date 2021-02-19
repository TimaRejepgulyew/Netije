<template>
  <div>
    <DxForm
      :scrolling-enabled="true"
      ref="form"
      :form-data="{ test: 'nnn', best: 'mmm' }"
      :show-colon-after-label="true"
      :show-validation-summary="false"
      :col-count="2"
      :items="items"
    >
      <template #autocomlete="{ data }">
        <AutocomleteTextArea
          @focusIn="(value) => data.editorOptions.onFocusIn()"
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
      class Item {
        constructor(
          context,
          {
            index,
            name,
            colSpan,
            dataField,
            isRequired,
            editorType,
            template,
            label,
            editorOptions,
          }
        ) {
          this.context = context;
          this.index = index;
          this.name = name;
          this.colSpan = colSpan;
          this.dataField = dataField;
          this.isRequired = isRequired;
          this.editorType = editorType;
          this.label = label;
          this.template = template;
          this.editorOptions = {
            onFocusIn: () => {
              this.onFocusIn();
            },
            ...editorOptions,
          };
        }
        onFocusIn() {
          this.context.$emit("onFocusField", this.index);
        }
      }

      const items = [
        new Item(this, {
          index: 1,
          name: 2,
          colSpan: 3,
          dataField: "test",
          isRequired: true,
          editorType: "dxSelectBox",
          editorOptions: {},
          template: undefined,
          label: { text: "brsre" },
        }),
        new Item(this, {
          index: 1,
          name: 2,
          colSpan: 2,
          dataField: "test",
          isRequired: true,
          editorType: "dxSelectBox",
          editorOptions: {},
          template: undefined,
          label: { text: "brsre" },
        }),
        new Item(this, {
          index: 1,
          name: 2,
          colSpan: 2,
          dataField: "test",
          isRequired: true,
          editorType: "dxSelectBox",
          editorOptions: {},
          template: undefined,
          label: { text: "brsre" },
        }),
        new Item(this, {
          index: 1,
          name: 2,
          colSpan: 3,
          dataField: "test",
          isRequired: true,
          editorType: "dxSelectBox",
          editorOptions: {},
          template: undefined,
          label: { text: "brsre" },
        }),
        new Item(this, {
          index: 1,
          name: 2,
          colSpan: 3,
          dataField: "test",
          isRequired: true,
          editorType: "dxSelectBox",
          editorOptions: {},
          template: undefined,
          label: { text: "brsre" },
        }),
        new Item(this, {
          index: 1,
          name: 2,
          colSpan: 3,
          dataField: "test",
          isRequired: true,
          editorType: "dxSelectBox",
          editorOptions: {},
          template: undefined,
          label: { text: "brsre" },
        }),
        new Item(this, {
          index: 2,
          name: 2,
          dataField: "test",
          colSpan: 3,
          template: "autocomlete",
        }),
      ];
      return items;
    },
  },
  methods: {
    change(value, e) {
      this.$store.dispatch("dinamicDocument/changeField", { e, value });
    },
  },
};
</script>

<style>
</style>