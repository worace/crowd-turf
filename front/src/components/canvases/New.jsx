import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid/v4';
import Imm from 'immutable';

class NewCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '',
                  id: uuid()};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createCanvas(Imm.fromJS(this.state));
    this.props.history.push(`/canvas/${this.state.id}`);
  }

  render() {
    return (
      <div>
        <h1>Plan a New Canvas</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="canvas_name">Name:</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              name="canvas_name" />
          </div>
          <button type="submit">Create this Canvas Event</button>
        </form>
      </div>
    );
  }
}

function dispatchToProps(dispatch) {
  return {
    createCanvas: (payload) => {
      dispatch({type: 'CANVAS_ADDED', payload});
    }
  };
}

export default connect(() => ({}), dispatchToProps)(NewCanvas);
