<!--suppress HtmlUnknownTag -->
<template>
    <card-base :value="value.base" v-on:settings="settings" :on-save="save" :on-cancel="cancel">
        <!--suppress XmlUnboundNsPrefix, HtmlUnknownBooleanAttribute -->
        <template v-slot:view>
            <v-container fluid class="pa-0">
                <h2>{{value.question}}</h2><br/>

                <v-layout align-center v-for="(item, index) in value.options" :key="index">
                    <v-flex md3 xs6 class="pa-0 ma-0" justify-center fill-height>
                        <div>{{item.option}}</div>
                    </v-flex>
                    <v-flex md8 xs0 class="pa-0 ma-0">
                        <v-progress-linear color="info" v-model="item.percentage"></v-progress-linear>
                    </v-flex>
                    <v-flex md1 xs6 style="text-align: right;">
                        {{item.percentage}}%
                    </v-flex>
                </v-layout>
                <br/>
                <v-layout>

                    <v-btn block outline @click="togglePercentages">
                        <span v-if="generating">Stop</span>
                        <span v-else>Restart</span>
                    </v-btn>
                </v-layout>
            </v-container>

        </template>
        <!--suppress XmlUnboundNsPrefix, HtmlUnknownBooleanAttribute -->
        <template v-slot:editor>
            <poll-editor v-model="copy"></poll-editor>
        </template>
    </card-base>
</template>

<script>
    import CardBase from "./CardBase";
    import PollEditor from "../editors/PollEditor";

    export default {
        name: "PollCard",
        components: {PollEditor, CardBase},
        props:{
            value: Object
        },
        data() {
            return {
                val: 50,
                question: "Who was the first president of the United States?",
                options: [
                    {
                        text: 'George Washington',
                        percentage: 60
                    },
                    {
                        text: 'Abraham Lincoln',
                        percentage: 6,
                    },
                    {
                        text: 'This is just a really really really long option',
                        percentage: 34
                    }
                ],
                copy: JSON.parse(JSON.stringify(this.value)),
                optionsCopy: null,
                questionCopy: null,
                interval: null,
                generating: true
            }
        },
        mounted() {
            this.optionsCopy = JSON.parse(JSON.stringify(this.options));
            this.questionCopy = (' ' + this.question).slice(1);

            let self = this;

            self.interval = window.setInterval(self.generatePercentages, 5000)
        },
        methods: {
            save: function () {
                this.$store.commit('saveChanges', this.copy);
                this.copy=JSON.parse(JSON.stringify(this.value));
            },
            cancel: function () {
                this.copy=JSON.parse(JSON.stringify(this.value));
            },
            settings(){
                this.copy=JSON.parse(JSON.stringify(this.value));
            },
            togglePercentages: function () {
                if (this.generating) {
                    this.generating = false;
                    window.clearInterval(this.interval);
                    this.interval = null;
                } else {
                    this.generating = true;
                    this.interval = window.setInterval(this.generatePercentages, 5000);
                }
            },
            generatePercentages: function () {
                let x = 100;
                for (let i = 0; i < this.value.options.length; ++i) {
                    if (this.value.options.hasOwnProperty(i)) {
                        let rand = Math.floor(Math.random() * (x + 1));
                        if (i === this.value.options.length - 1) {
                            this.value.options[i].percentage = x
                        } else {
                            this.value.options[i].percentage = rand;
                            x = x - rand;
                        }
                    }
                }
            },

        },
        computed: {
            binding() {
                const binding = {};

                if (this.$vuetify.breakpoint.mdAndDown) binding.column = true;

                return binding
            }
        }
    }
</script>

<style scoped>

</style>