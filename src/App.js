import React from "react";
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';

import FormContainer from './js/components/container/FormContainer';
import Posts from "./js/components/container/Home";
import store from "./js/store";
import { Provider } from "react-redux";
import Hook from "./js/components/container/Hooks";

const App = () => {
  return (
      <Provider store={store}>
      <div>
        <Router>
          <div>
            <Switch>
              <Route path="/form">
                  <Hook/>
              </Route>
              <Route exact path="/">
                  <Posts/>
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
      </Provider>
  )
};

export default App;