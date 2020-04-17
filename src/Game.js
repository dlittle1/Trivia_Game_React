import React, {useState, useEffect} from 'react'
import {Route, useHistory} from 'react-router-dom'
import axios from 'axios'
import CategoryPick from './CategoryPick'
import Question from './Question'


export default function Game(){
   const [score, setScore] = useState(0);
   const [health, setHealth] = useState(['❤️','❤️','❤️'])
   const [categoryList, setCategoryList] = useState([]);
   const [questionList, setQuestionList] = useState();
   const [selectedCategory, setSelectedCategory] = useState();
   const [selectedDifficulty, setSelectedDifficulty] = useState();
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState('');
   const history = useHistory();

   function handleClick(id, difficulty){
      setSelectedCategory(id);
      setSelectedDifficulty(difficulty);
   }

   function playAgain(e){
      e.preventDefault();
      setScore(0);
      setQuestionList([]);
      setSelectedCategory(undefined);
      setHealth(['❤️','❤️','❤️'])
      history.push('/game');
   }

   function playAgain(){
      setIsLoading(true)
      history.push('/Trivia_Game_React/');
      window.location.reload();
   }

   function getCategories(){
      axios.get('https://opentdb.com/api_category.php')
         .then( res => {
            setCategoryList(res.data.trivia_categories)

            setIsLoading(false)
         })
         .catch(err => {
            setError(err.message)
            setIsLoading(false)
         })
         console.log('called')
   }
   function getQuestions(){
      axios.get(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}`)
         .then( res => {
            setQuestionList(res.data.results);
            setIsLoading(false);
            history.push('/game/questions/1')
         })
   }

   useEffect(() => {
      setIsLoading(true)
      if (selectedCategory === undefined){
         setTimeout(getCategories, 1000)
      }
      else
      {
         setTimeout(getQuestions, 1000)
      }
   },[selectedCategory])

   console.log("score is " + score);
   if (isLoading) {
      document.body.style.cursor = 'wait';
      return (
         <div className="container">
            <div className="box">
               <h1>Loading...</h1>
            </div>
         </div>
      )

   } else {
      document.body.style.cursor = 'default';
      return (
         <>
            <Route exact path='/Trivia_Game_React/'>
               <CategoryPick handleClick={handleClick} categoryList={categoryList} />
            </Route>
            <Route path='/game/over'>
               <div className="container">
                  <div className="box">
                     <h1>{health.length < 1 ? "YOU DIED" : "GAME OVER"}</h1>
                     <h2>You scored: {score} points!</h2>
                     <button onClick={playAgain}>Play again</button>
                  </div>
               </div>
            </Route>
            <Route path='/game/questions/:id' children={<Question playAgain={playAgain} health={health} setHealth={setHealth} questionList={questionList} score={score} setScore={setScore}/>} />
         </>
      )
   }
}
