import React from "react";
import { LessonKanjiCard, LessonVocabCard } from "../../LessonCardContainer";

function Intro({ cards }) {
    return(
        <div>
            <ul>
                {cards.newVocab.map((card) => (
                <li key={card.id}>
                    <LessonVocabCard card={card}/>
                </li>
            ))};
                {cards.newKanji.map((card) => (
                <li key={card.id}>
                    <LessonKanjiCard card={card}/>
                </li>
            ))};
            </ul>
        </div>
    );
}

export default Intro