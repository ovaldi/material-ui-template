import thunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "store/reducers";
import storage from "redux-persist/lib/storage";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

const middlewares =
  process.env.NODE_ENV === "production" ? [thunk] : [thunk, logger];

const store = createStore(
  persistReducer(
    {
      key: "root",
      storage,
      whitelist: ["auth"]
    },
    reducers
  ),
  composeWithDevTools({})(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);
export default store;
