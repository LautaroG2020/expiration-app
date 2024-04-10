<template>
    <v-container fluid>
        <v-card class="elevation-10">
            <v-card-title class="text-center">
                <h3 class="headline">Lista de Vehículos</h3>
            </v-card-title>
            <v-card-text>
                <VechicleComponent />
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import VechicleComponent from "../../components/VechicleComponent.vue";

export default {
    name: "HomeView",
    components: {
        VechicleComponent
    },
    data() {
        return {
        };
    },
    async created() {
    },
    methods: {
    }
};
</script>

<style scoped>
.v-container {
    padding: 0;
}

.v-card {
    max-width: 800px;
    margin: auto;
}

.v-card-title {
    margin-top: 15px;
    margin-bottom: 6px;
}
</style>