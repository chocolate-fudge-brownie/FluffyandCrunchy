import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import products from './products';
import singleProduct from './singleProduct';
import cart from './cart';
import filter from './search';
import orders from './orders';
import singleOrder from './singleOrder';

const reducer = combineReducers({
  auth,
  products,
  singleProduct,
  cart,
  filter,
  orders,
  singleOrder
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
