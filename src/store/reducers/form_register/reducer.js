import {SERVER_VALID_FAIL} from "./action_types";

export const FormRegister = (state, action) => {
    switch (action.type){
    case SERVER_VALID_FAIL:
        console.log(SERVER_VALID_FAIL,state);
    return state;
    default:
    return state
}
}