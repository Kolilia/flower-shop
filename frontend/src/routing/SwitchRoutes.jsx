import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";

const SwitchRoutes = ({ routes }) => {
  const location = useLocation();

  if (!routes) {
    return null;
  }

  const mapRoutes = (routes || []).map((route, i) => {
    return (
      <Route key={i} path={route.path}>
        <route.component {...route} />
      </Route>
    );
  });

  return <Switch location={location}>{mapRoutes}</Switch>;
};

export default SwitchRoutes;
