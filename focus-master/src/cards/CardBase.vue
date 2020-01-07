<template>
    <v-card class="mx-auto ma-3" :class="{'invisible-card': !value.cardEnabled}">
        <v-card-title class="pa-0">
            <v-avatar>
                <v-icon style="padding-left: 10px;">{{value.icon}}</v-icon>
            </v-avatar>
            <v-divider vertical style="margin: 0 20px 0 10px"></v-divider>
            <h1>{{value.title}}</h1>
            <v-spacer></v-spacer>
            <v-divider vertical></v-divider>
            <v-btn icon>
                <v-icon @click="moveUp" :disabled="first">arrow_upward</v-icon>
            </v-btn>
            <v-divider vertical></v-divider>
            <v-btn icon>
                <v-icon @click="moveDown" :disabled="last">arrow_downward</v-icon>
            </v-btn>
            <v-divider vertical></v-divider>
            <v-btn icon>
                <v-icon @click.stop="dialog = true">delete_forever</v-icon>
            </v-btn>
            <v-divider vertical></v-divider>
            <v-btn icon @click="asdf()">
                <v-icon>settings</v-icon>
            </v-btn>
            <v-divider vertical></v-divider>

            <v-switch :input-value="value.cardEnabled" style="margin-left: 10px; max-width: 50px; max-height: 46px;" @click.native="toggle"></v-switch>


        </v-card-title>
        <v-divider></v-divider>
        <v-window v-model="viewer">
            <v-window-item :value="1">
                <v-card-text>
                    <slot name="view"></slot>
                </v-card-text>
            </v-window-item>

            <v-window-item :value="2">
                <v-card-text>
                    <slot name="editor"></slot>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn outline @click="saving">Save</v-btn>
                    <v-btn outline @click="cancelling">Cancel</v-btn>
                </v-card-actions>
            </v-window-item>
        </v-window>

        <v-dialog v-model="dialog" max-width="300">
            <v-card>
                <v-card-text>Are you sure you would like to delete '{{value.title}}'?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="primary" flat @click="doDelete">
                        Yes
                    </v-btn>
                    <v-btn color="error" flat @click="dialog = false">
                        No
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


    </v-card>
</template>

<script>
    export default {
        name: "CardBase",
        data() {
            return {
                viewer: 1,
                visible: 1,
                dialog: false,
                snackbar: false
            }
        },
        methods: {
            doDelete: function(){
                this.dialog = false;
                this.$store.commit('deleteItem', this.value);
            },
            asdf: function () {
                let view = this.viewer === 1;
                if(view) {
                    this.$emit('settings');
                }
                this.viewer = (view) ? 2 : 1;
            },
            saving: function(){
                this.viewer = 1;
                this.onSave();
            },
            cancelling: function(){
                this.viewer = 1;
                this.onCancel();
            },
            toggle:function(){
                this.$store.commit('toggleItem', this.value)
            },
            moveUp(){
                this.$store.commit('moveUp', this.value)
            },
            moveDown(){
                this.$store.commit('moveDown', this.value)
            }
        },
        computed:{
            first: function(){
                return this.$store.getters.isFirst(this.value);
            },
            last: function(){
                return this.$store.getters.isLast(this.value);
            }
        },
        props: {
            value: Object,
            onSave: {
                default: ()=>{},
                type: Function
            },
            onCancel: {
                default: ()=>{},
                type: Function
            }
        }
    }
</script>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .invisible-card {
        opacity: 0.5;
    }
</style>