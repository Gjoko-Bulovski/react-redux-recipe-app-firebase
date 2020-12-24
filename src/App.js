import React from "react";
import "./App.css";
import RecipeEntry from "./components/RecipeEntry/RecipeEntry";
import RecipeList from "./components/RecipeList/RecipeList";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import NotFound404 from "./components/NotFound404/NotFound404";
import EditRecipe from "./components/EditRecipe/EditRecipe.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import Reducer from "./Reducer/Reducer";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(Reducer, composeEnhancers(applyMiddleware(thunk)));

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <h1>Recipe App</h1>
          <Switch>
            <Route path="/" exact component={RecipeList} />
            <Route path="/recipes/add" exact component={RecipeEntry} />
            <Route path="/recipes/view/:id" exact component={RecipeDetails} />
            <Route path="/recipes/edit/:id" exact component={EditRecipe} />
            <Route component={NotFound404} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
