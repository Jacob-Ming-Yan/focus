<template>
    <v-container pa-0>
        <v-text-field label="Link" v-model="value.url" v-on:change="checkHttp"></v-text-field>
    </v-container>
</template>

<script>
    export default {
        name: "LinkEditor",
        props:[
            'value'
        ],
        methods:{
            checkHttp: function () {
                if(!this.value.url.startsWith("http://")) {
                    this.value.url = "http://" + this.value.url;
                }
            }
        }
    }
</script>

<style scoped>

</style>