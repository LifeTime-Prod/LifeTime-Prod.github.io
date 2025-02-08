import { auth } from '../js/firebase_init.js'; // Import the initialized auth
import { getCurrentWeekSchedule } from '../js/week-card.js';
import * as firestoreModel from '../model/firestore_model.js';

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event triggered');
    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            console.error('User is not authenticated');
            return;
        }

        const userId = user.uid;

        // Example usage: Add or update a schedule
        const scheduleId = `${userId}_January_2025`;
        const newSchedule = {
            uid: userId,
            month: 'January',
            year: 2025,
            scheduleData: { events: [] }
        };

        try {
            const existingSchedule = await firestoreModel.getSchedule(scheduleId);
            if (existingSchedule) {
                await firestoreModel.updateSchedule(scheduleId, newSchedule);
                console.log('Schedule updated successfully');
            } else {
                await firestoreModel.addSchedule(scheduleId, newSchedule);
                console.log('Schedule added successfully');
            }
        } catch (error) {
            console.error('Error adding or updating schedule:', error);
        }

        // Example usage: Add or update an activity
        const activityId = `${userId}_activity_1`;
        const newActivity = {
            uid: userId,
            scheduleId: scheduleId,
            activityDate: new Date(),
            activityType: 'running',
            activityData: { duration: 30, distance: 5 }
        };

        try {
            const existingActivity = await firestoreModel.getActivity(activityId);
            if (existingActivity) {
                await firestoreModel.updateActivity(activityId, newActivity);
                console.log('Activity updated successfully');
            } else {
                await firestoreModel.addActivity(activityId, newActivity);
                console.log('Activity added successfully');
            }
        } catch (error) {
            console.error('Error adding or updating activity:', error);
        }

        // Example usage: Add or update health performance
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
            const existingHealthPerformance = await firestoreModel.getHealthPerformance(healthPerformanceId);
            if (existingHealthPerformance) {
                await firestoreModel.updateHealthPerformance(healthPerformanceId, newHealthPerformance);
                console.log('Health performance updated successfully');
            } else {
                await firestoreModel.addHealthPerformance(healthPerformanceId, newHealthPerformance);
                console.log('Health performance added successfully');
            }
        } catch (error) {
            console.error('Error adding or updating health performance:', error);
        }

        // Example usage: Add or update a monthly review
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
            const existingMonthlyReview = await firestoreModel.getMonthlyReview(monthlyReviewId);
            if (existingMonthlyReview) {
                await firestoreModel.updateMonthlyReview(monthlyReviewId, newMonthlyReview);
                console.log('Monthly review updated successfully');
            } else {
                await firestoreModel.addMonthlyReview(monthlyReviewId, newMonthlyReview);
                console.log('Monthly review added successfully');
            }
        } catch (error) {
            console.error('Error adding or updating monthly review:', error);
        }

        // Example usage: Add or update a life overview
        const lifeOverviewId = `${userId}_overview`;
        const newLifeOverview = {
            uid: userId,
            monthlyReviews: [monthlyReviewId]
        };

        try {
            const existingLifeOverview = await firestoreModel.getLifeOverview(lifeOverviewId);
            if (existingLifeOverview) {
                await firestoreModel.updateLifeOverview(lifeOverviewId, newLifeOverview);
                console.log('Life overview updated successfully');
            } else {
                await firestoreModel.addLifeOverview(lifeOverviewId, newLifeOverview);
                console.log('Life overview added successfully');
            }
        } catch (error) {
            console.error('Error adding or updating life overview:', error);
        }

         // Render and Fetch
        console.log('Rendering data...');

        renderDatas(scheduleId, activityId, healthPerformanceId, monthlyReviewId, lifeOverviewId, userId);
   
    });
});


async function renderDatas(scheduleId, activityId, healthPerformanceId, monthlyReviewId, lifeOverviewId, userId) {
    try {
        const fetchedSchedule = await firestoreModel.getSchedule(scheduleId);
        if (fetchedSchedule) {
            renderSchedule(fetchedSchedule);
        }

        const fetchedActivity = await firestoreModel.getActivity(activityId);
        if (fetchedActivity) {
            renderActivity(fetchedActivity);
        }

        const fetchedHealthPerformance = await firestoreModel.getHealthPerformance(healthPerformanceId);
        if (fetchedHealthPerformance) {
            renderHealthPerformance(fetchedHealthPerformance);
        }

        const fetchedMonthlyReview = await firestoreModel.getMonthlyReview(monthlyReviewId);
        if (fetchedMonthlyReview) {
            renderMonthlyReview(fetchedMonthlyReview);
        }

        const fetchedLifeOverview = await firestoreModel.getLifeOverview(lifeOverviewId);
        if (fetchedLifeOverview) {
            renderLifeOverview(fetchedLifeOverview);
        }

        const currentWeekSchedule = await getCurrentWeekSchedule(userId);
        renderCurrentWeekSchedule(currentWeekSchedule);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


// Render functions
function renderSchedule(schedule) {
    const scheduleContainer = document.querySelector('.schedule-container');
    if (scheduleContainer) {
        scheduleContainer.innerHTML = `
            <h2>Schedule for ${schedule.month} ${schedule.year}</h2>
            <pre>${JSON.stringify(schedule.scheduleData, null, 2)}</pre>
        `;
    }
}

function renderActivity(activity) {
    const activityContainer = document.querySelector('.activity-container');
    if (activityContainer) {
        const activityDate = activity.activityDate.toDate ? activity.activityDate.toDate() : new Date(activity.activityDate);
        activityContainer.innerHTML = `
            <h2>Activity on ${activityDate.toDateString()}</h2>
            <p>Type: ${activity.activityType}</p>
            <pre>${JSON.stringify(activity.activityData, null, 2)}</pre>
        `;
    }
}

function renderHealthPerformance(healthPerformance) {
    const healthPerformanceContainer = document.querySelector('.health-performance-container');
    if (healthPerformanceContainer) {
        healthPerformanceContainer.innerHTML = `
            <h2>Health Performance</h2>
            <p>Weight: ${healthPerformance.weight} kg</p>
            <p>Height: ${healthPerformance.height} cm</p>
            <p>BMI: ${healthPerformance.bmi}</p>
            <p>Risk of Sickness: ${healthPerformance.riskOfSickness}</p>
        `;
    }
}

function renderMonthlyReview(monthlyReview) {
    const monthlyReviewContainer = document.querySelector('.monthly-review-container');
    if (monthlyReviewContainer) {
        monthlyReviewContainer.innerHTML = `
            <h2>Monthly Review for ${monthlyReview.month} ${monthlyReview.year}</h2>
            <pre>${JSON.stringify(monthlyReview.activityList, null, 2)}</pre>
            <pre>${JSON.stringify(monthlyReview.scheduleData, null, 2)}</pre>
            <pre>${JSON.stringify(monthlyReview.healthPerformance, null, 2)}</pre>
        `;
    }
}

function renderLifeOverview(lifeOverview) {
    const lifeOverviewContainer = document.querySelector('.life-overview-container');
    if (lifeOverviewContainer) {
        lifeOverviewContainer.innerHTML = `
            <h2>Life Overview</h2>
            <pre>${JSON.stringify(lifeOverview.monthlyReviews, null, 2)}</pre>
        `;
    }
}

function renderCurrentWeekSchedule(currentWeekSchedule) {
    const weekScheduleContainer = document.querySelector('.week-schedule-container');
    if (weekScheduleContainer) {
        weekScheduleContainer.innerHTML = `
            <h2>Current Week Schedule</h2>
            <pre>${JSON.stringify(currentWeekSchedule, null, 2)}</pre>
        `;
    }
}