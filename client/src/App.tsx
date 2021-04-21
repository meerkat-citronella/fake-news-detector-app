import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { COLORS } from "./constants";
import { NewsClassifier } from "./NewsClassifier";
import { About } from "./About";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 4em;
  box-sizing: border-box;
  padding: 10vh 0;
  min-height: 100vh;
  width: 100vw;
  background: ${COLORS.backgroundDark};

  color: ${COLORS.textPrimary};
  text-align: center;

  h1 {
    font-size: 4em;
    font-weight: 700;
  }

  a {
    color: ${COLORS.border};
  }
`;

const LinkContainer = styled.div`
  display: flex;
  column-gap: 3em;
`;

function App() {
  return (
    <Container>
      <Router>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <NewsClassifier />
          </Route>
        </Switch>
        <LinkContainer>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </LinkContainer>
      </Router>
    </Container>
  );
}

export default App;
