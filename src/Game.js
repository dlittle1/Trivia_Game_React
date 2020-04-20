import React, {useState, useEffect} from 'react'
import {Route, useHistory} from 'react-router-dom'
import axios from 'axios'
import CategoryPick from './CategoryPick'
import Question from './Question'


export default function Game(){
   const [health, setHealth] = useState(localStorage.getItem('health') || '')
   const [categoryList, setCategoryList] = useState([]);
   const [questionList, setQuestionList] = useState(localStorage.getItem('questionList') || '');
   const [selectedCategory, setSelectedCategory] = useState();
   const [selectedDifficulty, setSelectedDifficulty] = useState();
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState('');
   const history = useHistory();

   function handleClick(id, difficulty){
      setSelectedCategory(id);
      setSelectedDifficulty(difficulty);
   }

   function playAgain(e){
      e.preventDefault();
      localStorage.clear();
      setSelectedCategory(undefined);
      history.push('/');
   }
   function playAgain(){
      setIsLoading(true);
      localStorage.clear();
      history.push('/');
      window.location.reload();
   }
   function getCategories(){
      axios.get('https://opentdb.com/api_category.php')
         .then( res => {
            setCategoryList(res.data.trivia_categories);
            setIsLoading(false);
         })
         .catch(err => {
            setError(err.message);
            setIsLoading(false);
         })
   }
   function getQuestions(){
      axios.get(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}`)
         .then( res => {
            localStorage.setItem('questionList', JSON.stringify(res.data.results));
            localStorage.setItem('health', JSON.stringify(['❤️','❤️','❤️']));
            localStorage.setItem('score', 0);
            setIsLoading(false);
            history.push('/questions/1');
         }).catch(err => {
            setError(err.message);
            setIsLoading(false);
         })
   }
   useEffect(() => {
      if (selectedCategory === undefined){
         getCategories();
      }
      else
      {
         setIsLoading(true);
         setTimeout(getQuestions, 1000);
      }
   },[selectedCategory])

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
            <Route exact path='/'>
               <CategoryPick handleClick={handleClick} categoryList={categoryList} />
            </Route>
            <Route path='/game/over'>
               <div className="container">
                  <div className="box">
                     <h1>{health.length < 1 ? "YOU DIED" : "GAME OVER"}</h1>
                     <h2>You scored: {localStorage.getItem('score')} points!</h2>
                     <button onClick={playAgain}>Play again</button>
                  </div>
               </div>
            </Route>
            <Route path='/questions/:id' children={<Question playAgain={playAgain}/>} />
         </>
      )
   }
}
