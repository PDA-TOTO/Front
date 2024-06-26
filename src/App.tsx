import "./App.css";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { BrowserRouter, Route, RouteObject, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { loginRouter, mainRouter, unloginRouter } from "./routers/main-router";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "@mantine/core/styles.css";
import { theme } from "./styles/Theme";
import PrivateRoute from "./routes/Routing/PrivateRoute";
import PublicRoute from "./routes/Routing/PublicRoute";

function renderRoutes(routesObj: RouteObject[], type: number) {
  return routesObj.map((route) => {
    if (route.children) {
      return (
        <Route
          key={route.path}
          path={route.path}
          index={route.index}
          element={route.element}
        >
          {route.children ? renderRoutes(route.children, type) : null}
        </Route>
      );
    }

    return (
      <Route
        key={route.path}
        path={route.path}
        index={route.index}
        element={
          type === 0 ? (
            <PrivateRoute component={route.element} />
          ) : type === 1 ? (
            <PublicRoute component={route.element} />
          ) : (
            route.element
          )
        }
      />
    );
  });
}

function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              {renderRoutes(loginRouter, 0)}
              {renderRoutes(unloginRouter, 1)}
              {renderRoutes(mainRouter, 2)}
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </MantineProvider>
  );
}

export default App;
