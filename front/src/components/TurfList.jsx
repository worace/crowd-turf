import React from 'react';
import {connect} from 'react-redux';

function item(feature) {
  const label = feature.getIn(['properties', 'label']);
  return (<li key={label}>{label}</li>);
}

function items(featureCollection) {
  return featureCollection
    .get('features')
    .map(item)
    .toJS();
}

const TurfList = (props) => {
  return (
    <ul>
      {items(props.turfSet)}
    </ul>
  );
};

function stateToProps(state) {
  return {turfSet: state.get('turfSet')};
}

export default connect(stateToProps)(TurfList);
