"use client";

import type { NextPage } from 'next';
import { Balancer } from "react-wrap-balancer";
import Head from 'next/head';
import CorrectAnswer from '@/components/question';
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useState, useEffect } from 'react';
import { transferSPLToken } from '../../lib/token_transfer';
import "../../styles/quiz.css";

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const { connected, publicKey, disconnect } = useWallet();
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/questions');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        console.log("data: "+data);
        setQuestions(data);
        setAnswers(new Array(data.length).fill(''));
      } catch (error) {
        console.error('Failed to fetch the questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleSubmit = () => {
    const data = {
      'answers': answers,
      'connected': connected,
      'public_key': publicKey,
    }
    const fetchResult = async () => {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      })
   
      const resData = await res.json()
      if (resData['answer_result']) {
        if (resData['token']) {
          alert('Congratulations! You\'ve answered correctly and will receive 10 tree tokens as a reward.');
        } else {
          alert('Congratulations!');
        }
      } else {
        alert('Sorry, some questions were answered incorrectly. Please try again.');
      }
    };
  
    fetchResult();
  };

  const handleAnswerChange = (index: number, answer: string) => {
    setAnswers(prev => prev.map((a, i) => (i === index ? answer : a)));
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center pt-16">
      <div className="z-10 min-h-[50vh] w-full max-w-4xl px-5 xl:px-0">
        <h1
          className="animate-fade-up from-foreground to-muted-foreground bg-gradient-to-br bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] opacity-0 drop-shadow-sm dark:text-[#FCFCFD] md:text-6xl/[5rem]"
          style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
        >
            ECO-QUIZ
        </h1>
        {questions.map((question, index) => (
          <div key={question.id} className="question-container">
            <p className="query">{question.query}</p>
            {question.choices.map(choice => (
              <label key={choice} className="choice-label">
                <input
                  type="radio"
                  name={`question${question.id}`}
                  value={choice}
                  checked={answers[index] === choice}
                  onChange={() => handleAnswerChange(index, choice)}
                />
                {choice}
              </label>
            ))}
          </div>
        ))}
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </main>
  );
};

