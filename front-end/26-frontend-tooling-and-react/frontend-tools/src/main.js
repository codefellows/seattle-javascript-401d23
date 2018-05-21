import React from 'react';
import ReactDom from 'react-dom';


class App extends React.Component {
  render() {
    console.log('Hello from React');
    return undefined;
  }
}

const rootNode = document.createElement('div');
document.body.appendChild(rootNode);
ReactDom.render(<App/>, rootNode);
