// import { addHealthData, getHealthData, updateHealthData, deleteHealthData, checkHealthDataExists } from '../model/firestore_model.js';
// import { auth } from '../js/firebase_init.js'; // Import the initialized auth

// document.addEventListener('DOMContentLoaded', function() {
//     auth.onAuthStateChanged(async (user) => {
//         if (!user) {
//             console.error('User is not authenticated');
//             return;
//         }

//         const userId = user.uid;
//  // Check if health data exists
//  const exists = await checkHealthDataExists(userId);
//  console.log('Health data exists:', exists);

//  if (!exists) {
//      // Add health data if it does not exist
//      const healthData = {
//          height: 180,
//          weight: 75
//      };

//      try {
//          await addHealthData(userId, healthData);
//          console.log('Health data added successfully');
//      } catch (error) {
//          console.error('Error adding health data:', error);
//      }
//  } else {
//      // Perform other operations if health data exists

//      // Example usage: Get health data for a user
//      try {
//          const data = await getHealthData(userId);
//          console.log('Health data:', data);
//      } catch (error) {
//          console.error('Error getting health data:', error);
//      }

//      // Example usage: Update health data for a user
//      const updatedHealthData = {
//          height: 185,
//          weight: 80
//      };

//      try {
//          await updateHealthData(userId, updatedHealthData);
//          console.log('Health data updated successfully');
//      } catch (error) {
//          console.error('Error updating health data:', error);
//      }

//     //  Example usage: Delete health data for a user
//      try {
//          await deleteHealthData(userId);
//          console.log('Health data deleted successfully');
//      } catch (error) {
//          console.error('Error deleting health data:', error);
//      }
//  }
// });
// });

import { auth } from '../js/firebase_init.js'; // Import the initialized auth
import * as firestoreModel from '../model/firestore_model.js';

document.addEventListener('DOMContentLoaded', function() {
    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            console.error('User is not authenticated');
            return;
        }

        const userId = user.uid;
        // Example usage: Add a schedule
        const scheduleId = `${userId}_January_2025`;
        const newSchedule = {
            uid: userId,
            month: 'January',
            year: 2025,
            scheduleData: { events: [] }
        };

        try {
            await firestoreModel.addSchedule(scheduleId, newSchedule);
            console.log('Schedule added successfully');
        } catch (error) {
            console.error('Error adding schedule:', error);
        }

        // Example usage: Add an activity
        const activityId = `${userId}_activity_1`;
        const newActivity = {
            uid: userId,
            scheduleId: scheduleId,
            activityDate: new Date(),
            activityType: 'running',
            activityData: { duration: 30, distance: 5 }
        };

        try {
            await firestoreModel.addActivity(activityId, newActivity);
            console.log('Activity added successfully');
        } catch (error) {
            console.error('Error adding activity:', error);
        }

        // Example usage: Add health performance
        const healthPerformanceId = `${userId}_health_1`;
        const newHealthPerformance = {
            uid: userId,
            scheduleId: scheduleId,
            weight: 75,
            height: 180,
            bmi: 23.1,
            riskOfSickness: 0.1
        };

        try {
            await firestoreModel.addHealthPerformance(healthPerformanceId, newHealthPerformance);
            console.log('Health performance added successfully');
        } catch (error) {
            console.error('Error adding health performance:', error);
        }

        // Example usage: Add a monthly review
        const monthlyReviewId = `${userId}_review_January_2025`;
        const newMonthlyReview = {
            uid: userId,
            month: 'January',
            year: 2025,
            activityList: [newActivity],
            scheduleData: newSchedule.scheduleData,
            healthPerformance: newHealthPerformance
        };

        try {
            await firestoreModel.addMonthlyReview(monthlyReviewId, newMonthlyReview);
            console.log('Monthly review added successfully');
        } catch (error) {
            console.error('Error adding monthly review:', error);
        }

        // Example usage: Add a life overview
        const lifeOverviewId = `${userId}_overview`;
        const newLifeOverview = {
            uid: userId,
            monthlyReviews: [monthlyReviewId]
        };

        try {
            await firestoreModel.addLifeOverview(lifeOverviewId, newLifeOverview);
            console.log('Life overview added successfully');
        } catch (error) {
            console.error('Error adding life overview:', error);
        }
    });
});