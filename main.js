import { Component, render } from "./toy-react";

class MyComponent extends Component {
  render() {
    return (
      <div>
        <h1>my div</h1>
        {this.children}
      </div>
    );
  }
}

render(
  <MyComponent id="a" class="b">
    <span>this is span </span>
    <p> this is p</p>
  </MyComponent>,
  document.body
);
