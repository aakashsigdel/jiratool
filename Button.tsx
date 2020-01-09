import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  disabled: boolean;
  style: any;
};

export const Button = (props: Props) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[styles.button, props.style]}
    activeOpacity={0.6}
    disabled={props.disabled}>
    <Text style={styles.buttonText}>{props.title.toUpperCase()}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: 150,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#1976d2',
    borderWidth: 1,
    borderColor: 'rgba(25, 118, 210, 0.5)',
    minWidth: 64,
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: '500',
    lineHeight: 1.75,
  },
});
