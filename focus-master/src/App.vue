<template>
    <v-app :dark="dark">
        <v-layout wrap id="app" style="overflow: hidden">
            <v-toolbar fixed app>
                <v-toolbar-side-icon @click="openDrawer">
                    <v-icon>menu</v-icon>
                </v-toolbar-side-icon>
                <v-toolbar-title>FOCUS</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-navigation-drawer app :mini-variant="mini" v-model="drawer">
                <v-list class="pa-0">
                    <v-list-tile v-if="mini" @click.stop="mini = !mini">
                        <v-list-tile-action>
                            <v-icon>chevron_right</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img src="https://randomuser.me/api/portraits/men/20.jpg" alt="Your Thumbnail">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            Teacher Name
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-btn icon @click.stop="closeDrawer()">
                                <v-icon>chevron_left</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
                <v-divider></v-divider>
                <v-list class="pt-0" dense>

                    <v-list-tile @click="0">
                        <v-list-tile-action>
                            <v-icon>settings</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>Settings</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile @click="0">
                        <v-list-tile-action>
                            <v-icon>people</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>Manage Students</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile @click="0">
                        <v-list-tile-action>
                            <v-icon>power_settings_new</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>Log Out</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile @click="changeTheme">
                        <v-list-tile-action>
                            <v-icon>invert_colors</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>Switch Theme</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>


                </v-list>
            </v-navigation-drawer>

            <v-content style="overflow:hidden;">
                <v-container class="pa-0" fill-height fluid style="overflow: hidden;">
                    <v-layout row style="overflow:hidden">
                        <v-flex xs4 class="column" align-start>
                            <v-container class="pa-0 ma-0" align-start fill-height>
                                <v-layout style="overflow:auto">
                                    <students-viewer>

                                    </students-viewer>
                                </v-layout>
                            </v-container>
                        </v-flex>
                        <v-flex xs8 class="column" style="height: 100vh;">
                            <v-layout @contextmenu.prevent="$refs.menu.open" style="padding-bottom: 50px;" column>
                                <component v-for="item in newFeedItems" :key="item.base.id" :is="item.base.type" v-bind="{value: item}"></component>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-content>

            <v-dialog v-model="editor" persistent max-width="600px">
                <v-card>
                    <v-card-title>Add Item</v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-text-field v-if="editor" label="Title" v-model="tempModel.base.title"></v-text-field>
                            <v-switch v-if="editor" v-model="tempModel.base.cardEnabled" label="Enabled"></v-switch>
                            <v-divider></v-divider>
                            <component :is="this.editorType" v-bind="{value: this.tempModel}"></component>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat @click="editor=false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="pushToFeed">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-speed-dial absolute color="primary" bottom right style="bottom: 40px; right: 25px;" open-on-hover
                          v-model="fab"
                          transition="slide-y-reverse-transition">
                <template v-slot:activator>
                    <v-btn color="primary" v-model="fab" fab :dark="dark">
                        <v-icon>add</v-icon>
                        <v-icon>close</v-icon>
                    </v-btn>
                </template>

                <v-tooltip :value="true" :v-model="fab" left v-for="(btn, index) in fabButtons">
                    <template v-slot:activator="{on}">
                        <v-btn fab small :dark="dark" @click="addItem(btn.label)">
                            <v-icon>{{btn.icon}}</v-icon>
                        </v-btn>
                    </template>
                    <span>{{btn.label}}</span>
                </v-tooltip>

            </v-speed-dial>

        </v-layout>
        <vue-context ref="menu" v-bind:style="bg">
            <ul  >
                <li @click="onClick($event.target.innerText)" class="context-item">
                    Video
                </li>
                <li @click="onClick($event.target.innerText)" class="context-item">
                    Poll
                </li>
                <li @click="onClick($event.target.innerText)" class="context-item">
                    Text
                </li>
                <li @click="onClick($event.target.innerText)" class="context-item">
                    Link
                </li>
            </ul>
        </vue-context>
    </v-app>
</template>


<script>

    // noinspection NpmUsedModulesInstalled (webstorm doesn't recognize the syntax)
    import StudentsViewer from "@/components/StudentsViewer";
    import PollDialog from "./dialogs/PollDialog";
    import VideoDialog from "./dialogs/VideoDialog";
    import LinkDialog from "./dialogs/LinkDialog";
    import TextDialog from "./dialogs/TextDialog";
    import TextCard from "./cards/TextCard";
    import PollCard from "./cards/PollCard";
    import VideoCard from "./cards/VideoCard";
    import LinkCard from "./cards/LinkCard";
    import {VueContext} from "vue-context";

    import TextEditor from "./editors/TextEditor";
    import PollEditor from "./editors/PollEditor";
    import VideoEditor from "./editors/VideoEditor";
    import LinkEditor from "./editors/LinkEditor";

    export default {
        name: 'app',
        components: {
            LinkCard,
            VideoCard,
            PollCard,
            TextDialog,
            LinkDialog,
            VideoDialog,
            PollDialog,
            StudentsViewer,
            TextEditor,
            PollEditor,
            VideoEditor,
            LinkEditor,
            TextCard,
            VueContext
        },
        computed:{
            newFeedItems(){
                return this.$store.state.feedItems;
            }
        },
        methods: {
            changeTheme(){
                this.dark = !this.dark;
                this.$root.$emit('theme-change', this.dark);
            },
            openDrawer: function () {
                if (window.innerWidth >= 1264) {
                    this.mini = !this.mini;
                    this.drawer = true;
                } else {
                    this.mini = false;
                    this.drawer = true;
                }

            },
            closeDrawer: function () {
                if (window.innerWidth >= 1264) {
                    this.mini = true;
                } else {
                    this.drawer = false;
                }
            },
            pushToFeed: function(){
                this.$store.commit('addToFeed', this.tempModel);
                this.tempModel = {};
                this.editor = false;
            },
            addItem: function (type) {
                switch (type) {
                    case 'Text':
                        this.tempModel = {
                            base:{
                                type: "text-card",
                                cardEnabled: false,
                                title: "Text",
                                icon: "textsms"
                            },
                            content: ""
                        }
                        this.editorType="text-editor"
                        this.editor = true;
                        break;
                    case 'Poll':
                        this.tempModel={
                            base:{
                                type: "poll-card",
                                cardEnabled: true,
                                title: "Poll",
                                icon: "poll"
                            },
                            pollingEnabled: true,
                            question: "",
                            options:[{
                                option: "Option 1",
                                percentage: null
                            },{
                                option: "Option 2",
                                percentage: null
                            }]
                        }
                        this.editorType = "poll-editor";
                        this.editor=true;
                        break;
                    case 'Video':
                        this.tempModel={
                            base:{
                                type: "video-card",
                                cardEnabled: true,
                                title: "Video",
                                icon: "ondemand_video"
                            },
                            url: "",
                            embedUrl: ""
                        }
                        this.editorType = "video-editor";
                        this.editor = true;
                        break;
                    case 'Link':
                        this.tempModel = {
                            base:{
                                type:"link-card",
                                cardEnabled: true,
                                title: "Link",
                                icon: "link"
                            },
                            url: ""
                        }
                        this.editorType="link-editor";
                        this.editor=true;
                        break;
                }

            },
            onClick: function(text){
                this.addItem(text);
            }
        },
        created: function () {},
        mounted() {
            let self = this;
            this.$root.$on('theme-change', function(dark){
                self.bg.background = (dark) ? '#424242' : '#fff';
            });
        },
        data() {
            return {
                bg: {
                    background: '#424242'
                },
                mini: true,
                drawer: true,
                t: true,
                dark: true,
                show: false,
                fab: false,
                editor: false,
                editorType: "",
                tempModel:{base: null},
                fabButtons: [
                    {
                        label: "Poll",
                        icon: "poll",
                    },
                    {
                        label: "Video",
                        icon: "ondemand_video"
                    },
                    {
                        label: "Text",
                        icon: "textsms"
                    },
                    {
                        label: "Link",
                        icon: "link"
                    }
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
    $xs: 600px;
    $sm: 960px;
    $md: 1264px;
    $lg: 1904px;

    .nav-bottom {
        height: calc(100vh - 70px)
    }

    .column {
        height: calc(100vh - 64px);
        @media screen and (max-width: $sm) and (orientation: portrait) {
            height: calc(100vh - 56px);
        }
        @media screen and (max-width: $sm) {
            height: calc(100vh - 48px);
        }
        display: flex;
        flex: 1;
        overflow: auto;
    }

    .align-start-col {
        align-content: start !important;
    }

    .hide {
        opacity: 0
    }

    #app {
        height: 100%;
        font-family: 'Roboto', sans-serif;
    }

    .context-item{
        border-bottom: 1px solid darkgray;
    }

</style>
