const BASE_URL = "https://posts-pw2021.herokuapp.com/api/v1";

export const useServices = {
  
  login: async (username, password) => {
    try {
      console.log("userServices -> user y pass " + { username, password });
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      };

      const response = await fetch(`${BASE_URL}/auth/signin`, config);

      console.log("userServices -> response " + { response });
      if (response.ok) {
        const data = await response.json();
        console.log("userServices -> data " + data)
        return data; // token y role
      }
    } catch (error) {
      console.error(error);
      return {};
    }
  },

  verifyToken: async (token) => {
    try {
      const config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(`${BASE_URL}/auth/whoami`, config);
      if (response.ok) {
        const data = await response.json();
        return data; // username y role
      }
    } catch (error) {
      return {};
    }
  },

  verifyImg: async (title) => {
    try {
      const config = {
        method: "GET",
        headers: {
          "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
          "x-rapidapi-key":
            "e6f04d311cmsh17b45e1bec7d6e5p1b79f3jsn1ed261ab2fba",
        },
      };

      const response = await fetch(
        `https://rawg-video-games-database.p.rapidapi.com/games?key=bb82783b860242fabe290f20cfb58723&search=${title}/`,
        config
      );

      if (response.ok) {
        const data = await response.json();
        console.log("userServices -> data del juego " + data);
        return data; // url de la imagen del juego solicitado
      }
    } catch (error) {
      console.error(error);
      return {};
    }
  },

};
