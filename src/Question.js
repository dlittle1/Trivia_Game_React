import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import { Html5Entities } from 'html-entities';

export default function Question(props){
   const { id } = useParams()
   const htmlEntities = new Html5Entities();
   const [answerOptions, setAnswerOptions] = useState([]);
   const [selectedAnswer, setSelectedAnswer] = useState();
   const [isLoading, setIsLoading] = useState(false);
   const questionList = JSON.parse(localStorage.getItem('questionList'));
   const questionObj = questionList[id - 1];
   const questionText = htmlEntities.decode(questionObj.question);
   const history = useHistory();
   const health = JSON.parse(localStorage.getItem('health'));
   const score = localStorage.getItem('score');

   useEffect(() => {
      setIsLoading(true)
      // get all incorrect answers
      let options = questionObj.incorrect_answers
      // push in the correct answer to get a full answers list
      options.push(questionObj.correct_answer)
      // shuffle those answers to give variety to the options in all questions
      options = shuffle(options)
      // give those options to the user
      setAnswerOptions(options)
      setIsLoading(false)
   },[id])

   //found at (https://bost.ocks.org/mike/shuffle/) great implementation of a random shuffle
   function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

         // Pick a remaining element...
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;
         // And swap it with the current element.
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
      }
      return array;
   }

   function nextQuestion(){
      history.push(`/questions/${Number(id) + 1}`)
   }

   function handleClick(e){
      setSelectedAnswer(e)
   }

   function handleSubmit(e){
      e.preventDefault();
      if (selectedAnswer === questionObj.correct_answer){
         let newScore = score;
         newScore++;
         localStorage.setItem('score', newScore);
      }
      else {
         if (health.length === 1){
            let newHealth = health.slice(1);
            localStorage.setItem('health', JSON.stringify(newHealth));
            history.push('/game/over');
            return
         }else {
            let newHealth = health.slice(1);
            localStorage.setItem('health', JSON.stringify(newHealth));
         }
      }
      if (Number(id) === questionList.length){
         history.push(`/game/over`)
      }else {
         setTimeout(nextQuestion, 50)
      }

   }
   console.log(questionList);
   if (isLoading)
   {
      return(
         <div className="container">
            <div className="box">
               <h1>Loading...</h1>
            </div>
         </div>

      )
   }
   else
   {
      const hearts = health.map(heart => {
         return (<h1 style={{display: "inline"}}>{heart}</h1>)
      })

      const answerOptionsButtons = answerOptions.map((option, i) => {
         return (
            <div className="radio" onClick={() => handleClick(option)}>
               <input type="radio" key={i} checked={selectedAnswer === option} value={option}  name={`question${i}`}/>
               <label htmlFor={`question${i}`}>
                  {htmlEntities.decode(option)}
               </label>
            </div>
         )

         })
      return (
         <div className="container">
            <div className="box">
               <p>{id}/10</p>
               {hearts}
               <h1>{questionText}</h1>
               <form>
                  {answerOptionsButtons}
                  <button onClick={handleSubmit}>Submit</button>

               </form>
               <br/>
               <a onClick={props.playAgain}>Play again</a>
            </div>
         </div>
      )
   }
}
