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
        {isLoading && <Loader style={styles.loader} />}
        <View style={styles.content}>
          <View style={styles.inputAndButton}>
            <View style={styles.textInputContainer}>
              <Text style={styles.label}>Username: </Text>
              <TextInput
                style={styles.textInput}
                onChangeText={this.handleTextInputChange}
                value={this.state.username}
              />
            </View>
            <Button title="Get Hours" onPress={this.fetchHours} />
          </View>
          <View style={styles.result}>
            {!isLoading && !!numberOfTickets && (
              <React.Fragment>
                <Text>{`Number of Tickets: ${numberOfTickets}`}</Text>
                <Text>{`Hours Logged: ${hoursLogged} hours`}</Text>
              </React.Fragment>
            )}
          </View>
        </View>
        <Button
          title="Sync Project"
          style={styles.syncButton}
          disabled={syncDiabled}
          onPress={this.sync}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    padding: 32,
    height: "100%",
    width: "100%"
  },
  loader: {
    position: "absolute",
    right: 32,
    top: 32
  },
  content: {},
  inputAndButton: {
    width: "55%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  textInputContainer: {},
  label: {
    marginBottom: 8
  },
  textInput: {
    color: "green",
    width: 300,
    height: 30
  },
  result: {
    marginTop: 16,
    height: 100
  },
  syncButton: {
    position: "absolute",
    right: 32,
    bottom: 32
  }
});
