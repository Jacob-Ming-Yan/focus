<!--suppress XmlUnboundNsPrefix, HtmlUnknownBooleanAttribute -->
<template>
    <v-layout align-start v-bind:style="bg">
    <v-expansion-panel expand>
        <v-expansion-panel-content disabled>
            <template v-slot:header>
                <h6 class="title">Students</h6>
            </template>
        </v-expansion-panel-content>
        <v-expansion-panel-content expand-icon="keyboard_arrow_down" ripple>
            <template v-slot:header>
                <div>Present</div>
            </template>
            <v-list>
                <student-list-item v-for="(student, index) in presentStudents" :key="index" :student="student" :class="statuses[student.status].class">

                </student-list-item>
            </v-list>
        </v-expansion-panel-content>
        <v-expansion-panel-content expand-icon="keyboard_arrow_down" ripple>
            <template v-slot:header>
                <div>Idle</div>
            </template>
            <v-btn block class="pa-0" flat @click="notifyAll">
                Notify All
            </v-btn>
            <v-list two-line>
                <student-list-item v-for="(student, index) in idleStudents" :key="index" :student="student" :class="statuses[student.status].class">

                </student-list-item>
            </v-list>
        </v-expansion-panel-content>
        <v-expansion-panel-content expand-icon="keyboard_arrow_down" ripple>
            <template v-slot:header>
                <div>Absent</div>
            </template>
            <v-list two-line>
                <student-list-item v-for="(student, index) in absentStudents" :key="index" :student="student" :class="statuses[student.status].class">

                </student-list-item>
            </v-list>
        </v-expansion-panel-content>

    </v-expansion-panel>
    </v-layout>
</template>

<script>
    // noinspection JSUnusedGlobalSymbols
    import StudentListItem from "./StudentListItem";
    export default {
        name: "StudentsViewer",
        components: {StudentListItem},
        data() {
            return {
                bg: {
                    background: '#424242'
                },
                num_students: 20,
                statuses: {
                    "Present": {
                        class: "list-tile-present",
                    },
                    "Idle": {
                        class: "list-tile-idle",
                        icon: "notifications_active",
                    },
                    "Absent": {
                        class: "list-tile-absent",
                    }
                }
            }
        },
        computed:{
            presentStudents(){
                return this.$store.state.students.filter(x=>x.status==='Present').sort(function(a,b){
                    if(a.name < b.name){
                        return -1;
                    }else if(a.name < b.name){
                        return 1;
                    }
                    return 0;
                })
            },
            idleStudents(){
                return this.$store.state.students.filter(x=>x.status==='Idle').sort(function(a,b){
                    if(a.name < b.name){
                        return -1;
                    }else if(a.name < b.name){
                        return 1;
                    }
                    return 0;
                })
            },
            absentStudents(){
                return this.$store.state.students.filter(x=>x.status==='Absent').sort(function(a,b){
                    if(a.name < b.name){
                        return -1;
                    }else if(a.name < b.name){
                        return 1;
                    }
                    return 0;
                })
            }
        },
        methods: {
            capitalizeFirstLetter: function (string) {
                if (!string) {
                    return string;
                }
                return string[0].toUpperCase() + string.slice(1);
            },
            notifyAll(){
                let self = this;
                this.idleStudents.map(x=>x.id).forEach((id)=>{
                    self.makePresent(id)
                })

            },
            makePresent(id) {
                let store = this.$store;
                setTimeout(()=>{
                    store.commit('makeStudentPresent', id)
                }, Math.floor(Math.random() * 3000) + 500)
            }
        },
        mounted() {
            let self = this;
            this.$root.$on('theme-change', function(dark){
                self.bg.background = (dark) ? '#424242' : '#fff';
            });
            fetch(`https://randomuser.me/api?results=${this.num_students}&nat=us`)
                .then((res) => {
                    return res.json()
                })
                .then((json) => {
                    this.$store.commit('clearStudents');
                    for (let i in json["results"]) {
                        if (json["results"].hasOwnProperty(i)) {
                            let rand = Math.floor(Math.random() * 8);
                            let status = null;
                            if (rand < 4) {
                                status = 'Present';
                            } else if (rand >= 4 && rand <=  6) {
                                status = 'Absent';
                            } else {
                                status = 'Idle';
                            }
                            let s = {
                                id: json["results"][i]["id"]["value"],
                                name: `${this.capitalizeFirstLetter(json["results"][i]["name"]["first"])} ${this.capitalizeFirstLetter(json["results"][i]["name"]["last"])}`,
                                status: status,
                                "image": json["results"][i]["picture"]["thumbnail"]
                            };
                            this.$store.commit('addStudent', s)
                        }
                    }
                })
        }
    }
</script>

<style scoped>

    .list-tile-present {
        border-left: rgba(0,80,5,0.5) solid 5px;
    }

    .list-tile-idle {
        border-left: rgba(142,0,0,0.5) solid 5px;

    }

    .list-tile-absent {
        border-left: rgba(0,0,0,0.5) solid 5px;
        opacity: 0.75;

    }
</style>