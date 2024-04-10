<template>
    <v-dialog v-model="processing" persistent width="300">
        <v-card color="default" width="300">
            <v-card-text class="pt-3">
                <p class="mb-2 text-subtitle-1">
                    Aguarde un momento
                </p>
                <v-progress-linear indeterminate color="primary" class="mb-0" />
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        processing: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style></style>