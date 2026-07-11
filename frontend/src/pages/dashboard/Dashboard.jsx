import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { UserAuth } from "../../context/AuthContext";
import { UserDeck } from "../../context/CardContext";
import { Link } from "react-router";

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Legend, ArcElement, Tooltip } from "chart.js";

import styles from './Dashboard.module.css';

function Dashboard() {
    const { summary, loadSummary } = UserDeck();
    const { session } = UserAuth();

    const [ newCards, setNewCards ] = useState();
    const [ dueCards, setDueCards ] = useState();
    const [ percentDone, setPercentDone ] = useState(0.0);

    useEffect(() => {
        loadSummary();
            if (summary) { 
            try {
                setNewCards(summary.newKanji + summary.newVocab);
                setDueCards(summary.dueWriting + summary.dueTyping);
            } catch (error) {
                console.error("Malformed summary JSON string:", error);
            }
            setPercentDone(calculatePercentDone(summary));
        }
    }, [loadSummary, summary]);


    if (!summary || !summary.statArr) {
        return <p className={styles.body}>Loading your summary...</p>
    }

    return (
        <div className={styles.body}>
            <div className={styles.header}>
                SrsyDuts
            </div>

            <div className={styles.dashContents}>
                <div className={styles.cardBoxes}>

                    {/* ----- LESSON BOX ----- */}
                    <div className={styles.lessonBox}>
                        <p className={styles.lessonHeader}>Lessons</p>
                        <p>
                            <span className={styles.newCardCount}>{newCards}</span>
                            <span className={styles.newCardPrompt}> cards ready to learn</span>
                        </p>
                        <Link className={styles.lessonButton}to='/study/lesson'>To lesson</Link>
                    </div>

                    {/* ----- REVIEW BOX ----- */}
                    <div className={styles.reviewBox}>
                        <p className={styles.reviewHeader}>Reviews</p>
                        <p>
                            <span className={styles.reviewCardCount}>{dueCards}</span>
                            <span className={styles.newCardPrompt}> cards ready to learn</span>
                        </p>
                        <Link className={styles.reviewButton} to={summary.dueWriting > 0 ? "/study/writing" : "/study/typing"}>To Review</Link>
                    </div>

                    <div className={styles.progressGraph}>
                        <p className={styles.chartLabel}>Card Mastery</p>
                        <PiChart summary={summary} percentDone={percentDone}/>
                    </div>
                </div>
            </div>

            <div className={styles.statContainers}>
                <div className={styles.statBoxOne}>
                    <p className={styles.statBoxHeader}>Kanji Mastered</p>
                    <p className={styles.statBoxValue}>{summary.statArr[6]}</p>
                </div>

                <div className={styles.statBoxOne}>
                    <p className={styles.statBoxHeader}>Vocab Mastered</p>
                    <p className={styles.statBoxValue}>{summary.statArr[5]}</p>
                </div>

                <div className={styles.statBoxTwo}>
                    <p className={styles.statBoxHeader}>Total cards mastered</p>
                    <p className={styles.statBoxValue}>{summary.statArr[5] + summary.statArr[6]} / {summary.totalCount}</p>
                </div>
            </div>
        </div>
    );
}

ChartJS.register(ArcElement, Tooltip);

function PiChart ({summary, percentDone}) {
    const options = {
        maintainAspectRatio: false,
        cutout: "55%",
        plugins: {
            legend: {
                position: "bottom",
                labels: { color: "#A79FB3", boxWidth: 12, padding: 12 },
            },
        },
    };
    const statArr = summary.statArr;

    const untouchedCount = (summary.totalCount -  (statArr[0] + statArr[1] + statArr[2] + statArr[3] + statArr[4]))

    const pieChartData = {
        labels: ["New", "Beginner", "Intermediate", "Mastered", "Fluent", "Untouched"].reverse(),
        datasets: [
            {
                data: [statArr[0], statArr[1], statArr[2], statArr[3], statArr[4], untouchedCount].reverse(),
                backgroundColor: [
                    "#B4A9EC",
                    "#9D7BFF",
                    "#FF5D8F",
                    "#CCDE0F",
                    "#8FE143",
                    "#3C3949", 
                ].reverse(),
                borderColor: "#1B1924",
                borderWidth: 2,
                hoverOffset: 4,
            
            },
        ],
    };
    
    return (
        <div className={styles.chartBox}>
            <Pie options={options} data={pieChartData}/>
            <p className={styles.percentDone}>{percentDone.toFixed(1)}%</p>
        </div>
    );
}

function calculatePercentDone(summary) {
    const statArr = summary.statArr;
    const totalCards = summary.totalCount;

    const percentage = (statArr[0] * 0.2 + statArr[1] * 0.4 + statArr[2] * 0.6 + statArr[3] * 0.8 + statArr[4] * 1.0) /  summary.totalCount;
    return percentage * 100.0;
}

export default Dashboard;