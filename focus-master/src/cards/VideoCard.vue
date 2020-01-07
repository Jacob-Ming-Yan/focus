<template>
    <!--    <card-base type="Video" icon="ondemand_video" :index="$vnode.key">-->
    <card-base :value="value.base" v-on:settings="settings" :on-save="save" :on-cancel="cancel">
        <!--suppress XmlUnboundNsPrefix, HtmlUnknownBooleanAttribute -->
        <template v-slot:view>
            <v-layout align-center justify-center row>
                <iframe
                        style="width:100%; height: 500px;"
                       id="vid"
                        :src="value.embedUrl"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen">
                </iframe>
            </v-layout>

        </template>
        <!--suppress XmlUnboundNsPrefix, HtmlUnknownBooleanAttribute -->
        <template v-slot:editor>
            <video-editor v-model="copy"></video-editor>
        </template>
    </card-base>
</template>

<script>
    import CardBase from "./CardBase";
    import VideoEditor from "../editors/VideoEditor";

    export default {
        name: "VideoCard",
        props: ['value'],
        components: {VideoEditor, CardBase},
        data(){
            return{
                copy: JSON.parse(JSON.stringify(this.value))
            }
        },
        methods: {
            save(){
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