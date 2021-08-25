<template>
    <components @showCard="showCard" :is="resolutionType" :task="data" />
</template>

<script>
import { load } from '../../../infrastructure/services/taskService.js'
import TaskType from '../../../infrastructure/constants/taskType.js'
import actionItemExicutionResolution from './action-item-exicution.vue'
import documentReviewResolution from './document-review.vue'
export default {
    components: { actionItemExicutionResolution, documentReviewResolution },
    props: { data: { type: Object, required: true } },
    computed: {
        resolutionType () {
            switch (this.data.entity.taskType) {
                case TaskType.ActionItemExecutionTask:
                    return actionItemExicutionResolution
                case TaskType.DocumentReviewTask:
                    return documentReviewResolution
                default:
                    throw new Error('unnkow resolution TaskType')
            }
        }
    },
    methods: {
        showCard ({ taskType, taskId }) {
            this.$popup.taskCard(this, {
                params: { taskType, taskId },
                handler: load
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.align-stretch {
    align-content: stretch;
}
.max-width-5vw {
    max-width: 50vw;
    min-width: 300px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.link {
    cursor: pointer;

    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 3px;
    text-decoration: none;
    &:hover {
        background: darken($base-bg, 5%);
        width: auto;
    }
}
.icon {
    width: 25px;
    margin: 0;
    margin-left: 10px;
    margin-right: 5px;
}
</style>
