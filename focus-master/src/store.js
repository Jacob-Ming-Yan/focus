import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let BasicInfo = {
    id: Number, //auto assigned
    type: String,
    cardEnabled: Boolean,
    title: String,
    icon: String
};

// eslint-disable-next-line no-unused-vars
let textModel = {
    base: BasicInfo,
    content: String
};

// eslint-disable-next-line no-unused-vars
let linkModel = {
    base: BasicInfo,
    url: String
};

// eslint-disable-next-line no-unused-vars
let videoModel = {
    base: BasicInfo,
    url: String,
    embedUrl: String
};

// eslint-disable-next-line no-unused-vars
let pollModel = {
    base: BasicInfo,
    pollingEnabled: Boolean,
    question: String,
    options: [
        {
            option: String,
            percentage: Number
        }
    ]
};

export default new Vuex.Store({
    state: {
        count: 2,
        students: [],
        feedItems: [
            {
                base: {
                    id: 0,
                    type: "text-card",
                    cardEnabled: true,
                    title: "Text!",
                    icon: "textsms"
                },
                content: "This is some text!"
            },
            {
                base: {
                    id: 1,
                    type: "video-card",
                    cardEnabled: true,
                    title: "Video!",
                    icon: "ondemand_video"
                },
                url: 'https://www.youtube.com/watch?v=cif0Cm38yDI',
                embedUrl: 'https://www.youtube.com/embed/cif0Cm38yDI'
            }
        ]
    },
    mutations: {
        increment(state) {
            state.count++;
        },
        addStudent(state, student) {
            state.students.push(student)
        },
        makeStudentPresent(state, id) {
            state.students.find(x => x.id === id).status = 'Present';
        },
        clearStudents(state) {
            state.students = [];
        },
        addToFeed(state, model) {
            model.base.id = state.count;
            state.count++;
            state.feedItems.push(model)
        },
        saveChanges(state, item) {
            let id = item.base.id;
            let index = state.feedItems.findIndex(x => x.base.id === id);
            if (index >= 0) {
                state.feedItems.splice(index, 1, item);
                // state.feedItems[index] = item
            }
        },
        moveUp(state, item) {
            let srcId = item.id;
            let srcIndex = state.feedItems.findIndex(x => x.base.id === srcId);
            let destIndex = srcIndex - 1;
            if (destIndex > -1) {
                let src = state.feedItems[srcIndex];
                let dest = state.feedItems[destIndex];
                state.feedItems.splice(destIndex, 2, src, dest)
            }
        },
        moveDown(state, item) {
            let srcId = item.id;
            let srcIndex = state.feedItems.findIndex(x => x.base.id === srcId);
            let destIndex = srcIndex + 1;
            if (destIndex < state.feedItems.length) {
                let src = state.feedItems[srcIndex];
                let dest = state.feedItems[destIndex];
                state.feedItems.splice(srcIndex, 2, dest, src)
            }
        },
        deleteItem(state, item) {
            let index = state.feedItems.findIndex(x => x.base.id === item.id);
            state.feedItems.splice(index, 1);
        },
        toggleItem(state, item) {
            let obj = state.feedItems.find(x => x.base.id === item.id);
            obj.base.cardEnabled = !item.cardEnabled;
        }
    },
    getters: {
        getFeedItemById: (state) => (id) => {
            state.feedItems.find(x => x.id === id);
        },
        isLast: (state) => (item) => {
            if (state.feedItems.length > 0) {
                let id = item.id;
                return state.feedItems[state.feedItems.length - 1].base.id === id;
            }
            return false;
        },
        isFirst: (state) => (item) => {
            if (state.feedItems.length > 0) {
                return state.feedItems[0].base.id === item.id;
            }
            return false;
        }
    },
    //put async stuff here. Use store.dispatch to call.
    actions: {}
});