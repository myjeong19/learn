import { useState, useCallback, useRef } from 'react';

import QUESTIONS from '../questions';
import quizeCompleted from '../assets/quiz-complete.png';
import { QuestionTimer } from './QuestionTimer';

export const Quiz = () => {
  const shuffledAnswers = useRef();
  const [answerState, setAnswerState] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex =
    answerState === '' ? userAnswers.length : userAnswers.length - 1;

  const handleSelectAnswer = useCallback(
    selectedAnswer => {
      setAnswerState('answered');
      setUserAnswers(prevUesrAnswers => [...prevUesrAnswers, selectedAnswer]);
      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState('correct');
        } else {
          setAnswerState('wrong');
        }

        setTimeout(() => {
          setAnswerState('');
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  if (quizIsComplete) {
    return (
      <div id='summary'>
        <img src={quizeCompleted} alt='Trophy icon' />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  const elementAnswers = shuffledAnswers.current.map(answer => {
    const isSelected = userAnswers[userAnswers.length - 1] === answer;
    let cssClasses = '';

    if (answerState === 'answered' && isSelected) {
      cssClasses = 'selected';
    }

    if (answerState === 'correct' || answerState === 'wrong') {
      cssClasses = answerState;
    }

    return (
      <li key={answer} className='answer'>
        <button
          onClick={() => {
            handleSelectAnswer(answer);
          }}
          className={cssClasses}
        >
          {answer}
        </button>
      </li>
    );
  });

  return (
    <div id='question'>
      <QuestionTimer
        key={activeQuestionIndex}
        timeout={10000}
        onTimeout={handleSkipAnswer}
      />
      <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
      <ul id='answers'>{elementAnswers}</ul>
    </div>
  );
};
