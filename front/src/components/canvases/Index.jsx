import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Api from '../../api';

class Index extends Component {
  componentWillMount() {
    this.props.getCanvases();
  }

  list(canvases) {
    return canvases.map(t => {
      console.log(t);
      console.log(t.toJS());
      return (
        <li key={t.get('id')}>
          <Link to={`/canvas/${t.get('id')}`}>
            <p>{t.get('name')} -- {t.get('id')}</p>
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h1>TurfSetList</h1>
        <Link to={'/new_canvas'}>
          <button>New</button>
        </Link>
        <ul>
          {this.list(this.props.canvases)}
        </ul>
      </div>
    );
  }
}

function stateToProps(state) {
  return {canvases: state.get('canvases')};
}

function dispatchToProps(dispatch) {
  return {
    getCanvases: () => {
      dispatch({type: 'CANVASES_REQUSTED'});
      Api.getCanvases(dispatch);
    }
  };
}

export default connect(stateToProps, dispatchToProps)(Index);
