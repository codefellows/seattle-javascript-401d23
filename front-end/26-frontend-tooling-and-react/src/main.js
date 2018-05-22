import React from 'react';
import ReactDom from 'react-dom';

import '../style/main.scss';

class HeaderCompontent extends React.Component {
  render() {
    // Vinicio - this line returns JSX
    return (
      <header>
        <h1>{this.props.headerText}</h1>
      </header>
    );
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      message: 'Gregor is super COOL!',
      secretState: 'I will never be displayed',
    };
    this.handleCounterIncrement = this.handleCounterIncrement.bind(this);
    this.handleCounterDecrement = this.handleCounterDecrement.bind(this);
    this.setCounter = this.setCounter.bind(this);
  }


  handleCounterIncrement() {
    this.setState((previousState) => {
      return {
        counter: previousState.counter + 1,
      };
    });
  }

  handleCounterDecrement() {
    this.setState((previousState) => {
      return {
        counter: previousState.counter - 1,
      };
    });
  }

  setCounter(e) {
    const { value } = e.target;
    this.setState(() => {
      return {
        counter: value,
      };
    });
  }

  render() {
    // Vinicio - line 38 is rendering the results of a MAP
    //         - line 39 is rendering the individual name

    return (
      <div>
        <HeaderCompontent
          headerText="Welcome, this is a passed in prop!"
        />
        <h2> Hey! I am an H2 </h2>
        <p> Hey! this is a random Number { Math.random() } </p>
        <p> Here is a message from the developer: { this.state.message }</p>
        <ul>
          {
            ['Gregor', 'The Hound', 'Demi'].map(content => <li key={ content}> { content }</li>)
          }
        </ul>
        <p> The value of my counter is { this.state.counter }</p>
        <button onClick={ this.handleCounterIncrement}> Increment Counter! </button>
        <button onClick={ this.handleCounterDecrement}> Decrement Counter! </button>
        <input type='number' onChange={this.setCounter} value = {this.state.counter}/>
      </div>
    );
  }
}


const rootNode = document.createElement('div');
document.body.appendChild(rootNode);
ReactDom.render(<App/>, rootNode);

