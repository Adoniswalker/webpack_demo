import {
    FETCH_POSTS,
    FETCH_POSTS_SUCCESS,
} from "../actions/types";


const initialState = {
    items: [],
    // item: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                loading: true
            };
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload
            };
        // case NEW_POST:
        //     return {
        //         ...state,
        //         item: action.payload
        //     };
        default:
            return state;
    }
};
