import React from "react";
import { fetchingPosts, fetchPostsSuccess,fetchPosts } from "../../actions/postActions";
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import expect from "expect";
import {
   FETCH_POSTS_SUCCESS,
   FETCH_POSTS,

} from "../../actions/types";
import fetchMock from 'fetch-mock';
let { describe, it } = global;

const posts = [
   {title: "This is the title", body:" another body"},
   {title: "Another title", body:"this is the body"}
];
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe("Test posts actions", ()=>{
   afterEach(()=>{
      fetchMock.restore()
   });
   it('Should create and actions for fetching posts', ()=>{
      const expectedAction = {type: FETCH_POSTS};
      expect(fetchingPosts()).toEqual(expectedAction);
   });
   it('Should create and action for fetching posts success', () => {
      const expectedOutput = {
         type: FETCH_POSTS_SUCCESS,
         payload: posts
      };
      expect(fetchPostsSuccess(posts)).toEqual(expectedOutput)
   });
   it("Test fetching todos is a success", ()=>{
      fetchMock.getOnce('https://jsonplaceholder.typicode.com/todos', {
         body: {todos: ["do something"]},
         headers: {'content-type': "application/json"}
      });
      const expectedActions = [
         { type: FETCH_POSTS },
         { type: FETCH_POSTS_SUCCESS, payload: { todos: ['do something'] } }
      ];
      const store = mockStore({ todos: [] });
      return store.dispatch(fetchPosts()).then(()=>{
         expect(store.getActions()).toEqual(expectedActions)
      })
   })
});