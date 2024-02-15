"use client"
import { Card } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';

export const Modselect = ({ mID, API_KEY }) => {
  const [cardList, setCardList] = useState([])
//   useEffect(() => {
//     getSolution().then((response) => {
//         // setCardList(response)
//     })
    
// }, []);
  const getSolution = async () => {
    let result = await fetch('/solution?id=' + mID)
    const json = await result.json()
    console.log('json', json)
  }
  return (
    <Card>
      MODSELECT
      <div>
        <p>mID: {mID}</p>
        <p>API_KEY: {API_KEY}</p>
      </div>
    </Card>
  );
};