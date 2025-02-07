function createWeekScheduleCard(frontTitle, frontText, backTitle, backText) {
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

export { createWeekScheduleCard }

// From Uiverse.io by joe-watson-sbf
