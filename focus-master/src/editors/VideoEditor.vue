<template>
    <v-container pa-0>
        <v-text-field label="URL" v-model="value.url" @change="embedUpdate"></v-text-field>
        <iframe v-if="this.value.embedUrl!==null" height = "300" width = "570" id="vid" :src="value.embedUrl" frameborder="0" allow="accelerometer; autoplay; encrypted-media gyroscope; picture-in-picture">
        </iframe>
    </v-container>
</template>

<script>
    export default {
        name: "VideoEditor",
        props:[
            'value'
        ],
        methods: {
            embedUpdate(){
                this.value.embedUrl = this.value.url.replace('watch?v=', 'embed/');
            }
        }
    }
</script>

<style scoped>

</style>