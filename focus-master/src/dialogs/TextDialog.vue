<template>
    <v-form
            ref="form"
            v-model="valid"
            lazy-validation
    >
        <v-text-field
                v-model="title"
                :counter="50"
                :rules="titleRules"
                label="Title" box
                required
        ></v-text-field>

        <v-textarea
                box
                v-model="textBox"
                name="input"
                label="Text"
                placeholder="Enter Text..."
                :rules="textBoxRules"
                required
        ></v-textarea>

        <div>
            <v-btn large color="primary"
                   @click="validate">

                OK</v-btn>
        </div>
    </v-form>
</template>

<script>
    export default {
        name: "TextDialog",

        data: () => ({
            valid: true,
            title: '',
            titleRules: [
                v => !!v || 'Title is required',
                v => (v && v.length <= 50) || 'Title must be less than 50 characters'
            ],

            textBox: '',
            textBoxRules: [
                v => !!v || 'Text is required'
            ]

        }),

        methods: {
            validate() {
                if (this.$refs.form.validate()) {
                    this.snackbar = true
                }
            }
        }
    }


</script>

<style scoped>

</style>