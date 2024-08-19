# React Redux Action Creator + Normalizr

## Resources

Below are the resources to help you understand the key concepts:

- [Normalizr](https://github.com/paularmstrong/normalizr)
- [Normalizing State Shape](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape)
- [Redux Getting Started and Core Concepts](https://redux.js.org/introduction/getting-started)
- [Redux Actions](https://redux.js.org/basics/actions)
- [Async Actions](https://redux.js.org/advanced/async-actions)
- [Writing Tests for Redux](https://redux.js.org/recipes/writing-tests)

## Learning Objectives

By following this guide, you will learn:

1. **Normalizr’s Purpose and How to Use It**:

   - Understand how Normalizr helps in transforming nested JSON data into a flat structure, making it easier to manage and update in your Redux store.

2. **Schemas and Normalization of Nested JSON**:

   - Learn how to define schemas with Normalizr to normalize deeply nested JSON responses from APIs.

3. **Core Concepts of Redux**:

   - Get familiar with Redux's core concepts, including actions, reducers, and the store, which form the foundation of managing state in your React applications.

4. **Redux Actions**:

   - Explore how to define actions in Redux, which are plain JavaScript objects that represent a change in state.

5. **Redux Action Creators**:

   - Learn to create action creators, which are functions that return an action object, to simplify dispatching actions and handling side effects.

6. **Async Actions in Redux**:

   - Delve into handling asynchronous operations in Redux using middleware like Redux Thunk, and learn to dispatch actions based on the results of async operations.

7. **How to Write Tests for Redux**:
   - Understand the best practices for writing unit tests for your Redux logic, ensuring the reliability and correctness of your actions, reducers, and store.

## Getting Started

### Installation

To get started with Redux and Normalizr, install the required packages using npm or yarn:

```bash
npm install redux react-redux normalizr redux-thunk
```

Or with yarn:

```bash
yarn add redux react-redux normalizr redux-thunk
```

### Basic Setup

Here's a basic setup example that demonstrates how to use Redux along with Normalizr:

1. **Defining Schemas with Normalizr**:

   ```javascript
   import { schema, normalize } from "normalizr";

   // Define a users schema
   const user = new schema.Entity("users");

   // Define an article schema
   const article = new schema.Entity("articles", {
     author: user,
   });

   const normalizedData = normalize(originalData, [article]);
   ```

2. **Creating Redux Actions**:

   ```javascript
   // action types
   const FETCH_ARTICLES_REQUEST = "FETCH_ARTICLES_REQUEST";
   const FETCH_ARTICLES_SUCCESS = "FETCH_ARTICLES_SUCCESS";

   // action creators
   export const fetchArticlesRequest = () => ({ type: FETCH_ARTICLES_REQUEST });
   export const fetchArticlesSuccess = (data) => ({
     type: FETCH_ARTICLES_SUCCESS,
     payload: data,
   });
   ```

3. **Handling Async Actions**:

   ```javascript
   import { fetchArticlesRequest, fetchArticlesSuccess } from "./actions";

   export const fetchArticles = () => {
     return (dispatch) => {
       dispatch(fetchArticlesRequest());

       return fetch("/api/articles")
         .then((response) => response.json())
         .then((json) => {
           const normalizedData = normalize(json, [articleSchema]);
           dispatch(fetchArticlesSuccess(normalizedData.entities));
         });
     };
   };
   ```

4. **Writing Tests for Redux**:

   ```javascript
   import { fetchArticlesSuccess } from "./actions";
   import articlesReducer from "./reducers";

   describe("articlesReducer", () => {
     it("should handle FETCH_ARTICLES_SUCCESS", () => {
       const initialState = {};
       const action = fetchArticlesSuccess({
         articles: { 1: { id: 1, title: "Test Article" } },
       });
       const expectedState = {
         articles: { 1: { id: 1, title: "Test Article" } },
       };
       expect(articlesReducer(initialState, action)).toEqual(expectedState);
     });
   });
   ```
