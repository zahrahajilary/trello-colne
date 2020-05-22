import { createStore, applyMiddleware } from "redux"
import rootReducer from './reducers/index'
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWare = [thunk]
export default () => {
  let store = createStore(persistedReducer, applyMiddleware(...middleWare));
  let persistor = persistStore(store);
  return { store, persistor };
};
