"use client"
import { useState, useEffect } from 'react';
import QuestionComponent from './Question';
import Result from './Result';
import Loader from './Loader';
import {AuthActions} from "@/lib/auth/utils";
import withAuth from "@/components/auth/withAuth";


interface AnswerOption {
    text: string;
    isCorrect: boolean;
}

interface Question {
    id: number;
    text: string;
    options: AnswerOption[];
}

interface QuizProps {
    bookId: number;
}

function QuizComponent({bookId}: QuizProps) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isQuizFinished, setIsQuizFinished] = useState(false);

    useEffect(() => {
        fetchQuestions()
    }, []);
    const fetchQuestions = async () => {
        const accessToken = await AuthActions().getToken("access")
        fetch("/api/v1/ai/books/"+bookId+"/test/",{
            method: "POST",
            headers:{
                "Authorization": "Bearer " + accessToken
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setQuestions(JSON.parse(data.data));
                setIsLoading(false);
            })
            .catch((err) => console.error(err));
    }
    const handleAnswer = (isCorrect: boolean) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentQuestionIndex(nextIndex);
        } else {
            setIsQuizFinished(true);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            {isLoading ? (
                <Loader />
            ) : isQuizFinished ? (
                <Result score={score} total={questions.length} />
            ) : (
                <QuestionComponent
                    question={questions[currentQuestionIndex]}
                    onAnswer={handleAnswer}
                />
            )}
        </div>
    );
}

export default withAuth(QuizComponent);
