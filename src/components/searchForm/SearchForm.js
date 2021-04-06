import React from "react"
import { useLocation } from "wouter";
import useSearchForm , {RATINGS} from './hook';

import "./searchForm.css";


export default function SearchForm({
  initialKeyword = '',
  initialRating = RATINGS[0]
}) {
  
 
  const [_, pushLocation] = useLocation();
  const {changeKeyword,changeRating,keyword,rating} = useSearchForm({initialKeyword,initialRating});

  const onSubmit = (evt) => {
    evt.preventDefault();
    console.log(keyword);
    if (keyword !== "") {
      pushLocation(`/search/${keyword}/${rating}`);
    }
  };

  const handleChangeInput = (evt) => {
   changeKeyword({keyword:evt.target.value})
    //console.log(`Input: ${evt.target.value}`)
  };

  const handleChangeRating = (evt) => {
    changeRating({rating:evt.target.value})
  };

  return (
    <>
      <form className="search-gifs-form" onSubmit={onSubmit}>
        <input
          className="form-input"
          type="text"
          placeholder="Search a gif here.."
          onChange={handleChangeInput}
        />
        <select className="form-input" value={rating} onChange={handleChangeRating}>
          <option disabled>Gif Rating</option>
          {RATINGS.map((rating) => (
            <option key={rating}>{rating}</option>
          ))}
        </select>

        <div className="search-button gradient" onClick={onSubmit}>
          <img src={process.env.PUBLIC_URL + "/static/img/search-icon.svg"} />
        </div>
      </form>
    </>
  );
}
