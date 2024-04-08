import styles from '../styles/quiz.css';

export default function CorrectAnswer() {
    return (
        <div className={styles.correctAnswer}>
            <p>Congratulations! You've answered correctly and will receive 10 tree tokens as a reward.</p>
        </div>
    );
}

