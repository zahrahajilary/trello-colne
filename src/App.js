import React from 'react';
import { Provider } from 'react-redux';
import Store from './store';
import Home from './Components/Home/Home'
import { PersistGate } from "redux-persist/integration/react";
const { persistor, store } = Store();
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Home />
        </div>
      </PersistGate>
    </Provider>
  );
}



export default App;
