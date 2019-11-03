import {
    FETCH_POSTS,
    FETCH_POSTS_SUCCESS,
} from "./types";

export const fetchingPosts = () => ({
    type: FETCH_POSTS
});

export const fetchPostsSuccess = posts => ({
    type: FETCH_POSTS_SUCCESS,
    payload: posts
});

export const fetchPosts = () => dispatch => {
    dispatch(fetchingPosts());
    return fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => dispatch(fetchPostsSuccess(json)))
};