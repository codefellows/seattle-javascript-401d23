import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AuthRedirect from '../auth-redirect/auth-redirect';
import Dashboard from '../dashboard/dashboard';
import Profile from '../profile/profile';
import Header from '../header/header';
import AuthLanding from '../auth-landing/auth-landing';
import * as clientProfileActions from '../../actions/client-profile';

// Vinicio - Routes
//              /
//           Dashboard (Requires Login)
//           Account (Requires Login)
//           Pictures (Requires Login)
//           SignUp
//           Login
class App extends React.Component {
  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.pFetchClientProfile()
        .catch(console.error);
    }
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <div>
            <Header/>
            <Route path='*' component={AuthRedirect}/>
            <Route exact path='/' component={AuthLanding}/>
            <Route exact path='/signup' component={AuthLanding}/>
            <Route exact path='/login' component={AuthLanding}/>
            <Route exact path='/dashboard' component={Dashboard}/>
            <Route exact path='/profile' component={Profile}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

App.propTypes = {
  loggedIn: PropTypes.bool,
  pFetchClientProfile: PropTypes.func,
};


const mapStateToProps = state => ({
  loggedIn: !!state.token,
});

const mapDispatchToProps = dispatch => ({
  pFetchClientProfile: () => dispatch(clientProfileActions.fetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
