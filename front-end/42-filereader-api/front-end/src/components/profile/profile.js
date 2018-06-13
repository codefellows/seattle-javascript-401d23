import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as clientProfileActions from '../../actions/client-profile';
import * as routes from '../../routes';


import autoBind from '../../utils';
import ProfileForm from '../profile-form/profile-form';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    // Vinicio - UI State
    this.state = {
      editing: false,
    };

    autoBind.call(this, Profile);
  }

  //-------------------------------------------------------------------
  // Member Functions
  //-------------------------------------------------------------------
  handleCreate(profile) {
    this.props.profileCreate(profile)
      .then(() => {
        // Vinicio - The profile has been created, we inform/interact with the user
        this.props.history.push(routes.DASHBOARD_ROUTE);
      });
  }

  handleUpdate(profile) {
    // TODO : Add validation (i.e. CATCH blocks)
    // try{
    //
    // } catch() {
    //
    // }
    this.props.profileUpdate(profile);
    this.setState({editing: false});
  }

  //-------------------------------------------------------------------
  // LifeCycle Hooks
  //-------------------------------------------------------------------
  render() {
    const {
      profile,
    } = this.props;

    let JSXEditing = null;
    let JSXDisplay = null;
    let JSXProfile = null;

    if (profile) {
      JSXEditing =
        <div>
          <ProfileForm profile={profile} onComplete={this.handleUpdate}/>
          <button onClick={() => this.setState({ editing: false })}> Cancel</button>
        </div>;
      JSXDisplay =
        <div>
          <p>{profile.bio}</p>
          <button onClick={() => this.setState({editing: true})}> Edit</button>
        </div>;
      JSXProfile =
        <div>
          <h2> {profile.username} </h2>
          <h3> {profile.email} </h3>
          {this.state.editing ? JSXEditing : JSXDisplay}
        </div>;
    }
    return (
      <div>
        <h1>PROFILE</h1>
        {profile ? JSXProfile : <ProfileForm onComplete={this.handleCreate}/>}
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object,
  profileUpdate: PropTypes.func,
  profileCreate: PropTypes.func,
  history: PropTypes.object,
};


const mapStateToProps = state => ({
  profile: state.clientProfile,
});

const mapDispatchToProps = dispatch => ({
  profileCreate: profile => dispatch(clientProfileActions.createRequest(profile)),
  profileUpdate: profile => dispatch(clientProfileActions.updateRequest(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

