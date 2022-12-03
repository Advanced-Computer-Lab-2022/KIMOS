import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import PrimaryButton from './buttons/primaryBtn';
function TraineeSolution() {
  const [displaySolution, setDisplaySolution] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  var counter = 0;
  const params = new URLSearchParams(window.location.search);
  const examId = params.get('exam_id');

  const getSolution = async () => {
    await axios
      .get('http://localhost:5000/courses/exam/solution', {
        params: {
          courseId: '638281a7b05c30a726283c28',
          userId: '63811834d00e598aac52a58a',
          examId: examId
        }
      })
      .then((solution) => {
        console.log(solution.data.solutions);
        setDisplaySolution(solution.data);
      });
  };

  useEffect(() => {
    getSolution();
  }, []);

  const changeDisplayedQuestion = (index) => {
    setCurrentQuestion(index);
  };

  return (
    <div className="App">
      <div className="questions-display">
        {displaySolution.solutions &&
          displaySolution.solutions.map((question, index) => {
            return (
              <div
                className={`question ${currentQuestion === index ? 'selected-q' : ''}`}
                onClick={() => {
                  changeDisplayedQuestion(index);
                }}>
                Question {index + 1}
              </div>
            );
          })}
      </div>
      <div className="final-results">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: 30,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <h1>Solution</h1>
          <h2>{`Grade: ${displaySolution.grade}`}</h2>
          <div
            style={{
              backgroundColor: '#D3D3D3',
              width: 900,
              borderRadius: 20,
              paddingTop: 20
            }}>
            <h4 className="question-text" style={{ marginBottom: 10 }}>
              Q{currentQuestion + 1}){' '}
              {displaySolution.solutions && displaySolution.solutions[currentQuestion].question}
            </h4>
            <ul style={{ marginBottom: 30 }}>
              {displaySolution.solutions &&
                displaySolution.solutions[currentQuestion].choices.map((option, index) => {
                  return index === displaySolution.solutions[currentQuestion].correctAnswer - 1 ? (
                    <li
                      key={index}
                      style={{
                        display: 'flex',
                        columnGap: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                      - {option}
                      <DoneIcon style={{ color: 'green' }}></DoneIcon>
                    </li>
                  ) : index + 1 !== displaySolution.solutions[currentQuestion].userAnswer ? (
                    <li key={index}>- {option}</li>
                  ) : (
                    <li
                      key={index}
                      style={{
                        display: 'flex',
                        columnGap: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                      - {option}
                      <ClearIcon style={{ color: '#AA0000' }}></ClearIcon>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div style={{ display: 'none' }}>{counter++}</div>
        </div>
        <PrimaryButton
          function={() => {
            window.location.href = `/myCourseTrainee`;
          }}
          btnText="Go back to course page"
        />
      </div>
    </div>
  );
}

export default TraineeSolution;
