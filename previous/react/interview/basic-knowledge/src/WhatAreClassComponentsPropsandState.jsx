// Qestion.
// How to create class components?
// How to pass props to the components?
// How state is working in class components?

import React from 'react';

class Button extends React.Component {
  state = {
    counter: 0,
  };
  //   클라스형 컴포넌트에선 기본적으로 상태를 저장할 수 있지만, 함수형 컴포넌트는 그런 가능성이 없다.

  // 생명주기 훅
  componentDidMount() {
    console.log('create Button');
  }

  render() {
    return (
      <button onClick={() => this.setState({ counter: this.state.counter + 1 })}>
        {this.props.text} {this.state.counter}
      </button>
    );
  }
}

class ClassComponent extends React.Component {
  render() {
    return (
      <div>
        <Button text="Hello Class Components" />
      </div>
    );
  }
}

export default ClassComponent;
