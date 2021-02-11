Vue.component('errorComp', {
    data() {
        return {
            errorText: '',
            isError: false
        }
    },
    template: ` <div class="error" v-show="isError">
                    <p>{{errorText}}</p>
                </div>`,
    methods: {
        showError(text) {
            isError = !isError;
            this.errorText = text;
        }
    }
});
