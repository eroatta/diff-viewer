import React, { Component } from "react";
import { ReactGhLikeDiff } from "react-gh-like-diff";
import fetch from "unfetch";
import "react-gh-like-diff/dist/css/diff2html.min.css";

const API_URL = process.env.REACT_APP_API_URL;

class App extends Component {
  state = {
    past: "",
    current: ""
  };

  url = window.location.pathname;
  title = this.url.replace("/differences/", "");

  separator = this.title.indexOf("/", this.title.indexOf("/")+1);
  repo = this.title.substr(0, this.separator);
  file = this.title.substr(this.separator+1);

  past = API_URL + "/files/originals/" + this.repo + "/" + this.file;
  current = API_URL + "/files/rewritten/" + this.repo + "/" + this.file;

  componentDidMount() {
    fetch(this.past)
      .then(response => response.text())
      .then(past => this.setState({ past }));

    fetch(this.current)
      .then(response => response.text())
      .then(current => this.setState({ current }));
  }

  render() {
    return (
      <div className="App">
        <ReactGhLikeDiff
          options={{
            originalFileName: this.title,
            updatedFileName: this.title
          }}
          past={this.state.past}
          current={this.state.current}
        />
      </div>
    );
  }
}

export default App;
