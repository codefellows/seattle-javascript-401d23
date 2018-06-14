import superagent from 'superagent';
import * as routes from '../routes';
import { deleteCookie } from '../utils/cookie';
import { TOKEN_COOKIE_KEY } from '../constants';

//----------------------------------------------
// SYNC
//----------------------------------------------
export const setToken = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const removeToken = () => ({
  type: 'TOKEN_REMOVE',
});

export const logout = () => {
  // 1 - Remove Cookie
  //   - Remove Token from Local Storage
  // 2 - Remove Token from Store
  deleteCookie(TOKEN_COOKIE_KEY);
  return removeToken();
};

//----------------------------------------------
// ASYNC
//----------------------------------------------
export const signupRequest = user => (store) => {
  return superagent.post(`${API_URL}${routes.SIGNUP_ROUTE}`)
    .send(user)
    .withCredentials()
    .then((response) => { // Step 4
      return store.dispatch(setToken(response.text)); // Step 4
    });
};

// Vinicio - request
export const loginRequest = user => (store) => {
  return superagent.get(`${API_URL}${routes.LOGIN_ROUTE}`)
    .auth(user.username, user.password)
    .withCredentials()
    .then((response) => {
      return store.dispatch(setToken(response.text));
    });
};

export const getFacebookFriends = user => (store) => {
  return superagent.get(`${API_URL}${routes.LOGIN_ROUTE}`)
    .then((response) => {
      return store.dispatch(setToken(response.text));
    });
};
