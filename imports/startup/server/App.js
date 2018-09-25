import Provider from "react-redux/es/components/Provider";
import {StaticRouter} from "react-router";
import routes from "../both/routes";
import {object} from "prop-types";
import React from "react";

export const App = ({store, location, context}) => (
  <Provider store={store}>
    <StaticRouter location={location} context={context}>
      {routes}
    </StaticRouter>
  </Provider>
);

App.propTypes = {
  location: object.isRequired,
};

console.log('import App');
export default App;
