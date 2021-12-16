import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "wouter";
import PopUpConfirm from "components/popUpConfirm";
import GiftyContext from "context/GiftyContext";
import Gifty from "services/gifty/service";
import { SHARE_IMG } from "img/IMGS";

import "./Gif.css";

export const COLORS = ["g", "b", "p", "r", "y"];
export default function Gif({
  id,
  title,
  url,
  username,
  avatar_url,
  color = 0,
}) {
  return (
    <Overlay id={id}>
      <Image
        id={id}
        username={username}
        url={url}
        avatar_url={avatar_url}
        color={color}
      />
    </Overlay>
  );
}

function Image({ id, username, url, avatar_url, title, color = 0 }) {
  // eslint-disable-next-line no-unused-vars
  const [_, pushLocation] = useLocation();
  const onImageClick = () => {
    pushLocation(`/gifs/${id}`);
  };

  return (
    <div className={`gif ${COLORS[color]}`} onClick={onImageClick}>
      <img className="content-img" alt={title} loading="lazy" src={url} />
      {username !== "" ? (
        <div className="gif-info">
          <div className="gif-info-data">
            <div className="user-avatar">
              <img alt="avatar" className="user-avatar" src={avatar_url} />
            </div>
            <span className="user-name">{username}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Overlay({ id, children }) {
  const ctx = useContext(GiftyContext);
  const { isGifFav } = ctx;
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPopup, setShowPopUp] = useState(false);
  const { isLogged } = useContext(GiftyContext);

  useEffect(() => {
    setIsFavorite(isGifFav(id));
  }, [id, isGifFav]);

  const toggleThisGifFromFavs = async (evt) => {
    console.log("Event", evt);
    if (!isFavorite) {
      let isFav = await Gifty.addToFavs(id, ctx);
      console.log("The is fav", isFav);
      setIsFavorite(isFav);
    } else {
      setShowPopUp(true);
    }
  };

  const removeGifFromFav = async () => {
    await Gifty.removeFromFavs(id, ctx);
    setIsFavorite(false);
    setShowPopUp(false);
  };

  const onRemoveCanceled = () => {
    setShowPopUp(false);
  };

  return (
    <>
      <PopUpConfirm
        title={"Remove favorite"}
        message={"Do you want to remove this Gif from favorites?"}
        onConfirm={removeGifFromFav}
        onCancel={onRemoveCanceled}
        show={showPopup}
      />

      <div className="overlay-root">
        {children}
        {isLogged ? (
          <div className="actions-bar">
            <svg
              className={isFavorite ? "heart favorite" : "heart"}
              onClick={toggleThisGifFromFavs}
            >
              <path
                d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
              />
            </svg>
            <SHARE_IMG className={"share"} />
          </div>
        ) : null}
      </div>
    </>
  );
}
