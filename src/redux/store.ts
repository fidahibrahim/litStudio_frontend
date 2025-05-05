import { configureStore } from "@reduxjs/toolkit";
import userSlice, { UserState } from "./userSlice";
import { persistStore, persistReducer } from "redux-persist";
import { PersistPartial } from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: 'user',
    storage,
    whitelist: ['userData'],
}

const persistedUserReducer = persistReducer(persistConfig, userSlice);

export type rootState = {
    user: UserState & PersistPartial
}

const store = configureStore({
    reducer: {
        user: persistedUserReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['user/setUserInfo'], 
            },
        }),

})

export const persistor = persistStore(store)
export default store