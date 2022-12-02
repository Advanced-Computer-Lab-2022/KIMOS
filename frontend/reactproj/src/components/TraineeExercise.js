import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useStyles from '../styles/traineeExercise.scss';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import PrimaryBtn from './buttons/primaryBtn';
function App() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [userSolution, setUserSolution] = useState([]);
  const [displaySolution, setDisplaySolution] = useState([]);
  var solutionIndex = 0;
  var counter = 0;

  const params = new URLSearchParams(window.location.search);
  const examId = params.get('exam_id');
  //console.log(examId);
  const [myExam, setMyExam] = useState({
    /* question_id:"",
    question:"",
    choices:[]*/
  });

  const getExam = async () => {
    await axios
      .get('http://localhost:5000/courses/exam', {
        params: {
          courseId: '638281a7b05c30a726283c28',
          userId: '63811834d00e598aac52a58a',
          examId: examId
        }
      })
      .then((exam) => {
        //console.log(exam);
        setMyExam(exam.data.exam);
      });
  };

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
        console.log(solution);
        setMyExam(solution.data.exam);
        // console.log(myExam.exercises);
      });
  };

  const postSolution = async (sol) => {
    const res = await axios.post(
      'http://localhost:5000/courses/exam/solution',
      { body: sol },
      {
        params: {
          courseId: '638281a7b05c30a726283c28',
          userId: '63811834d00e598aac52a58a',
          examId: examId
        }
      }
    );
    if (res.data) {
      console.log(res.data);
      setShowResults(true);
    }
  };

  useEffect(() => {
    getExam();
  }, []);

  // useEffect(() => {
  //   if (myExam && currentQuestion + 1 >= myExam.exercises.length) {
  //     setShowResults(true);
  //     postSolution();
  //   }
  // }, []);

  /* A possible answer was clicked */
  const optionClicked = (option, questionId) => {
    if (myExam && currentQuestion + 1 < myExam.exercises.length) {
      setUserSolution([...userSolution, { choice: option + 1, exercise: questionId }]);
      setCurrentQuestion(currentQuestion + 1);
      // console.log(userSolution);
    } else {
      //submit the exam

      postSolution([...userSolution, { choice: option + 1, exercise: questionId }]);
    }
  };

  /* show solution */
  const solution = () => {
    setShowSolution(true);
    getSolution();
  };

  return (
    <div className="App">


      {/* Show results   */}
      {showResults ? (
        /* Final Results */
        <>
          <div className="final-results">
            <h1>Final Results</h1>
            <h2>Score: {displaySolution.grade}</h2>

            <PrimaryBtn function={solution} btnText="Show Solution"/>
          </div>

          {/*solution*/}
          {showSolution && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: 30,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <h1>Solution</h1>
              {displaySolution.solutions.map((q) => (
                <>
                  <div
                    style={{
                      backgroundColor: '#D3D3D3',
                      width: 900,
                      borderRadius: 20,
                      paddingTop: 20
                    }}>
                    <h4 className="question-text" style={{ marginBottom: 10 }}>
                      Q{solutionIndex + 1}) {q && q.question}
                    </h4>
                    <ul style={{ marginBottom: 30 }}>
                      {displaySolution[solutionIndex++].choices.map((option, index) => {
                        return index === q.correctAnswer - 1 ? (
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
                        ) : index !== q.userAnswer ? (
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
                </>
              ))}
            </div>
          )}
        </>
      ) : (
        /*  Question Card  */
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
                    className="questions_li"
                    onClick={() => optionClicked(index, myExam.exercises[currentQuestion]._id)}>
                    {choice}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
