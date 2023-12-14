import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "member",
    initialState: {
        memNm: "",
        memNo: null,
        isLoading: false, // optional
    },
    reducers: {
        // login 성공 시
        loginUser: (state, action) => {
            // name, id에 API 값 받아오기
            state.memNm = action.payload.memNm;
            state.memNo = action.payload.memNo;
            // state 변화를 알림
            return state;
        },
        // login 실패 시
        clearUser: (state) => {
            // name, id 값을 비워줌.
            state.memNm = "";
            state.memNo = null;
            // state 변화를 알림
            return state;
        },
    },
});
export const { loginUser, clearUser } = userSlice.actions;
export default userSlice.reducer;