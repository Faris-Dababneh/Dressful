import React, {useEffect, useState} from "react";
import OpenAI from "openai";
import axios from 'axios';
import URLToPNG from "./URLToPNG";
import { getKey } from "../Database";



async function main(inputText) {
    // MAKE SURE THIS IS HIDDEN ON PRODUCTION
    const openai = new OpenAI({ apiKey: await getKey('openAI'), dangerouslyAllowBrowser: true});

    // MAKE SURE THIS IS HIDDEN ON PRODUCTION
    const API_KEY = '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';
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: inputText }],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content;
}

async function OutfitReader(gender, age, weight, height, occasion, style, temperature, isCustom)
{
  let inputText;
  if (isCustom) {
    inputText = `Generate an outfit for a ${gender} aged ${age}, weighs ${weight} pounds, is ${height} inches tall, who needs an outfit for the following situation: '${occasion}'. When listing the items in the outfit, list the item in the following exact format: 'part: item, part: item' where part represents where each clothing item is worn which is either 'head', 'upper', 'lower', 'feet') and item is the clothing item. Note that not every outfit will have an item worn on one of these body parts. In that case, you can list the item as 'none.' Additionally, some outfits may have multiple items worn on the same body part, so ensure you include that if needed.`;
    console.log(inputText)
  } else {
    inputText = `Generate an outfit for a ${gender} aged ${age}, weighs ${weight} pounds, is ${height} inches tall, who needs an outfit for the following situation: '${occasion}', is feeling ${style}, and it is ${temperature} degrees outside. When listing the items in the outfit, list the item in the following exact format: 'part: item, part: item' where part represents where each clothing item is worn which is either 'head', 'upper', 'lower', 'feet') and item is the clothing item. Note that not every outfit will have an item worn on one of these body parts. In that case, you can list the item as 'none.' Additionally, some outfits may have multiple items worn on the same body part, so ensure you include that if needed.`;
    console.log(inputText)
  }

  const returnText = await main(inputText);
  console.log(returnText);

  const categorizedItems = {
    headWear: [],
    upperWear: [],
    lowerWear: [],
    footWear: [],
  };

 
  const items = returnText.split(',').map((item) => item.trim()); // the variable would be in this format ['upper: shirt', 'lower: shorts', 'feet: shoes']
  items.forEach(async (item) => {
      // Gets the actual clothing item from the item string
      const clothing = item.substring(item.indexOf(':') + 1);

      if (clothing.toLowerCase().includes('none') || clothing.includes('empty') || clothing.includes('part')) {
        return;
      }
      
      // MAKE SURE YOU HIDE API KEY ON PRODUCTION
      const options = {
        method: 'GET',
        url: 'https://real-time-amazon-data.p.rapidapi.com/search',
        params: {
          query: `${gender}_${clothing}`,
          page: '1',
          country: 'US',
          category_id: 'aps'
        },
        headers: {
          'X-RapidAPI-Key': `${await getKey('rapidAPI')}`,
          'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
        }
      };
      let response;
      try {
        response = await axios.request(options);
        console.log(response.data.data); 
        console.log(response.data.data.products); 
      } catch (error) {
        console.error(error);
      }

      //const asin = response.data.results[0].asin;
      //const url = `https://www.amazon.com/dp/${asin}`;
      let url = 'https://www.amazon.com/ref=nav_logo';
      let image = '';

      try {
        url = await response.data.data.products[0].product_url; // ?&_encoding=UTF8&tag=dressful09-20&linkCode=ur2&linkId=bed16f27f02656ceeed8c569279af95d&camp=1789&creative=9325
        console.log(response.data.data.products[0]);
        image = await response.data.data.products[0].product_photo;
      } catch (error) {
        console.log('Waiting for API...');
      }
      
      //let affiliateURL = url.slice(0, url.indexOf('/ref')); // removes the end part of the amazon link
      let affiliateURL = url + '?&linkCode=ll1&tag=dressful09-20&'; // adds Dressful affiliate tag

      let array = [affiliateURL, image];
      if (item.toLowerCase().includes('head')) {
        categorizedItems.headWear.push([...array]);
      } else if (item.toLowerCase().includes('upper')) {
        categorizedItems.upperWear.push([...array]);
      } else if (item.toLowerCase().includes('lower')) {
        categorizedItems.lowerWear.push([...array]);
      } else if (item.toLowerCase().includes('feet')) {
        categorizedItems.footWear.push([...array]);
      }
    
  });
  
  //?th=1&linkCode=ll1&tag=dressful09-20& (affiliate tag)

  console.log(categorizedItems);
  return categorizedItems;
}

export default OutfitReader;

/*
OLD API:

const options = {
        method: 'GET',
        url: `https://amazon-data-scraper128.p.rapidapi.com/search/${gender}_${clothing}`,
        params: {
          api_key: await getKey('amazonScraper')
        },
        headers: {
          'X-RapidAPI-Key': '27e0c073b5msh2dde25fa9fb08dfp1380dcjsn56bdbd7473f6',
          'X-RapidAPI-Host': 'amazon-data-scraper128.p.rapidapi.com'
        }
      };
      let response;
      try {
        response = await axios.request(options);
        console.log(response.data); 
      } catch (error) {
        console.error(error);
      }
      affiliateURL += '?th=1&linkCode=ll1&tag=dressful09-20&'; // adds Dressful affiliate tag
*/