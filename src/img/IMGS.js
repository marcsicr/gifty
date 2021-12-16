import React from "react";

export function SPORTS_IMG() {
  return (
    <>
      <img width="25" height="25" src="/static/svg/sports.svg" alt="sports" />
    </>
  );
}

export function ANIMALS_IMG() {
  return (
    <>
      <img width="25" height="25" src="/static/svg/animals.svg" alt="animals" />
    </>
  );
}

export function MUSIC_IMG() {
  return (
    <>
      <img width="25" height="25" src="/static/svg/music.svg" alt="music" />
    </>
  );
}

export function SHARE_IMG({ className }) {
  return (
    <svg width="25" height="25" className={className}>
      <image xlinkHref={"/static/svg/share.svg"} width="25" height="25" />
    </svg>
  );
}
