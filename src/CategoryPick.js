import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import "react-select/dist/react-select.css"
import "react-virtualized-select/styles.css"
import Select from 'react-virtualized-select'

export default function CategoryPick(props){
   const [selectedCategory, setSelectedCategory] = useState({label: "Select Category", value: ""});
   const [selectedDifficulty, setSelectedDifficulty] = useState({label: "Select Difficulty", value: "medium"});
   const {error, categoryList, handleClick} = props;
   const difficultyList = ["Easy", "Medium", "Hard"];
   const categoryOptions = Array.from(categoryList, (categoryList, index) => ({
      label: categoryList.name,
      value: categoryList.id
   }));
   const difficultyOptions = difficultyList.map((difficulty) => ({
      label: difficulty,
      value: difficulty.toLowerCase()
   }));

   function handleCategoryChange(e){
      setSelectedCategory(e);
   }

   function handleDifficultyChange(e){
      setSelectedDifficulty(e);
   }

   return (
      <div className="container">
         <div className="box">
               <h1>Welcome to Trivia Royale!</h1>
               {error ? <li>{error.message}</li> : <Select className="selectBox" onChange={handleCategoryChange} options={categoryOptions} placeholder={selectedCategory.label}/>}
               {error ? <li>{error.message}</li> : <Select className="selectBox" onChange={handleDifficultyChange} options={difficultyOptions} placeholder={selectedDifficulty.label}/>}
               <button onClick={() => handleClick(selectedCategory.value, selectedDifficulty.value)}>Okay!</button>
         </div>
      </div>
   )
}
