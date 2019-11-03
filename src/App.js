import React from "react";
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';

import FormContainer from './js/components/container/FormContainer';
import Posts from "./js/components/container/Home";
import store from "./js/store";
import { Provider } from "react-redux";

const App = () => {
  return (
      <Provider store={store}>
      <div>
        <Router>
          <div>
            <Switch>
              <Route path="/form">
                  <FormContainer/>
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