<p align="center">
  <a href="https://srsyduts.com">
    <img src="./docs/banner.svg" alt="SrsyDuts banner" width="800">
  </a>
</p>

<h3 align="center">
  <a href="https://www.srsyduts.com">SrsyDuts.com</a>
</h3>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About</a>
      <ul>
        <li><a href="#the-stack">The Stack</a></li>
        <li><a href="#spaced-repetition-system">Spaced Repetition System</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#screenshots">Screenshots</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<p align="center">
  <img src="./docs/Writing_ex.gif" alt="Writing practice demo" width="600">
</p>

SrsyDuts is an interactive spaced-repetition Japanese vocabulary tool with a heavy focus on learning kanji.
## About
Japanese is one of the most difficult languages to learn, and a big part of that difficulty is kanji. Kanji are unique 
heiroglyphic-like characters that act as the building blocks of vocabulary and writing in Japanese. In order to be 
proficient in Japanese you must know thousands of these individual characters. SrsyDuts is meant to address that. The 
idea is simple: Learn to write a Kanji first, and then learn the vocabulary it makes up. Starting out is slow, but the 
progress quickly stacks up once you gain experience with the kanji.  

- Get familiar with kanji and vocabulary in the lesson stage.
- Practice writing kanji by hand before learning the words that use them.
- Unlock new vocabulary after mastering the kanji it's built from.
- Spaced-repetition scheduling keeps hundreds of cards manageable.

### The Stack
- **Frontend** - JavaScript + React
- **Backend** - Java + Spring Boot
- **Database** - Supabase

### Spaced Repetition System
<h3>What is Spaced-Repetition</h3>
Spaced-repetition is a backed method of memorization, a process of introducing cards over a schedule and further pacing them apart. 
In this case, spaced repetition allows us to juggle thousands of vocabulary and kanji in a manageable time frame, with as little daily effort as possible.
SrsyDuts uses a fixed-interval, between 4-hours and 17 months.

## Usage

### Lessons
The lesson tab introduces new cards through a three-stage pipeline: **Intro → Quiz → Writing**.

1. **Intro** - New kanji and vocabulary are displayed with their readings and meanings. If the card is a kanji, take the time to get familiar with it: write it down on paper 2-3 times with the meaning right beside it. Don't focus too much on the readings, they'll come intuitively once you know the vocabulary built from the kanji. Vocab works the same way: by the time a vocab card is introduced, you're usually already familiar with its root kanji, so focus on the meaning and pronunciation.
2. **Quiz (Typing)** - Tests your recall of vocabulary. You're shown the Japanese spelling (kanji included) and asked one of two questions: the meaning in English, or the spelling in hiragana (without the kanji).
3. **Writing** - The final stage. Recall how to write out the kanji and vocabulary by hand, spelling included. Grading is done by you, so cheating won't help you learn.

### Reviews: Writing & Typing
Once a card leaves lessons, it enters the review cycle. The Writing and Typing tabs
work just like their lesson counterparts, but pull from cards the SRS has scheduled. 
Each answer is graded on the spot - pass and the interval grows; fail 
and the card comes back sooner.

## Screenshots

**Dashboard**
<p align="center">
  <img src="./docs/dash.png" alt="Dashboard">
</p>

**Writing practice**
<p align="center">
  <img src="./docs/writing1.png" alt="Writing practice, unrevealed">
  <img src="./docs/writing2.png" alt="Writing practice, revealed">
</p>

**Typing practice**
<p align="center">
  <img src="./docs/typing2.png" alt="Typing practice">
</p>

## License

Distributed under the MIT License. See `LICENSE` for details.

## Contact

- Email: noah.cunninghams02@gmail.com
- LinkedIn: [linkedin.com/in/noahcunni](https://www.linkedin.com/in/noahcunni)
- Project: [github.com/noahCunni/SrsyDuts](https://github.com/noahCunni/SrsyDuts)
