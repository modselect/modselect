import { Card } from '@radix-ui/themes';
import React from 'react';

export const Modselect = ({ mID, API_KEY }) => {
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