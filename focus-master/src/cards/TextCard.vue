<template>
    <card-base :value="value.base" v-on:settings="settings" :on-save="save" :on-cancel="cancel">
        <!--suppress XmlUnboundNsPrefix, HtmlUnknownBooleanAttribute -->
        <template v-slot:view>
            <span style="white-space: pre;">{{value.content}}</span>
        </template>
        <!--suppress XmlUnboundNsPrefix, HtmlUnknownBooleanAttribute -->
        <template v-slot:editor>
            <text-editor v-model="copy"></text-editor>
        </template>
    </card-base>
</template>

<script>
    import CardBase from "./CardBase";
    import TextEditor from "@/editors/TextEditor";

    export default {
        name: "TextCard",
        components: {TextEditor, CardBase},
        props: {
            value: Object
        },
        data() {
            return {
                copy: JSON.parse(JSON.stringify(this.value))
            }
        },
        methods: {
            save: function () {
                this.$store.commit('saveChanges', this.copy);
                this.copy = JSON.parse(JSON.stringify(this.value));
            },
            cancel: function () {
                this.copy = JSON.parse(JSON.stringify(this.value));
            },
            settings(){
                this.copy = JSON.parse(JSON.stringify(this.value));
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>