<template>
  <div class="d-flex align-center">
    <div class="list__content">
      <div>
        <document-icon :extension="item.data.extension"></document-icon>
        {{ item.data.note }}
        <div>
          <i class="dx-icon dx-icon-clock"></i
          ><small>{{ item.data.created | formatDate }}</small>
        </div>

        <div
          class="max-width-5vw"
          :class="{ link: isRecipient }"
          @click="
            () => {
              if (isRecipient) toDetailAuthor();
            }
          "
        >
          <i class="dx-icon dx-icon-user"></i>
          <small>{{ item.data.author.name }}</small>
        </div>
      </div>
    </div>
    <div
      v-if="item.data.malwareScanResult !== undefined"
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
        :virusDetected="virusDetected(item.data.malwareScanResult)"
      />
    </div>
  </div>
</template>

<script>
import DocumentIcon from "~/components/page/document-icon";
import MalwareScanResultModel from "~/infrastructure/models/MalwareScanResults.js";
import AttachmentActionBtn from "~/components/document-module/main-doc-form/attachment-action-btn";
import malwareScanResultsVariable from "~/infrastructure/constants/malwareScanResults.js";
import recipientTypes from "~/infrastructure/constants/resipientType.js";
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
    isRecipient() {
      return this.item.data.author.recipientType === recipientTypes.Employee
        ? true
        : false;
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
    virusDetected(malwareScanResult) {
     return  malwareScanResult === malwareScanResultsVariable.VirusDetected
    },
    toDetailAuthor() {
      this.$popup.employeeCard(
        this,
        {
          employeeId: this.item.data.author.id,
        },
        {
          height: "auto",
          listeners: [
            { eventName: "valueChanged", handlerName: "valueChanged" },
          ],
        }
      );
    },
  },
};
</script>
<style lang="scss">
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
.max-width-5vw {
  height: auto;
  width: 6vw;
  overflow: hidden;
  text-overflow: ellipsis;

  white-space: nowrap;
}
</style>

