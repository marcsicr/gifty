import { GIFTY_API_URL } from "./giftyAPISettings";

export async function loginService({ username, password }) {
  const response = await fetch(GIFTY_API_URL + "/user/login", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, pwd: password }),
  }).catch((error) => {
    console.error("login service fetch failed: " + error.message);
    return { success: false, jwt: "", username: "" };
  });

  if (response.ok) {
    const parsedResponse = await response.json();
    const { success } = parsedResponse;

    if (!success) {
      const { errorMsg } = parsedResponse;
      console.log(`Login failed reason ${errorMsg}`);
      return { success: false, jwt: "", username: "" };
    }

    const { data } = parsedResponse;

    const { user, jwt } = data;
    const { username, settings } = user;
    return { success: success, username, jwt, userSettings: settings };
  } else {
    return { success: false, jwt: "", username: "" };
  }
}

export async function registerService({ username, password }) {
  const response = await fetch(GIFTY_API_URL + "/user/register", {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).catch((error) => {
    console.error("register service failed" + error.message);
    return { success: false };
  });

  if (response.ok) {
    const data = await response.json();
    const { error, errorMsg } = data;
    return { error, errorMsg };
  } else {
    return { success: false };
  }
}

export async function addGifToFavorites(idGif, jwt) {
  const response = await fetch(GIFTY_API_URL + `/user/favorites/${idGif}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ idGif: idGif }),
  }).catch((error) => {
    console.error("adding gif to favorites service failed" + error.message);
    return false;
  });

  if (response.ok || response.status === 201) {
    return true;
  }

  return false;
}

export async function removeGifFavorites(jwt, idGif) {
  const response = await fetch(GIFTY_API_URL + `/user/favorites/${idGif}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${jwt}` },
  }).catch((error) => {
    console.error("register service failed" + error.message);
    return false;
  });

  if (response.ok) {
    return true;
  }

  return false;
}

export async function getGifFavorites(jwt) {
  const response = await fetch(GIFTY_API_URL + "/user/favorites", {
    method: "GET",
    headers: { Authorization: `Bearer ${jwt}` },
  }).catch((error) => {
    console.error("register service failed" + error.message);
    return [];
  });

  if (response.ok) {
    const parsedResponse = await response.json();
    const { gifs } = parsedResponse.data;
    return gifs;
  }

  return [];
}

export async function updateAvatarImage(jwt, formData) {
  //https://arunrajeevan.medium.com/fetch-api-and-formdata-in-html-world-6b0322273260

  const response = await fetch(GIFTY_API_URL + "/user/settings/avatar", {
    method: "PUT",
    headers: { Authorization: `Bearer ${jwt}` },
    body: formData,
  }).catch((error) => {
    console.error("Updating avatar failed" + error.message);
    return false;
  });

  return response.ok;
}

export async function getAvatarImage(jwt) {
  const response = await fetch(GIFTY_API_URL + "/user/settings/avatar", {
    method: "GET",
    headers: { Authorization: `Bearer ${jwt}` },
  }).catch((error) => {
    console.error("Getting avatar failed:" + error.message);
  });

  if (response.ok) {
    let imgBlob = await response.blob();
    return { success: true, blob: imgBlob };
  } else {
    return { success: false };
  }
}

export async function getUserSettings(jwt) {
  const response = await fetch(GIFTY_API_URL + "/user/settings", {
    method: "GET",
    mode: "cors",
    headers: { Authorization: `Bearer ${jwt}` },
  }).catch((error) => {
    console.error("Getting settings failed:" + error.message);
  });

  //console.log(response)
  if (response.ok) {
    const { data } = await response.json();
    return { success: true, data };
  } else if (response.status === 304) {
    return { success: true };
  } else {
    return { success: false };
  }
}

export async function saveUserAccountSettings({
  jwt,
  displayName,
  email,
  about,
}) {
  const response = await fetch(GIFTY_API_URL + "/user/settings/account", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      displayName: displayName,
      email: email,
      about: about,
    }),
  }).catch((error) => {
    console.error("Updating settings failed:" + error.message);
    return { sucess: false, errorMsg: error.message };
  });

  if (response.ok) {
    return { success: true };
  } else {
    return { success: false, errorMsg: "Unexpected error" };
  }
}

export async function saveUserRattingSettings({ jwt, rating }) {
  const response = await fetch(GIFTY_API_URL + "/user/settings/rating", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rating: rating }),
  }).catch((error) => {
    console.error("Updating ratting settings failed:" + error.message);
    return { sucess: false, errorMsg: error.message };
  });

  if (response.ok) {
    const {data} = await response.json()
    const {user} = data
    const {settings} = user
    return { success: true, settings };
  } else {
    return { success: false, errorMsg: "Unexpected error" };
  }
}

export async function updateUserPassword({ jwt, currentPwd, newPwd }) {
  const response = await fetch(GIFTY_API_URL + "/user/settings/password", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ currentPwd, newPwd }),
  }).catch((error) => {
    console.error("Updating password failed:" + error.message);
    return { sucess: false, errorMsg: error.message };
  });

  if (response.ok) {
    return { success: true };
  } else {
    return { success: false, errorMsg: "Unexpected error" };
  }
}

export async function existsUser({ username }) {
  const response = await fetch(GIFTY_API_URL + `/user/exists/${username}`, {
    method: "HEAD",
  }).catch((error) => {
    console.error("register service failed" + error.message);
    return { error: false };
  });

  if (response.ok) {
    return { exists: true };
  } else {
    return { exists: false };
  }
}
