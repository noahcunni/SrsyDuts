import { useState } from "react";
import styles from './Create.module.css';
import { UserAuth } from '../../context/AuthContext.jsx';

async function postCard(url, body, token) {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json", 
        },
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        let message = `Request failed (${res.status})`;
        try {
            const data = await res.json();
            if (data.message) message = data.message;
        } catch { /* body wasn't JSON */ }
        throw new Error(message);
    }
    return res.json();
}

function Create() {
    const {session} = UserAuth();

    // 1. Initialize state for form fields
    const [kanjiFormData, setKanjiFormData] = useState({
        kanji: '',
        kunyomi: '',
        onyomi: '',
        meaning: ''
    });

    const [ vocabFormData, setVocabFormData ] = useState({
        jpn: '',
        hiragana: '',
        english: ''
    });

    // 2. Track changes dynamically
    const handleKanjiChange = (event) => {
        const { name, value } = event.target;
        setKanjiFormData((prevData) => ({
            ...prevData,
        [name]: value // Dynamically updates target
        }));
    };

    const handleVocabChange = (event) => {
        const { name, value } = event.target;
        setVocabFormData((prevData) => ({
            ...prevData,
        [name]: value // Dynamically updates target
        }));
    };

    const [error, setError] = useState("");
    // 3. Handle submission
    const handleKanjiSubmit = async() => {
        if (!session) return;
        setError("");
        try {
            await postCard("http://localhost:8080/api/create/kanji", kanjiFormData, session.access_token);
            setKanjiFormData({ kanji: '', kunyomi: '', onyomi: '', meaning: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleVocabSubmit = async () => {
            if (!session) return;
            setError("");
        try {
            await postCard("http://localhost:8080/api/create/vocab", vocabFormData, session.access_token);
            setVocabFormData({ jpn: '', hiragana: '', english: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    const [ mode, setMode ] = useState("kanji");

    const kanjiStuff = {kanjiFormData, setKanjiFormData, handleKanjiChange, handleKanjiSubmit};
    const vocabStuff = {vocabFormData, setVocabFormData, handleVocabChange, handleVocabSubmit};

    return(
        <div className={styles.page}>
            {error && <p className={styles.error}>{error}</p>}
            <h1>This page is used to add to database quickly.</h1>
            <div className={styles.modeButtons}>
                <button className={styles.button} onClick={() => setMode('kanji')}>Kanji</button>
                <button className={styles.button} onClick={() => setMode('vocab')}>Vocab</button>
            </div>

            <h1 className={styles.mode}>Mode: {mode}</h1>
            {mode === 'kanji' && <EnterKanji {...kanjiStuff}/>}
            {mode === 'vocab' && <EnterVocab {...vocabStuff}/>}
        </div>
    );
}


function EnterKanji({kanjiFormData, setKanjiFormData, handleKanjiChange, handleKanjiSubmit}) {
    return(
        <>
        <form className={styles.form}>
            <div className={styles.input}>
                <label htmlFor="kanji">Kanji:</label>
                <input type="text" id="kanji" name="kanji" 
                value={kanjiFormData.kanji} 
                onChange={handleKanjiChange} 
                />
            </div>

            <div className={styles.input}>
                <label htmlFor="kunyomi">Kunyomi:</label>
                <input type="text" id="kunyomi" name="kunyomi"
                value={kanjiFormData.kunyomi}
                onChange={handleKanjiChange}/>
            </div>

            <div className={styles.input}>
                <label htmlFor="onyomi">Onyomi:</label>
                <input type="text" id="onyomi" name="onyomi"
                value={kanjiFormData.onyomi}
                onChange={handleKanjiChange}/>
            </div>

            <div className={styles.input}>
                <label htmlFor="meaning">Meaning:</label>
                <input type="text" id="meaning" name="meaning" 
                value={kanjiFormData.meaning}
                onChange={handleKanjiChange}/>
            </div>
        </form>

        <button className={styles.button} onClick={() => handleKanjiSubmit()}>Add to database!</button>
        </>
    );
}

function EnterVocab({vocabFormData, setVocabFormData, handleVocabChange, handleVocabSubmit}) {
    return(
        <>
        <form className={styles.form}>
            <div className={styles.input}>
                <label htmlFor="jpn">JPN:</label>
                <input type="text" id="jpn" name="jpn" 
                value={vocabFormData.jpn} 
                onChange={handleVocabChange} 
                />
            </div>

            <div className={styles.input}>
                <label htmlFor="hiragana">hiragana:</label>
                <input type="text" id="hiragana" name="hiragana"
                value={vocabFormData.hiragana}
                onChange={handleVocabChange}/>
            </div>

            <div className={styles.input}>
                <label htmlFor="english">english:</label>
                <input type="text" id="english" name="english"
                value={vocabFormData.english}
                onChange={handleVocabChange}/>
            </div>
        </form>

        <button className={styles.button} onClick={() => handleVocabSubmit()}>Add to database!</button>
        </>
    );
}


export default Create