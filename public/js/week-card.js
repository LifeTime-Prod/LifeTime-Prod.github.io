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

export async function getCurrentWeekSchedule(userId) {
    const currentWeek = {};
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Monday
    const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7)); // Sunday

    for (let day = firstDayOfWeek; day <= lastDayOfWeek; day.setDate(day.getDate() + 1)) {
        const scheduleId = `${userId}_${day.getMonth() + 1}_${day.getFullYear()}`;
        const schedule = await firestoreModel.getSchedule(scheduleId);
        if (schedule) {
            currentWeek[day.toDateString()] = schedule;
        }
    }

    return currentWeek;
}

// From Uiverse.io by joe-watson-sbf