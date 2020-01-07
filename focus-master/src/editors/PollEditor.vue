<template>
    <v-container pa-0>
        <v-text-field label="Question" v-model="value.question"></v-text-field>
            <v-list>
                <template v-for="(option, index) in value.options">
                    <v-layout align-start :key="index">
                        <v-text-field box :label="'Option ' + (index+1)" v-model="option.option"></v-text-field>
                        <v-btn flat color="red" @click="value.options.splice(index,1)">Delete</v-btn>
                    </v-layout>
                </template>
            </v-list>
            <v-btn block @click="value.options.push({text: null, percentage: 0})">Add</v-btn>
    </v-container>
</template>

<script>
    export default {
        name: "PollEditor",
        props:[
            'value'
        ]
    }
</script>

<style scoped>

</style>