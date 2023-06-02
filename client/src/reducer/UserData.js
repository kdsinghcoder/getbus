export const UserDatainitialState = {};
export const UserDatareducer = (state, action) => {
    if (action.type === "USERDATA") {
        return action.payload;
    }

    return state;

}