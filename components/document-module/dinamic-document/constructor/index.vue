<template>
  <div>
    <Toolbar></Toolbar>
    <section>
         <div class="wrapper--relative">
      <DxForm
        :scrolling-enabled="true"
        class="mt-1"
        ref="form"
        :read-only="readOnly"
        :show-colon-after-label="true"
        :show-validation-summary="false"
        :validation-group="documentValidatorName"
      >
        <DxTabbedItem :tab-panel-options="tabPanelOptions">
          <DxTab :col-count="12" :title="$t('document.tabs.main')">
            <DxGroupItem
              :col-span="8"
              :col-count="1"
              :caption="$t('document.groups.captions.main')"
            >
              <DxSimpleItem data-field="name" :editor-options="nameOptions">
                <DxLabel location="left" :text="$t('document.fields.name')" />
                <DxRequiredRule
                  :message="$t('document.validation.nameRequired')"
                />
              </DxSimpleItem>
              <DxSimpleItem
                data-field="documentKind"
                :editor-options="documentKindOptions"
                editor-type="dxSelectBox"
              >
                <DxLabel
                  location="left"
                  :text="$t('document.fields.documentKindId')"
                />
                <DxRequiredRule
                  :message="$t('document.validation.documentKindIdRequired')"
                />
              </DxSimpleItem>

              <DxSimpleItem
                data-field="subject"
                editor-type="dxTextArea"
                template="autocomlete"
              >
                <!-- :editor-options="subjectOptions" -->
                <DxLabel
                  location="left"
                  :text="$t('document.fields.subject')"
                />
                <DxRequiredRule
                  :message="$t('document.validation.subjectRequired')"
                />
              </DxSimpleItem>
              <DxSimpleItem template="dinamic"></DxSimpleItem>
              <DxSimpleItem
                data-field="note"
                :editor-options="noteOptions"
                editor-type="dxTextArea"
              >
                <DxLabel location="left" :text="$t('document.fields.note')" />
              </DxSimpleItem>
            </DxGroupItem>
            <DxGroupItem :col-span="4">
              <DxSimpleItem template="registrationBlock"></DxSimpleItem>
              <DxGroupItem :caption="$t('document.groups.captions.lifeCycle')">
                <DxSimpleItem template="lifeCycle"></DxSimpleItem>
              </DxGroupItem>
            </DxGroupItem>
          </DxTab>
          <DxTab
            :col-count="8"
            :title="$t('document.tabs.relations')"
            :disabled="isDataChanged"
          >
            <DxSimpleItem :col-span="8" template="relation"></DxSimpleItem>
          </DxTab>
          <DxTab
            :col-count="8"
            :title="$t('document.tabs.tasks')"
            :disabled="isNew"
          >
            <DxSimpleItem :col-span="8" template="documentTasks"></DxSimpleItem>
          </DxTab>
          <DxTab
            :col-count="8"
            :title="$t('document.tabs.history')"
            :disabled="isNew"
          >
            <DxSimpleItem :col-span="8" template="history"></DxSimpleItem>
          </DxTab>
          <DxTab
            :col-count="8"
            :title="$t('document.tabs.extradition')"
            :disabled="isNew"
          >
            <DxSimpleItem
              :col-span="8"
              template="DocumentExtradition"
            ></DxSimpleItem>
          </DxTab>
          <DxTab
            :col-count="8"
            :title="$t('document.tabs.exchangeLogs')"
            :disabled="isNew"
            v-if="canExchangePermission && isExchangeble"
          >
            <DxSimpleItem
              :col-span="8"
              template="ElExchangeLogs"
            ></DxSimpleItem>
          </DxTab>
        </DxTabbedItem>
        <template #ElExchangeLogs>
          <El-exchange-logs :documentId="documentId" />
        </template>
        <template #DocumentExtradition>
          <DocumentExtradition
            :entityTypeGuid="entityTypeGuid"
            :id="documentId"
            slot="history"
          />
        </template>
        <template #history>
          <History
            :entityTypeGuid="entityTypeGuid"
            :id="documentId"
            slot="history"
          ></History>
        </template>
        <template #relation>
          <Relation :documentId="documentId" :isCard="isCard"></Relation>
        </template>
        <template #documentTasks>
          <document-tasks :documentId="documentId" :isCard="isCard" />
        </template>
        <template #lifeCycle>
          <life-cycle :documentId="documentId" :isCard="isCard" />
        </template>
        <template #registrationBlock>
          <doc-registration
            :documentId="documentId"
            :isCard="isCard"
          ></doc-registration>
        </template>
        <template #formByTypeGuid>
          <component
            :documentId="documentId"
            :isCard="isCard"
            :is="formByTypeGuid"
          ></component>
        </template>
        <template #autocomlete>
          <AutocomleteTextArea
            :value="document.subject"
            :options="autocomleteTextOptions"
            @valueChanged="changeSubject"
          />
        </template>
      </DxForm>
    </section>
  
  </div>
</template>

<script>
export default {};
</script>

<style
</style>