# Webpack Project

Welcome to the Webpack Project! This project is designed to help you understand and master the basics of Webpack, a powerful module bundler for JavaScript applications. Below are the resources and learning objectives that will guide you through this project.

## Resources

Here are some valuable resources to get you started with Webpack:

- [Webpack documentation](https://webpack.js.org/concepts/)
- [Webpack beginner guide](https://webpack.js.org/guides/getting-started/)
- [npm-package.json](https://docs.npmjs.com/creating-a-package-json-file)

## Learning Objectives

By the end of this project, you should be able to explain the following concepts to anyone, without the help of Google:

1. **How to setup Webpack for a basic project**:
   - Understand the fundamental steps to initialize and configure Webpack in a new project.
   - Be able to create a `webpack.config.js` file and set up basic configurations.

2. **Entry points, output, and loaders**:
   - Know what entry points are and how to define them in the Webpack configuration.
   - Configure the output property to specify where the bundled files should be saved.
   - Use loaders to transform files before bundling them, such as transpiling ES6 to ES5 using Babel.

3. **How to add plugins**:
   - Learn how to enhance Webpack's functionality using plugins.
   - Be able to add and configure plugins in the Webpack configuration file.

4. **How to split your code into chunks**:
   - Understand the concept of code splitting to improve the performance of your application.
   - Configure Webpack to split your code into multiple chunks that can be loaded on demand.

5. **How to setup a dev server**:
   - Learn how to set up and configure a development server using Webpack Dev Server.
   - Understand how to enable hot module replacement (HMR) to enhance the development experience.

## Getting Started

To get started with this project, follow these steps:

1. **Initialize a new npm project**:
   ```bash
   npm init -y
   ```

2. **Install Webpack and Webpack CLI**:
   ```bash
   npm install webpack webpack-cli --save-dev
   ```

3. **Create a basic Webpack configuration file** (`webpack.config.js`):
   ```javascript
   const path = require('path');

   module.exports = {
     entry: './src/index.js',
     output: {
       filename: 'bundle.js',
       path: path.resolve(__dirname, 'dist')
     },
     module: {
       rules: [
         {
           test: /\.js$/,
           exclude: /node_modules/,
           use: {
             loader: 'babel-loader',
             options: {
               presets: ['@babel/preset-env']
             }
           }
         }
       ]
     }
   };
   ```

4. **Set up a development server**:
   ```bash
   npm install webpack-dev-server --save-dev
   ```

   Add the following script to your `package.json`:
   ```json
   "scripts": {
     "start": "webpack serve --open"
   }
   ```

5. **Run the development server**:
   ```bash
   npm start
   ```

## Contributing

We welcome contributions to this project. If you have suggestions or improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
