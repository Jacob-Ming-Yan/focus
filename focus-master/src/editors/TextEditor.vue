<template>
    <v-container pa-0>
        <v-textarea outline label="Text" v-model="value.content">
        </v-textarea>
    </v-container>
</template>

<script>
    export default {
        name: "TextEditor",
        props: [
            'value'
        ]
    }
</script>

<style scoped>

</style>