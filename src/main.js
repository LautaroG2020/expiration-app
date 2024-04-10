import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { LoadGlobalComponents } from "./components/global/global-components.js";
import "sweetalert2/dist/sweetalert2.min.css";
import { checkExpirations } from "./firebase/FirebaseServices";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

Vue.config.productionTip = false;

import mixinGeneral from "./mixins/global/general";
Vue.mixin(mixinGeneral);

LoadGlobalComponents(Vue);
const appVue = new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App); },
  created() {
    setInterval(() => {
      checkExpirations();
    }, 3600000); // 3600000 milisegundos = 1 hora
  }
}).$mount("#app");

export { appVue };