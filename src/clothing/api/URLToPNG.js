import React from "react";
import axios from "axios";
import imglyRemoveBackground from "@imgly/background-removal"

async function URLToPNG(url) {
    // https://rapidapi.com/objectcut.api/api/background-removal
    // MAKE SURE YOU HIDE API KEY ON PRODUCTION

    const options = {
      method: 'GET',
      url: 'https://remove-background-of-any-image-object.p.rapidapi.com/rembg',
      params: {
        url: url
      },
      headers: {
        'X-RapidAPI-Key': '27e0c073b5msh2dde25fa9fb08dfp1380dcjsn56bdbd7473f6',
        'X-RapidAPI-Host': 'remove-background-of-any-image-object.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
}

export default URLToPNG;
