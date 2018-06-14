import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { WELCOME } from '../../text';
import PictureForm from '../picture-form/picture-form';
import * as clientPicturesActions from '../../actions/client-pictures';

class Dashboard extends React.Component {
  render(){
    return (
      <div className='dashboard'>
        <h1> { WELCOME } </h1>
        <h2> You can only see this if you are logged in </h2>
        <PictureForm onComplete={this.props.doCreatePicture}/>
      </div>
    );
  }
}

Dashboard.propTypes = {
  doCreatePicture: PropTypes.func,
};

// Vinicio - every property inside this object will become part of props.
const mapDispatchToProps = dispatch => ({
  // Vinicio - Dispatch will send the store to complete the async call
  doCreatePicture: picture => dispatch(clientPicturesActions.createRequest(picture)),
});

export default connect(null, mapDispatchToProps)(Dashboard);

