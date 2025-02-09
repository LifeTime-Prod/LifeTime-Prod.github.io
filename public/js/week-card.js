import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc, collection, query, where, getDocs, onSnapshot, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { firestore } from '../js/firebase_init.js';

// export async function getCurrentWeekSchedule(userId) {
//     const currentWeek = {};
//     const today = new Date();
//     const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Monday
//     const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7)); // Sunday

//     const schedulesRef = collection(firestore, 'schedules');
//     const q = query(schedulesRef, where('uid', '==', userId), where('date', '>=', firstDayOfWeek), where('date', '<=', lastDayOfWeek));
//     const querySnapshot = await getDocs(q);

//     querySnapshot.forEach((doc) => {
//         currentWeek[doc.id] = doc.data();
//     });

//     return currentWeek;
// }

// export async function getCurrentWeekSchedule(userId) {
//     const currentWeek = {};
//     const today = new Date();
//     const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1))); // Monday
//     const lastDayOfWeek = new Date(firstDayOfWeek);
//     lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6); // Sunday

//     firstDayOfWeek.setHours(0, 0, 0, 0);
//     lastDayOfWeek.setHours(23, 59, 59, 999);

//     console.log('Fetching schedules for user:', userId);
//     console.log('Date range:', firstDayOfWeek, 'to', lastDayOfWeek);

//     const schedulesRef = collection(firestore, 'schedules');
//     const q = query(
//         schedulesRef,
//         where('userId', '==', userId),
//         where('date', '>=', firstDayOfWeek),
//         where('date', '<=', lastDayOfWeek)
//     );

//     try {
//         const querySnapshot = await getDocs(q);
//         console.log('Number of documents retrieved:', querySnapshot.size);

//         if (querySnapshot.empty) {
//             console.log('No matching documents found');
//             return currentWeek;
//         }

//         for (const doc of querySnapshot.docs) {
//             const scheduleData = doc.data();
//             console.log('Document data:', scheduleData);

//             if (!scheduleData.date) {
//                 console.log('Warning: Document missing date field:', doc.id);
//                 continue;
//             }

//             const scheduleDate = scheduleData.date.toDate();
//             const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][scheduleDate.getDay()];
            
//             currentWeek[dayOfWeek] = {
//                 id: doc.id,
//                 ...scheduleData
//             };
//         }

//         console.log('Processed week schedule:', currentWeek);
//         return currentWeek;
//     } catch (error) {
//         console.error('Error fetching schedules:', error);
//         throw error;
//     }
// }

export async function getCurrentWeekSchedule(userId) {
    const currentWeek = {};
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1))); // Monday
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6); // Sunday

    firstDayOfWeek.setHours(0, 0, 0, 0);
    lastDayOfWeek.setHours(23, 59, 59, 999);

    console.log('Fetching schedules for user:', userId);
    console.log('Date range:', firstDayOfWeek, 'to', lastDayOfWeek);

    const schedulesRef = collection(firestore, 'schedules');
    const scheduleDocRef = doc(schedulesRef, userId); // this works
    getDoc(scheduleDocRef).then((doc) => {
        console.log('Schedule document data:', doc.data());
        const scheduleData = doc.data();
        if (scheduleData && scheduleData.scheduleData && scheduleData.scheduleData.events) {
            scheduleData.scheduleData.events.forEach((event) => {
            const eventDate = event.date.toDate();
            if (eventDate >= firstDayOfWeek && eventDate <= lastDayOfWeek) {
                const dayOfWeek = eventDate.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
                if (!currentWeek[dayOfWeek]) {
                currentWeek[dayOfWeek] = [];
                }
                currentWeek[dayOfWeek].push(event);
            }
            });
        }
        });

    return currentWeek;

    // try {
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         const scheduleData = doc.data();
    //         if (scheduleData.scheduleData && scheduleData.scheduleData.events) {
    //             scheduleData.scheduleData.events.forEach((event) => {
    //                 const eventDate = event.date.toDate();
    //                 if (eventDate >= firstDayOfWeek && eventDate <= lastDayOfWeek) {
    //                     const dayOfWeek = eventDate.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
    //                     if (!currentWeek[dayOfWeek]) {
    //                         currentWeek[dayOfWeek] = [];
    //                     }
    //                     currentWeek[dayOfWeek].push(event);
    //                 }
    //             });
    //         }
    //     });

    //     console.log('Current week schedule:', currentWeek);
    //     return currentWeek;
    // } catch (error) {
    //     console.error('Error fetching current week schedule:', error);
    //     return {};
    // }
}

export function createWeekScheduleCard(frontTitle, frontText, backTitle, backText) {
    const dayCard = $('<div>', { class: 'card' });
    const flipCard = $('<div>', { class: 'flip-card' });
    const flipCardInner = $('<div>', { class: 'flip-card-inner' });
    const flipCardFront = $('<div>', { class: 'flip-card-front' });
    const flipCardBack = $('<div>', { class: 'flip-card-back' });

    const frontTitleElement = $('<p>', { class: 'title', text: frontTitle });
    const frontTextElement = $('<p>', { text: frontText });
    const backTitleElement = $('<p>', { class: 'title', text: backTitle });
    const backTextElement = $('<p>', { text: backText });

    flipCardFront.append(frontTitleElement, frontTextElement);
    flipCardBack.append(backTitleElement, backTextElement);
    flipCardInner.append(flipCardFront, flipCardBack);
    flipCard.append(flipCardInner);
    dayCard.append(flipCard);

    return dayCard;
}

// From Uiverse.io by joe-watson-sbf