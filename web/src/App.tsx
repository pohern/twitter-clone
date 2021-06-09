import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import React from "react";
import "./App.css";
import Users from "./components/Users";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import { setContext } from "apollo-link-context";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import IsAuthenticated from "./components/isAuthenticated";
import Profile from "./pages/Profile";

const httpLink = new HttpLink({ uri: "http://localhost:4000" });
const authLink = setContext(async (req, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const link = authLink.concat(httpLink as any)
const client = new ApolloClient({
  link: (link as any),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path='/landing'>
            <Landing />
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <IsAuthenticated>
            <Route path='/users'>
              <Users />
            </Route>
            <Route path='/profile'>
              <Profile />
            </Route>
          </IsAuthenticated>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
