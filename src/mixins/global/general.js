import { mapGetters, mapActions } from "vuex";

export default {
    methods: {
        ...mapActions("processingDialogStore", ["showProcessing", "hideProcessing"]),
        async ShowProcessingDialog() {
            await this.showProcessing();
        },
        async HideProcessingDialog() {
            await this.hideProcessing();
        }
    },
    computed: {
        ...mapGetters("processingDialogStore", ["processingDialogVisibility"]),
    },
};