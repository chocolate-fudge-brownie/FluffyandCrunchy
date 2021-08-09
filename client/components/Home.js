import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div id="homepage">
      <h3>Welcome, {username}!</h3>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col" style={{ marginTop: '40px' }}>
          <div className="card">
            <Link to={`/products`}>
              <img
                src="https://4.imimg.com/data4/PH/LD/MY-16439721/soft-toys-500x500.jpg"
                className="card-img-top"
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">All Products</h5>
            </div>
          </div>
        </div>
        <div className="col" style={{ marginTop: '40px' }}>
          <div className="card">
            <Link to={`/products`}>
              <img
                src="https://blog.radioflyer.com/media/catalog/product/cache/15/image/800x800/9df78eab33525d08d6e5fb8d27136e95/l/i/little-red-toy-wagon-stuffed-animals-inset-w5_5.jpg"
                className="card-img-top"
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">Your Orders</h5>
            </div>
          </div>
        </div>
        <div className="col" style={{ marginTop: '40px' }}>
          <div className="card">
            <Link to={`/products`}>
              <img
                src="https://m.media-amazon.com/images/I/51r9cd24QPL._AC_SX425_.jpg"
                className="card-img-top"
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">Account Details</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
