import React from "react";
import { useState } from "react";
import {
  HeartIcon,
} from "@heroicons/react/solid";

export const FavoritesPosts = ({ username, struct }) => {
  const { _id, user, image, title, description, favorite } = struct;
  //console.log("! " + struct._id);
  //console.log("! " + struct.user);
  const [favoriteState, setFavoriteState] = useState(true);

  async function patchFavorite() {
    try {
      const token = localStorage.getItem("token");
      //console.log("ID -> " + _id);
      fetch(`https://posts-pw2021.herokuapp.com/api/v1/post/fav/${_id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
      /*const { put } = axios.patch(
        `https://posts-pw2021.herokuapp.com/api/v1/post/fav/` + _id,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );*/

      if (!favoriteState) {
        setFavoriteState(true);
      } else {
        setFavoriteState(false);
      }
      Reload();
    } catch (error) {
      console.log(error);
    }
  }

  const timeOut = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  async function Reload() {
    await timeOut(2 * 1000);
    window.location.reload();
  }

  return (
    <div className="flex flex-col bg-gray-300 bg-opacity-30 rounded-2xl w-80 h-full p-4 text-white my-4 ml-3 mr-3">
      <div className="w-full flex space-around font-bold text-black flex-row">
        <h1 className="w-1/2 text-indigo-800">{user?.username}</h1>
        <button type="button" className="ml-24" onClick={patchFavorite}>
          {favorite ? (
            <HeartIcon
              className={` w-5 h-5 text-red-500 ml-20 ${
                favoriteState && "text-gray-700"
              }`}
            />
          ) : (
            <HeartIcon
              className={` w-5 h-5 text-gray-700 ml-20 ${
                favoriteState && "text-red-500"
              }`}
            />
          )}
        </button>
      </div>
      {image && (
        <img
          className="w-full h-40 object-cover my-2 rounded-2xl"
          src={image}
          alt="image post"
        />
      )}
      <div>
        <h1 className="text-gray-900 italic font-semibold ">{title}</h1>
        <h4 className="text-gray-700">{description}</h4>
        <div className="w-full  flex mt-2">
        </div>
      </div>
    </div>
  );
};
