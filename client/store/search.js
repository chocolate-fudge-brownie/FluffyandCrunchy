import axios from 'axios';

const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';

const _searchProducts = (query, products) => ({
  type: SEARCH_PRODUCTS,
  query,
  products,
});

export const searchProducts = (query) => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/products');
    dispatch(_searchProducts(query, data));
  } catch (err) {
    console.error(err);
  }
};

export default function (state = [], action) {
  switch (action.type) {
    case SEARCH_PRODUCTS:
      return action.products.filter((product) =>
        product.name.includes(action.query)
      );
    default:
      return state;
  }
}
