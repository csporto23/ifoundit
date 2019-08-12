import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Multiplayer from "../pages/Multiplayer";
import Homepage from "../pages/Homepage";
import Wrapper from "../Wrapper/index";
import Singleplayer from "../pages/Singleplayer"
import Online from "../pages/Online"


function App() {
  return (
    <Router>
      <div>
        <Wrapper>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/Homepage" component={Homepage} />
          <Route exact path="/Multiplayer" component={Multiplayer} />
          <Route exact path="/Singleplayer" component={Singleplayer} />
          
        </Wrapper>
      </div>
    </Router>
  );
}

export default App;