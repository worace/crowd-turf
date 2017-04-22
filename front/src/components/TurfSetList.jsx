import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

function list(canvases) {
  return canvases.map(t => {
    return (
      <li key={t.get('id')}>
        <Link to={`/canvas/${t.get('id')}`}>
          <p>{t.get('name')} -- {t.get('id')}</p>
        </Link>
      </li>
    );
  });
}

function TurfSetList(props) {
  return (
    <div>
      <h1>TurfSetList</h1>
      <Link to={'/new_canvas'}>
        <button>New</button>
      </Link>
      <ul>
        {list(props.canvases)}
      </ul>
    </div>
  );
}

function stateToProps(state) {
  return {canvases: state.get('canvases')};
}

export default connect(stateToProps)(TurfSetList);
