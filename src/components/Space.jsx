import {View} from 'react-native';
import React from 'react';

const Space = ({Height, Width}) => {
  return (
    <View
      style={{
        height: Height ? Height : 10,
        width: Width ? Width : 10,
      }}/>
  );
};

export default Space;
