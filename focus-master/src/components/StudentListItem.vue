<template>
    <v-list-tile avatar>
        <v-list-tile-avatar class="pa-0">
            <img :src="student.image" alt="Student Avatar">
        </v-list-tile-avatar>

        <v-list-tile-content class="pa-0">
            <v-list-tile-title>{{student.name}}</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action v-if="student.status==='Idle'">
            <v-tooltip left>
                <template v-slot:activator="{on}">
                    <v-btn icon ripple @click="makePresent(student.id)" v-on="on">
                        <v-icon color="grey lighten-1">notifications_active</v-icon>
                    </v-btn>
                </template>
                <span>Send Notification</span>
            </v-tooltip>
        </v-list-tile-action>

    </v-list-tile>

</template>

<script>
    export default {
        name: "StudentListItem",
        data(){
            return{
                statuses: {
                    "Present": {
                        class: "list-tile-present"
                    },
                    "Idle": {
                        class: "list-tile-idle",
                        icon: "notifications_active"
                    },
                    "Absent": {
                        class: "list-tile-absent"
                    }
                }
            }
        },
        props:{
            student: Object,
            last: {
                type: Boolean,
                default: false
            }
        },
        methods:{
            makePresent(id){
                let store = this.$store;
                setTimeout(()=>{
                    store.commit('makeStudentPresent', id)
                }, Math.floor(Math.random()*3000)+500);
            }
        }
    }
</script>

<style scoped>

</style>