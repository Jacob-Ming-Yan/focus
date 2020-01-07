

<template>
    <v-container fluid>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">Add Poll</v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Add Poll</span>
                </v-card-title>
                <v-layout row>
                    <v-text-field v-model="question" label="Question" required></v-text-field>
                </v-layout>
                <br>
                <div >

                    <div>
                        <v-flex>
                            <v-card >
                                <v-layout justify-space-between>
                                    <v-card-title>
                                        <h2>Answers</h2>
                                    </v-card-title>
                                    <v-btn  fab small dark @click="options.push({text: null, percentage: 0})">
                                        <v-icon>add</v-icon>
                                    </v-btn>
                                </v-layout>


                                <v-list>
                                    <template v-for="(option, index) in options">
                                        <v-layout justify-space-between :key="index">
                                            <v-text-field box :label="'Answer ' + (index + 1)" v-model="option.text"></v-text-field>
                                            <v-btn fab small dark @click="options.splice(index,1)"><v-icon >clear</v-icon></v-btn>
                                        </v-layout>
                                    </template>
                                </v-list>

                            </v-card>
                        </v-flex>
                    </div>
                </div>
                <br>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click="dialog = false" v-on:click="addPoll">Add Poll</v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>

    </v-container>
</template>


<script>

    export default {
        name: "PollDialog",
        data: () => ({
            question: "",
            dialog: false,
            answerCount: 1,
            options: [
                {
                    text: null,
                    percentage: 0
                },
                {
                    text: null,
                    percentage: 0
                },
                {
                    text: null,
                    percentage: 0
                },

            ],
            optionsCopy: null,
            questionCopy: null
        }),

        methods:{
            addPoll(){
                // TODO add poll to feed
            },


        }
    }


</script>


<style scoped>

</style>