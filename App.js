/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { Button } from "./Button";
import { Loader } from "./Loader";

import { fetchTicketHours, syncProject } from "./api";

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      numberOfTickets: 0,
      hoursLogged: 0,
      isLoading: false,
      syncDiabled: false
    };
  }

  handleTextInputChange = username => {
    this.setState({ username });
  };

  fetchHours = async () => {
    const { username } = this.state;
    if (!username) {
      return;
    }
    this.setState({ isLoading: true });

    const { numberOfTickets, hoursLogged } = await fetchTicketHours(
      "XA",
      username
    );
    this.setState({
      numberOfTickets,
      hoursLogged,
      isLoading: false
    });
  };

  sync = async () => {
    this.setState({ isLoading: true, syncDiabled: true });
    setTimeout(() => this.setState({ syncDiabled: false }), 15000);
    await syncProject("XA");
    this.setState({ isLoading: false });
  };

  render() {
    const { hoursLogged, isLoading, numberOfTickets, syncDiabled } = this.state;
    return (
      <View style={styles.root}>
        {isLoading && <Loader />}
        <Text style={styles.instructions}>Username: </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={this.handleTextInputChange}
          value={this.state.username}
        />
        <Button
          title="Get Hours"
          style={styles.button}
          onPress={this.fetchHours}
        />
        <Button
          title="Sync"
          style={styles.button}
          disabled={syncDiabled}
          onPress={this.sync}
        />
        <Text>{numberOfTickets}</Text>
        <Text>{hoursLogged}</Text>
        <Text>{syncDiabled.toString()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    padding: 32
  },
  textInput: {
    color: "green",
    width: 300,
    height: 40
  }
});
