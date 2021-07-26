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
import docflowConstants from "~/infrastructure/constants/docflows.js";
export default {
  props: ["item"],
  data() {
    return {
      file: null,
      isDropZoneActive: false,
      fileTypes: [".docx"]
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
      file.append("DocumentFlow", docflowConstants[this.item.params.docFlowId]);
      this.$awn.asyncBlock(
        this.item.params.onChange(this, file),
        res => {
          this.$awn.success();
        },
        e => {
          this.$awn.alert();
        }
      );
      e.target.value = "";
    }
  }
};
</script>

<style lang="scss">

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
