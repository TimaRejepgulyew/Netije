<template>
  <div class="d-flex">
    <document-icon :extension="item.data.extension"></document-icon>
    <div class="list__content">
      {{ item.data.note }}
      <div>
        <i class="dx-icon dx-icon-clock"></i>
        <small>{{ item.data.created | formatDate }}</small>
      </div>
      <div>
        <i class="dx-icon dx-icon-user"></i>
        <small @click="showEmployeeCard">{{ item.data.author }}</small>
      </div>
    </div>
    <div
      v-if="item.data.malwareScanResult !== null || undefined"
      class="malware_scan_result"
    >
      <img
        class="shield_img"
        :src="getById(item.data.malwareScanResult).icon"
      />
      {{ getById(item.data.malwareScanResult).text }}
    </div>
    <div class="list__btn-group">
      <attachment-action-btn
        @updateVersions="refresh"
        :documentId="documentId"
        :version="item.data"
        :isProtected="isProtected(item.data.malwareScanResult)"
      />
    </div>
  </div>
</template>

<script>
import DocumentIcon from "~/components/page/document-icon";
import MalwareScanResultModel from "~/infrastructure/models/MalwareScanResults.js";
import AttachmentActionBtn from "~/components/document-module/main-doc-form/attachment-action-btn";
import malwareScanResultsVariable from "~/infrastructure/constants/malwareScanResults.js";
import moment from "moment";
export default {
  components: {
    DocumentIcon,
    AttachmentActionBtn,
  },
  props: {
    item: {
      type: Object,
    },
    documentId: {
      type: Number,
    },
  },
  computed: {
    malwareScanResultModel() {
      return new MalwareScanResultModel(this);
    },
  },
  filters: {
    formatDate(value) {
      return moment(value).format("MM.DD.YYYY HH:mm");
    },
  },
  methods: {
    refresh() {
      this.$emit("refresh");
    },
    getById(id) {
      return this.malwareScanResultModel.getById(id);
    },
    isProtected(malwareScanResult) {
      let result =
        malwareScanResult === malwareScanResultsVariable.Clean ||
        malwareScanResultsVariable.Unknown
          ? true
          : false;
      return result;
    },
    showEmployeeCard() {
      console.log(this.item);
      // this.$popup.employeeCard(
      //   this,
      //   {
      //     employeeId: this.author.id,
      //   },
      //   {
      //     height: "auto",
      //     listeners: [
      //       { eventName: "valueChanged", handlerName: "valueChanged" },
      //     ],
      //   }
      // );
    },
  },
};
</script>


<style lang="scss" scoped>
.malware_scan_result {
  min-width: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 0 20px;

  .shield_img {
    max-height: 25px;
  }
}
</style>