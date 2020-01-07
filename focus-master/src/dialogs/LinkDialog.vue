<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">Add Link</v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Link</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field
                                        v-model="urlString"
                                        v-validate="'required|url'"
                                        :error-messages="errors.collect('name')"
                                        data-vv-name="name"
                                        label="URL"
                                        required
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click="dialog = false" v-on:click="addUrl">Add</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import Vue from 'vue';
    import VeeValidate from 'vee-validate';

    Vue.use(VeeValidate);

    export default {
        name: "LinkDialog",
        data: () => ({
            dialog: false,
            urlString: ''
        }),
        methods:{
            addUrl(){
                this.$validator.validateAll().then((result) => {
                    if(result){
                        //valid url
                    }
                    else{
                       //invalid ur
                    }
                })
            }
        }
    }

</script>

<style scoped>

</style>