<!--suppress ALL -->
<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">Add Video</v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Add Video</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="Title*" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="URL*" v-model="videoURL" @change="displayVideo" required></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <iframe v-if="check" height = "300" width = "570" id="vid" :src="videoURL" frameborder="0" allow="accelerometer; autoplay; encrypted-media gyroscope; picture-in-picture">
                    </iframe>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialog = false">Add Video</v-btn>
                    <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    export default {
        name: "VideoDialog",
        data: () => ({
            dialog: false,
            videoURL: '',
            check: false
        }),
        methods: {

            displayVideo() {
                //temp =this.videoURL;
                this.videoURL= this.videoURL.replace('watch?v=','embed/');
                //document.write(temp);
                this.check=true;

            }


        },
        template: {

        }


    }




</script>

<style scoped>

</style>