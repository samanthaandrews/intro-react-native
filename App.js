import React from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from "react-native";

export default class App extends React.Component {
  state = {
    text: "",
    results: []
  };

  handleSongTitleSearch = userInput => {
    this.setState({ text: userInput });
  };

  searchItunes = term => {
    return fetch(`https:/itunes.apple.com/search?term=${term}`).then(res =>
      res.json()
    );
  };

  handleSearch = () => {
    const term = this.state.text.replace(/ /g, "+");
    this.searchItunes(term).then(res =>
      this.setState({
        results: res.results
      })
    );
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.instructionText}>Search for a song by title</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Song title"
            onChangeText={userInput => this.handleSongTitleSearch(userInput)}
            value={this.state.text}
          />
          <TouchableHighlight style={styles.searchButton}>
            <Text style={styles.searchButtonText} onPress={this.handleSearch}>
              Search
            </Text>
          </TouchableHighlight>
          {console.log(this.state.results)}
        </View>
        {this.state.results.length > 0 &&
          this.state.results.map((song, index) => {
            return (
              <Text key={index}>
                {song.trackName} by {song.artistName}
              </Text>
            );
          })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 20
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  instructionText: {
    color: "#207a99",
    fontWeight: "bold",
    fontSize: 20
  },
  searchInput: {
    width: 180,
    backgroundColor: "white",
    height: 30,
    margin: 10,
    padding: 5
  },
  searchButton: {
    height: 30,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#207a99",
    borderRadius: 2
  },
  searchButtonText: {
    color: "#fff"
  }
});
