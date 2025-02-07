import { addHealthData, getHealthData, updateHealthData, deleteHealthData, checkHealthDataExists } from '../model/firestore_model.js';
import { auth } from '../js/firebase_init.js'; // Import the initialized auth

document.addEventListener('DOMContentLoaded', function() {
    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            console.error('User is not authenticated');
            return;
        }

        const userId = user.uid;
 // Check if health data exists
 const exists = await checkHealthDataExists(userId);
 console.log('Health data exists:', exists);

 if (!exists) {
     // Add health data if it does not exist
     const healthData = {
         height: 180,
         weight: 75
     };

     try {
         await addHealthData(userId, healthData);
         console.log('Health data added successfully');
     } catch (error) {
         console.error('Error adding health data:', error);
     }
 } else {
     // Perform other operations if health data exists

     // Example usage: Get health data for a user
     try {
         const data = await getHealthData(userId);
         console.log('Health data:', data);
     } catch (error) {
         console.error('Error getting health data:', error);
     }

     // Example usage: Update health data for a user
     const updatedHealthData = {
         height: 185,
         weight: 80
     };

     try {
         await updateHealthData(userId, updatedHealthData);
         console.log('Health data updated successfully');
     } catch (error) {
         console.error('Error updating health data:', error);
     }

    //  Example usage: Delete health data for a user
     try {
         await deleteHealthData(userId);
         console.log('Health data deleted successfully');
     } catch (error) {
         console.error('Error deleting health data:', error);
     }
 }
});
});