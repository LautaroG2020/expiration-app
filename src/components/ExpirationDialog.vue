<template>
  <v-dialog v-model="dialog" max-width="650" persistent v-if="vehicle">
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        <div>Vehículo: {{ vehicle.vehicleBrand }} {{ vehicle.vehicleModel }}</div>
        <v-btn color="primary" @click="AddNewExpire">Agregar Vencimiento</v-btn>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="(expire, index) in vehicle.expires" :key="index">
              <template v-slot:default>
                <v-list-item-content>
                  <v-list-item-title>{{ expire.decription }}</v-list-item-title>
                  <v-list-item-subtitle>{{ expire.dateExpire }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                      <v-btn color="warning" v-on="on">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <v-date-picker v-model="newSelectedDate" :value="expire.dateExpire"
                      @input="UpdateEditedDate($event, expire)" locale="es"></v-date-picker>
                  </v-menu>
                  <div class="mt-1">
                    <v-btn color="error" @click="DeleteExpire(index)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-list-item-group v-if="showAddForm">
          <v-list-item>
            <v-col cols="6">
              <v-text-field v-model="newExpiration.decription" label="Descripción"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="newExpiration.dateExpire" label="Fecha" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="newExpiration.dateExpire" locale="es"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="2">
              <v-btn @click.stop="SaveNewExpiration()"
                :disabled="!newExpiration.decription || !newExpiration.dateExpire" color="primary">
                Agregar
              </v-btn>
            </v-col>
          </v-list-item>
        </v-list-item-group>
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" @click="HideExpireDialog()">
          Cerrar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="changesMade" color="success" @click="SaveNewChanges()">
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { updateDocument } from "../firebase/FirebaseServices.js";
import { NotifyError, NotifyOk } from "../helpers/notification.helper.js";
export default {
  props: {
    selectedVehicle: Object
  },
  data() {
    return {
      dialog: true,
      newSelectedDate: null,
      vehicle: null,
      showAddForm: false,
      newExpiration: {
        decription: "",
        dateExpire: null
      },
      originalData: null
    };
  },
  mounted() {
    this.vehicle = this.selectedVehicle;
    this.originalData = JSON.parse(JSON.stringify(this.selectedVehicle));
  },
  computed: {
    changesMade() {
      return JSON.stringify(this.vehicle) !== JSON.stringify(this.originalData);
    }
  },
  methods: {
    UpdateEditedDate(newValue, expire) {
      console.log(this.vehicle, this.selectedVehicle);
      expire.dateExpire = newValue;
    },
    async SaveNewChanges() {
      this.ShowProcessingDialog();
      try {
        await updateDocument("vehicles", this.vehicle.id, this.vehicle);
        NotifyOk("Cambios guardados correctamente");
      } catch (error) {
        NotifyError("Error al guardar cambios", error);
      }
      this.ShowProcessingDialog();
      this.$emit("hide");
      this.dialog = false;
    },
    HideExpireDialog() {
      this.$emit("hide");
      this.vehicle = {};
    },
    AddNewExpire() {
      this.showAddForm = true;
    },
    SaveNewExpiration() {
      if (this.newExpiration.decription && this.newExpiration.dateExpire) {
        this.vehicle.expires.push({ ...this.newExpiration });
        this.showAddForm = false;
        this.newExpiration = {
          decription: "",
          dateExpire: null
        };
      }
    },
    DeleteExpire(index) {
      this.vehicle.expires.splice(index, 1);
    }
  }
};
</script>
