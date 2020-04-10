import React from "react";

import "./Todo.scss";


class Todo extends React.Component {
  state = {
    open: true
  }

  toggle = () => this.setState({ open: !this.state.open})

  render() {
    return (
      <div>
        <h1>
          add note to double check schedule times, add helper instructions for
          batch upload
        </h1>

        
      </div>
    );
  }
}
export default Todo;
