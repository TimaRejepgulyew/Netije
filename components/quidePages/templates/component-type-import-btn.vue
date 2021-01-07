<template>
  <div>
    <label :for="item.name" class="name guide--link">{{ item.name }}</label>
    <div class="description">{{ item.description }}</div>
    <input
      :id="item.name"
      class="input_file"
      type="file"
      name="file"
      :accept="acceptFiles"
      @change="changeFile"
    />
  </div>
</template>

<script>
import { saveAs } from "file-saver";
export default {
  props: ["item"],
  data() {
    return {
      file: null,
      isDropZoneActive: false,
      fileTypes: [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
        "application/vnd.ms-excel.sheet.macroEnabled.12",
        "application/vnd.ms-excel.template.macroEnabled.12",
        "application/vnd.ms-excel.addin.macroEnabled.12",
        "application/vnd.ms-excel.sheet.binary.macroEnabled.12"
      ]
    };
  },
  computed: {
    acceptFiles() {
      return this.fileTypes.join();
    }
  },
  methods: {
    changeFile(e) {
      let file = new FormData();
      file.append("file", e.target.files[0]);

      this.$awn.asyncBlock(
        this.item.params.onChange(this, file, {
          responseType: "blob"
        }),
        ({ data }) => {
          const blob = new Blob(
            [data],
            {
              type: `data:${data.type}`
            },
            e => {
              console.error(e.data);
            }
          );
          saveAs(blob, `reports.txt`);
          this.$awn.success();
        },
        e => {
          console.log(e);
          this.$awn.alert();
        }
      );
      e.target.value = "";
    }
  }
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";

.input_file {
  width: 1px;
  height: 1px;
  position: absolute;
  z-index: -1;
}
.guide--link {
  cursor: pointer;
  text-decoration: none;
  color: $base-accent;
}
.guide--link:hover {
  color: #f90;
}
</style>
