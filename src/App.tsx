import './App.css'
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { BrowserRouter,Route, RouteObject, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { mainRouter } from './routers/main-router';


function renderRoutes(routesObj: RouteObject[]) {


  return routesObj.map((route) => {
    if (route.children) {
      return (
        <Route
          key={route.path}
          path={route.path}
          index={route.index}
          element={route.element}
        >
          {route.children ? renderRoutes(route.children) : null}
        </Route>
      );
    }

    return (
      <Route
        key={route.path}
        path={route.path}
        index={route.index}
        element={route.element}
      />
    );
  });
}

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            {renderRoutes(mainRouter)}
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
