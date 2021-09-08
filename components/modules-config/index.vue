<template>
    <div>
        <Header
            :headerTitle="$t('modulesConfig.title')"
            :showTitle="true"
            :isbackButton="true"
        >
        </Header>

        <toolbar @saveChanges="saveChanges" :canSave="true" />

        <DxForm ref="form" :col-count="1" :form-data.sync="config">
            <DxGroupItem v-for="module in modulesConfig" :key="module.name">
                <DxSimpleItem
                    :data-field="module.name"
                    editor-type="dxCheckBox"
                >
                    <DxLabel :text="$t(module.text)" />
                </DxSimpleItem>
            </DxGroupItem>
        </DxForm>
    </div>
</template>

<script>
import Header from "~/components/page/page__header";
import Toolbar from "~/components/shared/base-toolbar.vue";
import DxForm from "devextreme-vue/form";

import dataApi from "~/static/dataApi";

import { DxGroupItem, DxSimpleItem, DxLabel } from "devextreme-vue/form";

export default {
    components: {
        Header,
        Toolbar,
        Header,
        DxGroupItem,
        DxSimpleItem,
        DxLabel,
        DxForm,
        Toolbar
    },

    data() {
        return {
            modulesConfig: [
                {
                    name: "antivirus",
                    text: "modulesConfig.config.antivirus"
                },
                {
                    name: "financialAndContractualDocs",
                    text: "modulesConfig.config.financialAndContractualDocs"
                },
                {
                    name: "dynamicDocuments",
                    text: "modulesConfig.config.dynamicDocuments"
                },
                {
                    name: "documentTemplates",
                    text: "modulesConfig.config.documentTemplates"
                },
                {
                    name: "orgLimitation",
                    text: "modulesConfig.config.orgLimitation"
                },
                {
                    name: "filesEditing",
                    text: "modulesConfig.config.filesEditing"
                },
                {
                    name: "internalExchange",
                    text: "modulesConfig.config.internalExchange"
                },
                {
                    name: "externalExchange",
                    text: "modulesConfig.config.externalExchange"
                },
                {
                    name: "chat",
                    text: "modulesConfig.config.chat"
                }
            ]
        };
    },

    methods: {
        async saveChanges() {
            this.$awn.asyncBlock(
                this.$axios.put(
                    this.$dataApi.modulesConfig.config,
                    this.$store.getters["modulesConfig/getConfig"]
                ),
                e => {
                    this.$awn.success();
                },
                e => {
                    this.$awn.alert();
                }
            );
        },

        validateForm(e) {
            e.component.validate();
        }
    },

    created() {
        this.$awn.asyncBlock(
            this.$axios.get(dataApi.modulesConfig.config),
            ({ data }) => {
                // this.$store.commit("modulesConfig/setConfig", data);
            },
            e => {
                this.$awn.alert();
            }
        );
    }
};
</script>
