import App from "containers/App";
import history from "misc/history";
import Loader from "components/Loader";
import React, { FC, lazy, Suspense } from "react";
import PrivateRoute from "containers/private-route";
import { Route, Router, Switch, Redirect } from "react-router-dom";

const Wrapper: FC = () => {
  return (
    <Router history={history}>
      <App>
        <Suspense fallback={<Loader />}>
          <Switch>
            <PrivateRoute
              exact
              path="/users"
              component={lazy(() => import("pages/user-list"))}
            />
            <PrivateRoute
              exact
              path="/users/:id/edit"
              component={lazy(() => import("pages/user-edit"))}
            />
            <PrivateRoute
              exact
              path="/schools"
              component={lazy(() => import("pages/school-list"))}
            />
            <PrivateRoute
              exact
              path="/schools/new"
              component={lazy(() => import("pages/school-edit"))}
            />
            <PrivateRoute
              exact
              path="/schools/:id/edit"
              component={lazy(() => import("pages/school-edit"))}
            />
            <PrivateRoute
              exact
              path="/classes"
              component={lazy(() => import("pages/class-list"))}
            />
            <PrivateRoute
              exact
              path="/classes/new"
              component={lazy(() => import("pages/class-edit"))}
            />
            <PrivateRoute
              exact
              path="/classes/:id/edit"
              component={lazy(() => import("pages/class-edit"))}
            />
            <Route
              exact
              path="/login"
              component={lazy(() => import("pages/login"))}
            />
            <Redirect to="/schools" />
          </Switch>
        </Suspense>
      </App>
    </Router>
  );
};

export default Wrapper;
