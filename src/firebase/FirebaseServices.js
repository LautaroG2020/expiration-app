import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { firestore } from "../main";

// Función para obtener documentos de una colección
export const getDocuments = async (collectionName) => {
    const documentsSnapshot = await getDocs(collection(firestore, collectionName));
    return documentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Función para agregar un documento a una colección
export const addDocument = async (collectionName, data) => {
    const docRef = await addDoc(collection(firestore, collectionName), data);
    return docRef.id;
};

// Función para actualizar un documento en una colección
export const updateDocument = async (collectionName, docId, data) => {
    await updateDoc(doc(firestore, collectionName, docId), data);
};

// Función para eliminar un documento de una colección
export const deleteDocument = async (collectionName, docId) => {
    await deleteDoc(doc(firestore, collectionName, docId));
};

export const checkExpirations = async () => {
    // Obtener la colección de vehículos
    const vehiclesCollection = collection(firestore, "vehicles");
    // Obtener los documentos de la colección
    const snapshot = await getDocs(vehiclesCollection);

    // Iterar sobre cada vehículo
    snapshot.forEach(doc => {
        const vehicleData = doc.data();
        // Iterar sobre cada vencimiento del vehículo
        vehicleData.expires.forEach(expiration => {
            // Obtener la fecha de vencimiento
            const expirationDate = new Date(expiration.dateExpire);
            // Obtener la fecha actual
            const currentDate = new Date();
            // Calcular la diferencia en días entre la fecha de vencimiento y la fecha actual
            const differenceInDays = Math.floor((expirationDate - currentDate) / (1000 * 60 * 60 * 24));
            // Verificar si faltan 7 días o menos para el vencimiento
            if (differenceInDays <= 7 && differenceInDays >= 0) {
                // Enviar notificación por correo electrónico
                sendNotification(vehicleData, expiration, differenceInDays);
            }
        });
    });
};

const sendNotification = (vehicleData, expiration) => {
    // Lógica para enviar un correo electrónico de notificación
    console.log(`Vencimiento ${expiration.description} para el vehículo ${vehicleData.vehicleBrand} ${vehicleData.vehicleModel} - Patente: ${vehicleData.vehiclePatent}`);
};