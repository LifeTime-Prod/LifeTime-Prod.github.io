import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc, collection } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { firestore } from '../js/firebase_init.js'; // Import the initialized Firestore instance

// Users
export async function addUser(userId, userData) {
    await setDoc(doc(firestore, 'users', userId), userData);
}

export async function getUser(userId) {
    const userDoc = await getDoc(doc(firestore, 'users', userId));
    return userDoc.exists() ? userDoc.data() : null;
}

export async function updateUser(userId, userData) {
    await updateDoc(doc(firestore, 'users', userId), userData);
}

export async function deleteUser(userId) {
    await deleteDoc(doc(firestore, 'users', userId));
}

// Schedules
export async function addSchedule(scheduleId, scheduleData) {
    await setDoc(doc(firestore, 'schedules', scheduleId), scheduleData);
}

export async function getSchedule(scheduleId) {
    const scheduleDoc = await getDoc(doc(firestore, 'schedules', scheduleId));
    return scheduleDoc.exists() ? scheduleDoc.data() : null;
}

export async function updateSchedule(scheduleId, scheduleData) {
    await updateDoc(doc(firestore, 'schedules', scheduleId), scheduleData);
}

export async function deleteSchedule(scheduleId) {
    await deleteDoc(doc(firestore, 'schedules', scheduleId));
}

// Activities
export async function addActivity(activityId, activityData) {
    await setDoc(doc(firestore, 'activities', activityId), activityData);
}

export async function getActivity(activityId) {
    const activityDoc = await getDoc(doc(firestore, 'activities', activityId));
    return activityDoc.exists() ? activityDoc.data() : null;
}

export async function updateActivity(activityId, activityData) {
    await updateDoc(doc(firestore, 'activities', activityId), activityData);
}

export async function deleteActivity(activityId) {
    await deleteDoc(doc(firestore, 'activities', activityId));
}

// Health Performances
export async function addHealthPerformance(healthPerformanceId, healthPerformanceData) {
    await setDoc(doc(firestore, 'healthPerformances', healthPerformanceId), healthPerformanceData);
}

export async function getHealthPerformance(healthPerformanceId) {
    const healthPerformanceDoc = await getDoc(doc(firestore, 'healthPerformances', healthPerformanceId));
    return healthPerformanceDoc.exists() ? healthPerformanceDoc.data() : null;
}

export async function updateHealthPerformance(healthPerformanceId, healthPerformanceData) {
    await updateDoc(doc(firestore, 'healthPerformances', healthPerformanceId), healthPerformanceData);
}

export async function deleteHealthPerformance(healthPerformanceId) {
    await deleteDoc(doc(firestore, 'healthPerformances', healthPerformanceId));
}

// Monthly Reviews
export async function addMonthlyReview(monthlyReviewId, monthlyReviewData) {
    await setDoc(doc(firestore, 'monthlyReviews', monthlyReviewId), monthlyReviewData);
}

export async function getMonthlyReview(monthlyReviewId) {
    const monthlyReviewDoc = await getDoc(doc(firestore, 'monthlyReviews', monthlyReviewId));
    return monthlyReviewDoc.exists() ? monthlyReviewDoc.data() : null;
}

export async function updateMonthlyReview(monthlyReviewId, monthlyReviewData) {
    await updateDoc(doc(firestore, 'monthlyReviews', monthlyReviewId), monthlyReviewData);
}

export async function deleteMonthlyReview(monthlyReviewId) {
    await deleteDoc(doc(firestore, 'monthlyReviews', monthlyReviewId));
}

// Life Overviews
export async function addLifeOverview(lifeOverviewId, lifeOverviewData) {
    await setDoc(doc(firestore, 'lifeOverviews', lifeOverviewId), lifeOverviewData);
}

export async function getLifeOverview(lifeOverviewId) {
    const lifeOverviewDoc = await getDoc(doc(firestore, 'lifeOverviews', lifeOverviewId));
    return lifeOverviewDoc.exists() ? lifeOverviewDoc.data() : null;
}

export async function updateLifeOverview(lifeOverviewId, lifeOverviewData) {
    await updateDoc(doc(firestore, 'lifeOverviews', lifeOverviewId), lifeOverviewData);
}

export async function deleteLifeOverview(lifeOverviewId) {
    await deleteDoc(doc(firestore, 'lifeOverviews', lifeOverviewId));
}