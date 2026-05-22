
let index = -1;
let cards = [
    {
        english: 'Dog',
        hiragana: 'いぬ',
        kanji: '犬',
        srs: 0
    },{
        english: 'Cat',
        hiragana: 'ねこ',
        kanji: '猫',
        srs: 0
    },{
        english: 'Fish',
        hiragana: 'さかな',
        kanji: '魚',
        srs: 0
    }
];

export function getCard() {
    // Get card from database, then return.
    index++;
    return cards[index];
}

export function update(isCorrect) {
    // Send update to database based on status.
}

// As simply as possible...
// We would need a function to get card.
// We would need a function to update card.
