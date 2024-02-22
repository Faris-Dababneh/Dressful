import React, { useState } from 'react';
import cheerio from 'cheerio';
import axios from 'axios';

// SMH, look up how to make an Amazon scraper or find an actual API that works and is good

async function AmazonScraper() {
  console.log('here')
  
  const options = {
    method: 'GET',
    url: 'https://amazon-data-scraper128.p.rapidapi.com/search/macbook',
    params: {
      api_key: '214fce8e1f0329d7b9d8bf1002dc9fd2'
    },
    headers: {
      'X-RapidAPI-Key': '27e0c073b5msh2dde25fa9fb08dfp1380dcjsn56bdbd7473f6',
      'X-RapidAPI-Host': 'amazon-data-scraper128.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }

};

export default AmazonScraper;
