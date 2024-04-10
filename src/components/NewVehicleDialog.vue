<template>
    <v-dialog v-model="dialog" max-width="600" persistent>
        <v-card>
            <v-card-title class="headline">
                Agregar Nuevo Vehículo
            </v-card-title>
            <v-card-text>
                <v-form ref="form" @submit.prevent="AddNewVehicle">
                    <v-text-field v-model="newVehicle.vehiclePatent" label="vehiclePatent"></v-text-field>
                    <v-text-field v-model="newVehicle.vehicleBrand" label="vehicleBrand"></v-text-field>
                    <v-text-field v-model="newVehicle.vehicleModel" label="vehicleModel"></v-text-field>
                    <v-text-field v-model="newVehicle.driver.driverName" label="driverName del driver"></v-text-field>
                    <v-text-field v-model="newVehicle.driver.dni" label="DNI del driver"></v-text-field>

                    <v-divider class="mt-4 mb-2"></v-divider>

                    <v-row v-for="(vencimiento, index) in newVehicle.expires" :key="index">
                        <v-col cols="6">
                            <v-text-field v-model="vencimiento.description"
                                :label="'Descripción ' + (index + 1)"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-menu offset-y>
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="vencimiento.dateExpire" :label="'Fecha ' + (index + 1)"
                                        readonly v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="vencimiento.dateExpire" locale="es"></v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                </v-form>
                <v-btn class="text-end" @click="AddNewExpiration()">Agregar Vencimiento</v-btn>
            </v-card-text>
            <v-card-actions>
                <v-btn color="secondary" @click="HideNewVehicleDialog()">Cancelar</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="AddNewVehicle()">Guardar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { addDocument } from "../firebase/FirebaseServices.js";
import { NotifyOk } from "../helpers/notification.helper.js";
export default {
    data() {
        return {
            dialog: true,
            newVehicle: {
                vehiclePatent: "",
                vehicleBrand: "",
                vehicleModel: "",
                driver: {
                    driverName: "",
                    dni: ""
                },
                expires: [
                    {
                        description: "",
                        dateExpire: null
                    }
                ]
            }
        };
    },
    methods: {
        async AddNewVehicle() {
            this.ShowProcessingDialog();
            try {
                await addDocument("vehicles", this.newVehicle);
                NotifyOk("Vehículo agregado correctamente", "Nuevo Vehículo", () => this.$emit("hide"));
            } catch (error) {
                console.error("Error al agregar nuevo vehículo:", error);
            }
            this.HideProcessingDialog();
        },
        HideNewVehicleDialog() {
            this.dialog = false;
            this.$emit("hide");
        },
        AddNewExpiration() {
            this.newVehicle.expires.push({
                description: "",
                dateExpire: null
            });
        }
    }
};
</script>

<style scoped></style>