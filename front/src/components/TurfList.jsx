import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import pp from 'pretty-immutable';

function item(feature, dispatch) {
  const fprops = feature.get('properties').toJS();
  return (
    <li
      onMouseEnter={_.partial(dispatch.hoverStart, feature)}
      onMouseLeave={dispatch.hoverEnd}
      key={fprops.id} >
      <p>Turf #{fprops.label}</p>
    </li>
  );
}

function items(featureCollection, dispatch) {
  return featureCollection
    .get('features')
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
      hoverEnd: () => dispatch({type: 'HOVER_END'})
    }
  };
}

export default connect(stateToProps, dispatchToProps)(TurfList);
