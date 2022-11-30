import React, { useState ,useEffect} from "react";
import axios from 'axios';
import useStyles from '../styles/traineeExercise.scss';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';

function App() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [userSolution, setUserSolution] = useState([]);
  //var userSolution=[0,1,0,1,0];
  var solutionIndex=0;
  var counter=0;

  const params = new URLSearchParams(window.location.search);
  const examId = params.get('exam_id');
  console.log(examId);
  const[myExam,setMyExam]=useState({
   /* question_id:"",
    question:"",
    choices:[]*/
  });


  const getExam=async()=>{await axios.get("http://localhost:5000/courses/exam", {
    params: {
      courseId: "638281a7b05c30a726283c28",
      userId:"63811834d00e598aac52a58a",
      examId: examId
    }
  }).then((exam)=>{
    console.log(exam);
    setMyExam(exam);
})}

  useEffect(()=>{
      getExam();
      
  },[myExam])



  const questions = [
    {
      id:1,
      text: "What is an operating system?",
      options: [
        { id: 0, text: "interface between the hardware and application programs", isCorrect: false },
        { id: 1, text: "collection of programs that manages hardware resources", isCorrect: false },
        { id: 2, text: "system service provider to the application programs", isCorrect: false },
        { id: 3, text: "all of the mentioned", isCorrect: true },
      ],
    },
    {
      id:2,
      text: "What is the main function of the command interpreter?",
      options: [
        { id: 0, text: "to provide the interface between the API and application program", isCorrect: false },
        { id: 1, text: "to handle the files in the operating system", isCorrect: false },
        { id: 2, text: "to get and execute the next user-specified command", isCorrect: true },
        { id: 3, text: "none of the mentioned", isCorrect: false },
      ],
    },
    {
      id:3,
      text: "In Operating Systems, which of the following is/are CPU scheduling algorithms?",
      options: [
        { id: 0, text: "Priority", isCorrect: false },
        { id: 1, text: "Round Robin", isCorrect: false },
        { id: 2, text: "Shortest Job First", isCorrect: false },
        { id: 3, text: "All of the mentioned", isCorrect: true },
      ],
    },
    {
      id:4,
      text: "CPU scheduling is the basis of ___________",
      options: [
        { id: 0, text: "multiprogramming operating systems", isCorrect: true },
        { id: 1, text: "larger memory sized systems", isCorrect: false },
        { id: 2, text: "multiprocessor systems", isCorrect: false },
        { id: 3, text: "none of the mentioned", isCorrect: false },
      ],
    },
    {
      id:5,
      text: "To access the services of the operating system, the interface is provided by the ___________",
      options: [
        { id: 0, text: "Library", isCorrect: false },
        { id: 1, text: "System calls", isCorrect: true },
        { id: 2, text: "Assembly instructions", isCorrect: false },
        { id: 3, text: "API", isCorrect: false },
      ],
    },
  ];


  /* A possible answer was clicked */
  const optionClicked = (option) => {
    const solutionArray=userSolution;
    setUserSolution([...userSolution,option.id])

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }


  };

  /* show solution */
  const solution = () => {
    setShowSolution(true);
  };

  return (
    <div className="App">
      
      <h1 style={{marginTop:20}}>Exercise 1</h1>

      {/* Show results   */}
      {showResults ? (
        /* Final Results */
        <>
        <div className="final-results">
          <h1>Final Results</h1>
          <h2>
            {score} out of {questions.length} correct - (
            {(score / questions.length) * 100}%)
          </h2>
          <button onClick={() => solution()}>Show Solution</button>
        </div>

          {/*solution*/}
          {showSolution &&(
            <div style={{display:"flex",flexDirection:"column",rowGap:30,justifyContent:"center",alignItems:"center"}}>
              <h1>Solution</h1>
             {questions.map((q) => (
              <>
              <div style={{backgroundColor:"#D3D3D3",width:900,borderRadius:20,paddingTop:20}}>
               <h4 className="question-text" style={{marginBottom:10}}>Q{solutionIndex+1}) {q.text}</h4>
               <ul style={{marginBottom:30 }}>
               
                  {questions[solutionIndex++].options.map((option) => {
                    return (
                      option.isCorrect?(<li key={option.id} style={{display:"flex",columnGap:10,alignItems:"center",justifyContent:"center"}}>- {option.text}<DoneIcon style={{color:"green"}}></DoneIcon></li>) : ((option.id!==userSolution[counter])?(<li key={option.id}>- {option.text}</li>):(<li key={option.id} style={{display:"flex",columnGap:10,alignItems:"center",justifyContent:"center"}} >- {option.text}<ClearIcon style={{color:"#AA0000"}}></ClearIcon></li>))
                    );
                  })}
              
              </ul>
              </div>
            <div style={{display:"none"}}>{counter++}</div>
            
            </>
              ))}
              
            </div>
          )}
        
        </>

      ) : (
        /*  Question Card  */
        <div className="question-card" style={{marginTop:20}}>
          {/* Current Question  */}
          {Object.values(myExam).map((exam,index)=>{
          return(
            <>
          <h2>
            Question: {currentQuestion + 1} out of {myExam.length}
          </h2>
          <h3 key={index} className="question-text">{exam.question}</h3>


          {/* List of possible answers  */}
          <ul>
            {exam.choices.map((choice) => {
              return (
                <li
                key={index}
                className="questions_li"
                  onClick={() => optionClicked(choice)}
                >
                  {choice}
                </li>
              );
            })}
          </ul>
          </>)
          })}
          
        </div>
      )}
    </div>
  );
}

export default App;