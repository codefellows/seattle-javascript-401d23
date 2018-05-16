![cf](http://i.imgur.com/7v5ASc8.png) 33: Redux Middleware
===

## Learning Objectives
* Students will be able to create middleware for redux
* Students will be able to add third party middleware to redux

## Readings
* Read [redux middleware](http://redux.js.org/docs/advanced/Middleware.html)

## Overview

### Redux
Redux middleware provides a third-party extension point between dispatching and action at the moment it reaches the reducer. It can be used for logging actions, adding promise support, making API requests, caching, throttling, and much more.

### Example Middleware

``` javascript
// middleware used for error reporting and logging
let reporter = store => next => action => {
  console.log('__ACTION__', action);

  try {
    let result = next(action);
    console.log('__STATE__', store.getState());
    return result;
  } catch (error) {
    error.action = action;
    console.error('__ERROR__', error);
    return error;
  }
}

export default reporter;
```

