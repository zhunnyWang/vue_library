<template>
    <div>
        <label>{{ label }}</label>
        <div>
            <slot></slot>
            <p v-if="erroStatus">{{ erroMessage }}</p>
        </div>
    </div>
</template>

<script>
    import Schema from 'async-validator';
    export default {
        inject:['KForm'],
        props: {
            label: {
                type: String,
                default: ""
            },
            prop:{
                type: String,
                default:""
            }
        },
        data() {
            return {
                erroMessage: "",
                erroStatus:true
            }
        },
        mounted() {
            this.$on('validate', this.validator);
        },
        methods: {
            validator() {
                const rules = this.KForm.rules[this.prop];
                const value = this.KForm.model[this.prop];
                const descriptor = {[this.prop]: rules};
                const schema = new Schema(descriptor);

                schema.validate({[this.prop]:value},errors =>{
                    if(errors){
                        this.erroMessage = errors[0].message;
                        this.erroStatus = true;
                    }
                    else{
                        this.erroMessage = "";
                        this.erroStatus = false;
                    }
                })
                
            }
        },
    }
</script>

<style scoped>

</style>