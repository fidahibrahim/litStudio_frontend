import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
    _id: string
    name: string;
    email: string;
    password: string;
}

export interface UserState {
    userData: IUser | null;
}

const initialState: UserState = {
    userData: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<IUser|null>) => {
            state.userData = action.payload
        },
        removeUserInfo: (state) => {
            state.userData = null
        }
    }
})

export const { setUserInfo, removeUserInfo } = userSlice.actions
export default userSlice.reducer