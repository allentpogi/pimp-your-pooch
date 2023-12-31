import React, { useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";

import Home from "./pages/Home";
import Pet from "./pages/Pet";
import Header from "./components/Header";
import MyPack from "./pages/Mypack";
import Footer from "./components/Footer";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  document.body.style = "background: #fafafa;";
  useEffect(() => {
    document.title = "Pimp my pooch";
  }, []);

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <CssBaseline />
      <ApolloProvider client={client}>
        <Router>
          <div>
            <div>
              <Header />
            </div>
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/me" element={<MyPack />} />
                <Route path="/pets/:petId" element={<Pet />} />
              </Routes>
            </main>
            <div>
              <Footer />
            </div>
          </div>
        </Router>
      </ApolloProvider>
    </Box>
  );
}
