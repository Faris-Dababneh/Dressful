import React, {useEffect, useState} from "react";
import OpenAI from "openai";
import axios from 'axios';
import URLToPNG from "./URLToPNG";
import { getKey } from "../Database";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";


async function main(inputText) {
    // MAKE SURE THIS IS HIDDEN ON PRODUCTION
    const openai = new OpenAI({ apiKey: getKey('openAIAPI'), dangerouslyAllowBrowser: true});

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
    inputText = `Generate an outfit for a ${gender} aged ${age}, weighs ${weight} pounds, is ${height} inches tall, who needs an outfit for the following situation: '${occasion}'. When listing the items in the outfit, list the item in the following exact format: "part: item, part: item" where part represents where each clothing item is worn (either head, upper, lower, feet) and item is the clothing item. Note that not every outfit will have an item worn on one of these body parts. In that case, you can list the item as "part: none." Additionally, some outfits may have multiple items worn on the same body part, so ensure you include an additional "part: item" item for this case.`;
    console.log(inputText)
  } else {
    inputText = `Generate an outfit for a ${gender} aged ${age}, weighs ${weight} pounds, is ${height} inches tall, who needs an outfit for a ${occasion}, is feeling ${style}, and it is ${temperature} degrees outside. When listing the items in the outfit, list the item in the following exact format: "part: item, part: item" where part represents where each clothing item is worn (either head, upper, lower, feet) and item is the clothing item. Note that not every outfit will have an item worn on one of these body parts. In that case, you can list the item as "part: none." Additionally, some outfits may have multiple items worn on the same body part, so ensure you include an additional "part: item" for this case.`;
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

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay));
  }
 
  const items = returnText.split(',').map((item) => item.trim()); // the variable would be in this format ['upper: shirt', 'lower: shorts', 'feet: shoes']
  items.forEach(async (item) => {
    // Gets the actual clothing item from the item string
    const clothing = item.substring(item.indexOf(':') + 1);

    if (clothing.toLowerCase().includes('none') || clothing.includes('empty')) {
      return;
    }
    // https://rapidapi.com/bharatcodewolf/api/amazon-data-scraper128/pricing
    // MAKE SURE YOU HIDE API KEY ON PRODUCTION
    const options = {
      method: 'GET',
      url: `https://amazon-data-scraper128.p.rapidapi.com/search/${gender}_${clothing}`,
      params: {
        api_key: getKey('amazonScraperAPI')
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

    //const asin = response.data.results[0].asin;
    //const url = `https://www.amazon.com/dp/${asin}`;
    
    const url = await response.data.results[0].url;
    let affiliateURL = url.slice(0, url.indexOf('/ref')); // removes the end part of the amazon link
    affiliateURL += '?th=1&linkCode=ll1&tag=dressful09-20&'; // adds Dressful affiliate tag

    let array = [affiliateURL, response.data.results[0].image];
    if (item.toLowerCase().includes('head')) {
      categorizedItems.headWear.push([...array]);
    } else if (item.toLowerCase().includes('upper')) {
      categorizedItems.upperWear.push([...array]);
    } else if (item.toLowerCase().includes('lower')) {
      categorizedItems.lowerWear.push([...array]);
    } else if (item.toLowerCase().includes('feet')) {
      categorizedItems.footWear.push([...array]);
    }

    await timeout(1000);
  });
  
  // https://rapidapi.com/bharatcodewolf/api/amazon-data-scraper128 (api link)
  //?th=1&linkCode=ll1&tag=dressful09-20& (affiliate tag)

  console.log(categorizedItems);
  return categorizedItems;
}

export default OutfitReader;

