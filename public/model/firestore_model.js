import { firestore } from '../js/firebase_init.js'; // Import the initialized Firestore instance
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

async function addHealthData(userId, healthData) {
    try {
        const healthDocRef = doc(firestore, `users/${userId}/health`, 'attributes');
    
        console.log("Adding health data to:", healthDocRef.path);
    
        await setDoc(healthDocRef, healthData, { merge: true });
        console.log("Health data added successfully");
    } catch (error) {
        console.error("Error adding health data:", error);
    }
}

async function getHealthData(userId) {
    try {
        const healthDocRef = doc(firestore, `users/${userId}/health`, 'attributes');

        console.log("Getting health data from:", healthDocRef.path);

        const healthDoc = await getDoc(healthDocRef);
        if (healthDoc.exists()) {
            console.log("Health data:", healthDoc.data());
            return healthDoc.data();
        } else {
            console.log("No health data available");
            return null;
        }
    } catch (error) {
        console.error("Error getting health data:", error);
        return null;
    }
}

async function updateHealthData(userId, updatedData) {
    try {
        const healthDocRef = doc(firestore, `users/${userId}/health`, 'attributes');

        console.log("Updating health data at:", healthDocRef.path);

        await updateDoc(healthDocRef, updatedData);
        console.log("Health data updated successfully");
    } catch (error) {
        console.error("Error updating health data:", error);
    }
}

async function deleteHealthData(userId) {
    try {
        const healthDocRef = doc(firestore, `users/${userId}/health`, 'attributes');

        console.log("Deleting health data from:", healthDocRef.path);

        await deleteDoc(healthDocRef);
        console.log("Health data deleted successfully");
    } catch (error) {
        console.error("Error deleting health data:", error);
    }
}

async function checkHealthDataExists(userId) {
    try {
        const healthDocRef = doc(firestore, `users/${userId}/health/attributes`);
        console.log("Checking if health data exists at:", healthDocRef.path);
        const healthDoc = await getDoc(healthDocRef);
        return healthDoc.exists();
    } catch (error) {
        console.error("Error checking health data existence:", error);
        return false;
    }
}

export { addHealthData, getHealthData, updateHealthData, deleteHealthData, checkHealthDataExists };