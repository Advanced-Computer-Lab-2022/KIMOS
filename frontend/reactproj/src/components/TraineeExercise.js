import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import PrimaryButton from './buttons/primaryBtn';
function App(props) {
  // Properties
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userSolution, setUserSolution] = useState([]);
  const [myExam, setMyExam] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const getExam = async () => {
    await axios
      .get('http://localhost:5000/courses/exam', {
        params: {
          courseId: '638281a7b05c30a726283c28',
          userId: '63811834d00e598aac52a58a',
          examId: props.examId
        }
      })
      .then((exam) => {
        setMyExam(exam.data.exam);
      });
  };

  const postSolution = async () => {
    console.log('here');
    const res = await axios.post(
      'http://localhost:5000/courses/exam/solution',
      { solutions: userSolution },
      {
        params: {
          courseId: '638281a7b05c30a726283c28',
          userId: '63811834d00e598aac52a58a',
          examId: props.examId
        }
      }
    );
    console.log(res);
    if (res.statusText === 'OK') {
      setSubmitSuccess(true);
    }
  };

  useEffect(() => {
    getExam();
  });

  /* A possible answer was clicked */
  const optionClicked = (option, questionId) => {
    if (currentQuestion < userSolution.length) {
      const newArr = userSolution.map((solution, index) => {
        if (index !== currentQuestion) {
          return solution;
        } else {
          return { choice: option + 1, exercise: questionId };
        }
      });
      setUserSolution(newArr);
    } else {
      setUserSolution([...userSolution, { choice: option + 1, exercise: questionId }]);
    }
    if (myExam.exercises && currentQuestion < myExam.exercises.length - 1)
      setCurrentQuestion(currentQuestion + 1);
  };

  const changeDisplayedQuestion = (index) => {
    setCurrentQuestion(index);
  };

  return (
    <div className="App">
      {submitSuccess ? (
        <>
          <div className="final-results">
            <h1>Your results have been recorded</h1>
            <div className="user-options">
              <PrimaryButton function={props.showSolution} btnText="Show Solution" />
              <PrimaryButton
                function={() => {
                  window.location.href = `/myCourseTrainee`;
                }}
                btnText="Go back to course page"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="questions-display">
            {myExam.exercises &&
              myExam.exercises.map((question, index) => {
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
          <div className="question-card" style={{ marginTop: 20 }}>
            {/* Current Question  */}
            <h2 className="currentqheader">
              Question {currentQuestion + 1} out of {myExam.exercises && myExam.exercises.length}
            </h2>
            <h3 className="question-text">
              {myExam.exercises && myExam.exercises[currentQuestion].question}
            </h3>
            {/* List of possible answers  */}
            <ul>
              {myExam.exercises &&
                myExam.exercises[currentQuestion].choices.map((choice, index) => {
                  return (
                    <li
                      key={index}
                      className={
                        userSolution[currentQuestion] &&
                        userSolution[currentQuestion].choice === index + 1
                          ? 'questions_li_selected'
                          : 'questions_li'
                      }
                      onClick={() => optionClicked(index, myExam.exercises[currentQuestion]._id)}>
                      {choice}
                    </li>
                  );
                })}
            </ul>
            {myExam.exercises && currentQuestion + 1 === myExam.exercises.length && (
              <PrimaryButton btnText="Submit" function={postSolution} size="10" />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
