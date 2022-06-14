import React from "react";
import { Fragment, Component } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../Context/UserContext";
import axios from "axios";
import { useState, useEffect } from "react";
//import { FavoritePost } from "./FavoritePost";
import { FavoritesPosts } from "./FavoritesPosts";

export const FavoritesID = ({ favoritesID }) => {
  const [postFavorites, setPostFavorites] = useState([]);
  //console.log("Array de IDs -> " + favoritesID);
  //console.log("Tamanio del array -> " + favoritesID.length);
  //console.log("Tamanio del array -> " + tamanio);
  var token = localStorage.getItem("token");

  useEffect(() => {
    //console.log("dsgdgsdgsdg");
    async function getPosts() {
      const { data: response } = await axios.get(
        `https://posts-pw2021.herokuapp.com/api/v1/post/one/${favoritesID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log(response);
      //console.log(JSON.stringify(response))
      setPostFavorites(response);
    }
    getPosts();
  }, []);
  //console.log("------------");
  //console.log("@@@@ "+postFavorites);

  //console.log("Estoy mostrando los ID de mis favoritos -> " + postFavorites);

  function Cambio() {
    if (postFavorites != undefined) {
      return <FavoritesPosts username={postFavorites} struct={postFavorites} />
    }
    return <div/>;
  }

  return (
      <Cambio></Cambio>
  );
};
