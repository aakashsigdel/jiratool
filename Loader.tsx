import React from 'react';
import {ActivityIndicator, View} from 'react-native';

export const Loader = props => (
  <View style={props.style}>
    <ActivityIndicator size="small" color="#00ff00" />
  </View>
);
