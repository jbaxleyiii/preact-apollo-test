import { h, Component } from "preact";
import {
  ApolloProvider,
  ApolloClient,
  createNetworkInterface,
  graphql,
} from "react-apollo";
import gql from "graphql-tag";

import logo from "./logo.svg";
import "./App.css";

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: "https://mpjk0plp9.lp.gql.zone/graphql",
  }),
});

const QUERY = gql`
  query Hero($episode: Episode) {
    hero(episode: $episode) {
      name
    }
  }
`;

const Hero = graphql(QUERY)(({ data }) => {
  if (data.loading) return <div>loading...</div>;
  return <h1>{data.hero.name}</h1>;
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Peact and Apollo</h2>
          </div>
          <Hero episode="JEDI" />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
