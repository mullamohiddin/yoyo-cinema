import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import App from '../components/Layout/App';



const AppContainer = props => {

  const previousItemsLength = useRef(null);

  useEffect(() => {

  }, []);

  return <App />;
};


const mapStateToProps = state => ({
    searchData: state.searchData,
});

const mapDispatchToProps = {
  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
