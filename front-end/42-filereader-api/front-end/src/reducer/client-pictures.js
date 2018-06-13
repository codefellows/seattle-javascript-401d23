const D23_003 = 'Picture is required';
const D23_004 = 'Invalid Picture';

export const validatePicture = (picture) => {
  if (!picture) {
    throw new Error(D23_003);
  }
  const {
    _id, url, description, owner,
  } = picture;

  if (!_id || !url || !description || !owner) {
    throw new Error(D23_004);
  }
};

// Vinicio - keywords: function, state, action, new state
export default (state = [], { type, payload }) => {
  switch (type) {
    case 'CLIENT_PICTURE_CREATE':
      validatePicture(payload);
      return [payload, ...state];
    case 'TOKEN_REMOVE':
      return []; // Vinicio - removing pictures
    default:
      return state;
  }
};
