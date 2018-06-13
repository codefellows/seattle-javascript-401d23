import superagent from 'superagent';
import * as routes from '../routes';

// const set = pictures => ({
//   type: 'CLIENT_PICTURES_SET', // Name Convention: NAME_ACTION  or ACTION_NAME
//   payload: pictures,
// });

const create = picture => ({
  type: 'CLIENT_PICTURE_CREATE',
  payload: picture,
});

//-----------------------------------------------------------------
// ASYNC
//-----------------------------------------------------------------
const createRequest = fileDescriptor => (store) => {
  // Vinicio - since pictures are a protected resource, I'll need a token
  const { token } = store.getState();

  return superagent.post(`${API_URL}${routes.PHOTOS_ROUTE}`)
    .set('Authorization', `Bearer ${token}`)
    .field('description', fileDescriptor.description)
    .attach('photo', fileDescriptor.picture)
    .then((response) => {
      // Vinicio - Finish by updating the store
      return store.dispatch(create(response.body));
    });
};

export { createRequest };
