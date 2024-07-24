# React Intro

Welcome to the React Intro Project! This project is designed to help you understand and get started with React, a popular JavaScript library for building user interfaces. Below are the resources and learning objectives that will guide you through this project.

## Resources

Here are some valuable resources to get you started with React:

- [React Official Website](https://reactjs.org/)
- [Getting started with React](https://reactjs.org/docs/getting-started.html)
- [Quick Start with React](https://reactjs.org/docs/create-a-new-react-app.html)
- [create-react-app](https://create-react-app.dev/)
- [React Developer Tools](https://reactjs.org/blog/2015/09/02/new-react-developer-tools.html)
- [What is Babel?](https://babeljs.io/docs/en/)
- [Enzyme](https://enzymejs.github.io/enzyme/)

## Learning Objectives

By the end of this project, you should be able to explain the following concepts to anyone, without the help of Google:

1. **How to create a basic JavaScript application using React**:
   - Understand the fundamental steps to create a new React application.
   - Be able to create components and compose them to build a UI.

2. **How to use the package create-react-app to start developing quickly with React**:
   - Learn how to use `create-react-app` to set up a new React project with a simple command.
   - Understand the default project structure and configuration provided by `create-react-app`.

3. **What JSX is and how to use it**:
   - Understand JSX syntax and its usage in React components.
   - Learn how JSX is transpiled to JavaScript and the benefits it provides.

4. **How to use the React Developer Tools to debug your code**:
   - Install and use React Developer Tools to inspect and debug React components.
   - Learn how to navigate the component tree and view component states and props.

5. **How to use Enzyme’s Shadow rendering to test your application**:
   - Understand what Enzyme is and how to use it for testing React components.
   - Learn how to perform shallow rendering and write unit tests for your components.

6. **How to use React with Webpack & Babel**:
   - Learn how to set up a React project using Webpack and Babel for bundling and transpiling your code.
   - Understand the benefits of using Webpack and Babel in a React project.

## Getting Started

To get started with this project, follow these steps:

1. **Install create-react-app**:
   ```bash
   npx create-react-app my-app
   cd my-app
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Create a new component**:
   ```javascript
   // src/components/MyComponent.js
   import React from 'react';

   function MyComponent() {
     return (
       <div>
         <h1>Hello, React!</h1>
       </div>
     );
   }

   export default MyComponent;
   ```

4. **Use the component in your application**:
   ```javascript
   // src/App.js
   import React from 'react';
   import MyComponent from './components/MyComponent';

   function App() {
     return (
       <div className="App">
         <MyComponent />
       </div>
     );
   }

   export default App;
   ```

5. **Install and configure React Developer Tools**:
   - Install the React Developer Tools extension in your browser.
   - Use the tools to inspect and debug your React components.

6. **Install Enzyme for testing**:
   ```bash
   npm install --save enzyme enzyme-adapter-react-16
   npm install --save-dev enzyme-to-json
   ```

   **Configure Enzyme**:
   ```javascript
   // src/setupTests.js
   import { configure } from 'enzyme';
   import Adapter from 'enzyme-adapter-react-16';

   configure({ adapter: new Adapter() });
   ```

   **Write a test using Enzyme**:
   ```javascript
   // src/components/MyComponent.test.js
   import React from 'react';
   import { shallow } from 'enzyme';
   import MyComponent from './MyComponent';

   it('renders without crashing', () => {
     shallow(<MyComponent />);
   });
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
