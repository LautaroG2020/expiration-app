export default {
    namespaced: true,
    state: {
        processing: false,
    },
    getters: {
        processing: (state) => state.processing,
        processingDialogVisibility: (state) => state.processing,
    },
    mutations: {
        setProcessing(state, value) {
            state.processing = value;
        },
    },
    actions: {
        showProcessing({ commit }) {
            commit("setProcessing", true);
        },
        hideProcessing({ commit }) {
            commit("setProcessing", false);
        },
    }

};
