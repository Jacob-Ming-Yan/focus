<template>
    <card-base :value="value.base" v-on:settings="settings" :on-save="save" :on-cancel="cancel">
        <!--suppress XmlUnboundNsPrefix, HtmlUnknownBooleanAttribute -->
        <template v-slot:view>
            <v-layout align-center justify-center row>
                <v-btn block color="primary" flat :href="value.url" target="_blank">{{value.url}}</v-btn>
            </v-layout>
        </template>
        <!--suppress XmlUnboundNsPrefix, HtmlUnknownBooleanAttribute -->
        <template v-slot:editor>
            <link-editor v-model="copy"></link-editor>
        </template>
    </card-base>
</template>

<script>
    import CardBase from "./CardBase";
    import LinkEditor from "../editors/LinkEditor";
    export default {
        name: "LinkCard",
        components: {LinkEditor, CardBase},
        props: {
            value: Object
        },
        data(){
            return{
                copy: JSON.parse(JSON.stringify(this.value))
            }
        },
        methods:{
            save: function(){
                this.$store.commit('saveChanges', this.copy);
                this.copy = JSON.parse(JSON.stringify(this.value));
            },
            cancel(){
                this.copy = JSON.parse(JSON.stringify(this.value));
            },
            settings(){
                this.copy = JSON.parse(JSON.stringify(this.value));
            }
        }
    }
</script>

<style scoped>

</style>