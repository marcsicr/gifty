import GiftyContext from "context/GiftyContext";
import React from "react"
import { useContext } from "react/cjs/react.development";
import useSearchForm, {RATINGS} from './hook';
import {useLocation} from 'wouter'
import style from "./searchForm.module.css";


export default function SearchForm({
  initialKeyword = '',
}) {
  
  const {changeKeyword,changeRating,keyword,rating} = useSearchForm({initialKeyword});
  const {isLogged} = useContext(GiftyContext)

  const[_,pushLocation] = useLocation()


  const onSubmit = (evt) => {
    console.log("submited")
    evt.preventDefault();
    console.log(keyword);
    if (keyword !== "") {
      pushLocation(`/search/${keyword}/${rating}`)
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
      <form className={style['search-gifs-form']} onSubmit={onSubmit}>
        <input
          className={style['form-input']}
          type="text"
          placeholder="Search a gif here.."
          onChange={handleChangeInput}
        />

        { !isLogged? 
          <select className={style['form-input']} value={rating} onChange={handleChangeRating}>
          <option disabled>Gif Rating</option>
          {RATINGS.map((rating) => (
            <option key={rating}>{rating}</option>
          ))}
          </select>
        : null

        }
       
        <div className={`${style['search-button']} ${style.gradient}`} onClick={onSubmit}>
          <img alt="search icon" src={process.env.PUBLIC_URL + "/static/img/search-icon.svg"} />
        </div>
      </form>
    </>
  );
}
