import { firestore } from '../js/firebase_init.js';
import { getDocs, query, collection, where } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

export async function getCurrentWeekSchedule(userId) {
    const currentWeek = {};
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Monday
    const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7)); // Sunday

    const schedulesRef = collection(firestore, 'schedules');
    const q = query(schedulesRef, where('uid', '==', userId), where('date', '>=', firstDayOfWeek), where('date', '<=', lastDayOfWeek));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        currentWeek[doc.id] = doc.data();
    });

    return currentWeek;
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