<template>
    <v-container>
        <v-row justify="center" align="center" class="mb-4">
            <v-col cols="12" sm="8" md="6" lg="4">
                <v-btn color="success" @click.stop="showNewVehicleDialog" block>Agregar Nuevo Vehículo</v-btn>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col v-for="vehicle in vehicles" :key="vehicle.id" cols="12" sm="6" md="4" lg="4">
                <v-card class="mx-auto" max-width="344" outlined>
                    <v-list-item two-line>
                        <v-list-item-content>
                            <div class="overline mb-2">{{ vehicle.vehiclePatent }}</div>
                            <v-list-item-title class="headline mb-1">{{ vehicle.vehicleModel }}</v-list-item-title>
                            <v-list-item-subtitle>{{ vehicle.vehicleBrand }}</v-list-item-subtitle>
                            <v-list-item-subtitle>driver: {{ vehicle.driver.driverName }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn icon @click.stop="showDetailsDialog(vehicle)">
                                <v-icon>mdi-eye</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>
        <div v-if="dialogVisible" max-width="500">
            <ExpirationDialog :selectedVehicle="selectedVehicle" @hide="hideDialog" />
        </div>
        <div v-if="newVehicleDialogVisible" max-width="500">
            <NewVehicleDialog @hide="hideDialogNewVehicle" />
        </div>
    </v-container>
</template>

<script>
import ExpirationDialog from "./ExpirationDialog.vue";
import NewVehicleDialog from "./NewVehicleDialog.vue";
import { getDocuments } from "../firebase/FirebaseServices.js";

export default {
    name: "HomeView",
    components: {
        ExpirationDialog,
        NewVehicleDialog
    },
    data() {
        return {
            vehicles: [],
            dialogVisible: false,
            newVehicleDialogVisible: false,
            selectedVehicle: null
        };
    },
    async created() {
        await this.GetVehicles();
    },
    methods: {
        async GetVehicles() {
            this.ShowProcessingDialog();
            this.vehicles = await getDocuments("vehicles");
            this.HideProcessingDialog();
        },
        showDetailsDialog(vehicle) {
            this.dialogVisible = true;
            this.selectedVehicle = vehicle;
        },
        hideDialog() {
            this.dialogVisible = false;
            this.GetVehicles();
        },
        showNewVehicleDialog() {
            this.newVehicleDialogVisible = true;
        },
        hideDialogNewVehicle() {
            this.newVehicleDialogVisible = false;
            this.GetVehicles();
        }
    }
};
</script>

<style scoped>
/* Estilos específicos para el componente HomeView */
</style>