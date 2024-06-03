// rootReducer.js
import { combineReducers } from "redux";
import {configureStore} from "@reduxjs/toolkit"
import userInfoReducer  from "./auth/userInfoReducer";
import ProductsReducer from "./Product/product";
import TransactionsReducer from "./transactions/transactions"
import {settingsApi} from "../../api/settings/settingsApi";


export function makeStore(){
  return configureStore({
    reducer: {
      userInfo: userInfoReducer,
      products: ProductsReducer,
      transactions: TransactionsReducer,
      [settingsApi.reducerPath]: settingsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(settingsApi.middleware),
  })
} 

const store = makeStore()

export default store
