<template>
    <div id="form-demo">
        <DxForm
            ref="form"
            :col-count="1"
            :read-only="readOnly"
            :show-colon-after-label="true"
            :show-validation-summary="false"
            :validation-group="taskValidatorName"
        >
            <DxGroupItem :col-count="2">
                <DxSimpleItem template="assignee" data-field="assignee">
                    <DxRequiredRule
                        :message="$t('task.validation.assigneeRequired')"
                    />
                    <DxLabel
                        location="left"
                        :text="$t('task.fields.assignee')"
                    />
                </DxSimpleItem>
                <DxSimpleItem
                    data-field="deadline"
                    :editor-options="deadlineOptions"
                    editor-type="dxDateBox"
                >
                    <DxLabel
                        location="left"
                        :text="$t('task.fields.deadline')"
                    />
                </DxSimpleItem>
                <DxSimpleItem
                    :col-span="2"
                    template="coAssignees"
                    data-field="coAssignees"
                >
                    <DxLabel
                        location="left"
                        :text="$t('task.fields.coAssignees')"
                    />
                </DxSimpleItem>
            </DxGroupItem>
            <template #coAssignees>
                <recipient-tag-box
                    :read-only="readOnly"
                    :value="coAssignees"
                    @valueChanged="setCoAssignees"
                />
            </template>
            <template #assignee>
                <employee-select-box
                    :read-only="readOnly"
                    :messageRequired="$t('task.validation.assigneeRequired')"
                    :validator-group="taskValidatorName"
                    :value="assignee"
                    @valueChanged="setAssignee"
                />
            </template>
        </DxForm>
    </div>
</template>
<script>
import employeeSelectBox from '~/components/employee/custom-select-box.vue'
import employeeTagBox from '~/components/employee/custom-tag-box.vue'
import recipientTagBox from '~/components/recipient/tag-box/index.vue'

import 'devextreme-vue/text-area'
import DxForm, {
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule
} from 'devextreme-vue/form'
import dataApi from '~/static/dataApi'

export default {
    components: {
        employeeSelectBox,
        employeeTagBox,
        recipientTagBox,
        DxGroupItem,
        DxSimpleItem,
        DxRequiredRule,
        DxLabel,
        DxForm
    },
    props: ['taskId', 'canUpdate'],
    data () {
        return {
            assignedByStore: `${dataApi.task.actionItemExecution.GetAvailableProducers}${this.taskId}`
        }
    },
    inject: ['taskValidatorName'],
    methods: {
        setCoAssignees (value) {
            this.$store.commit(`tasks/${this.taskId}/SET_CO_ASSIGNEES`, value)
        },
        setAssignee (value) {
            this.$store.commit(`tasks/${this.taskId}/SET_ASSIGNEE`, value)
        }
    },
    computed: {
        readOnly () {
            return !this.isDraft || !this.canUpdate
        },
        task () {
            return this.$store.getters[`tasks/${this.taskId}/task`]
        },
        coAssignees () {
            return this.task.coAssignees
        },
        assignee () {
            return this.task.assignee
        },
        inProcess () {
            return this.$store.getters[`tasks/${this.taskId}/inProcess`]
        },
        isNew () {
            return this.$store.getters[`tasks${this.taskId}/isNew`]
        },
        isDraft () {
            return this.$store.getters[`tasks/${this.taskId}/isDraft`]
        },
        deadlineOptions () {
            return {
                type: 'datetime',
                dateSerializationFormat: 'yyyy-MM-ddTHH:mm:ss',
                value: this.task.deadline,
                onValueChanged: e => {
                    this.$store.commit(
                        `tasks/${this.taskId}/SET_DEADLINE`,
                        e.value
                    )
                }
            }
        }
    }
}
</script>
