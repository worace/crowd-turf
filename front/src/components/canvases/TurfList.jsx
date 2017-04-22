import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import pp from 'pretty-immutable';

      // onMouseEnter={_.partial(dispatch.hoverStart, feature)}
      // onMouseLeave={dispatch.hoverEnd}
function item(feature, dispatch) {
  const fprops = feature.get('properties').toJS();
  return (
    <li
      key={fprops.id} >
      <a
        href={`/turf/${fprops.id}`}
        onClick={_.partial(dispatch.click, feature)} >
        <p>Turf #{fprops.index}</p>
      </a>
      <pre>
        {pp(feature)}
      </pre>
    </li>
  );
}

function items(featureCollection, dispatch) {
  return featureCollection
    .get('features')
    .sortBy(t => t.getIn(['properties', 'index']))
    .map(f => item(f, dispatch))
    .toJS();
}

const TurfList = (props) => {
  return (
    <ul className="turf-list">
      {items(props.turfSet, props.dispatch)}
    </ul>
  );
};

function stateToProps(state) {
  return {turfSet: state.get('turfSet')};
}

function dispatchToProps(dispatch) {
  return {
    dispatch: {
      hoverStart: (feature) => dispatch({type: 'HOVER_START', payload: feature}),
      hoverEnd: () => dispatch({type: 'HOVER_END'}),
      click: (feature, event) => {
        event.preventDefault();
        dispatch({type: 'FEATURE_SELECTED', payload: feature});
      }
    }
  };
}

export default connect(stateToProps, dispatchToProps)(TurfList);
