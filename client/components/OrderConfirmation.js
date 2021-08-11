import React from 'react';
import { Link } from 'react-router-dom';

export default class OrderConfirmation extends React.Component {
  render() {
    return (
      <div id="order-confirmation">
        <h2>Thank You for Your Purchase : )</h2>
        <img src="https://m.media-amazon.com/images/I/81QlI0U0AsL._AC_SX425_.jpg" />
        <div id="order-confirmation-buttons">
          <Link to="/products">
            <button className="btn btn-primary">See More Products</button>
          </Link>
          <Link to="/history">
            <button className="btn btn-primary">View All Orders</button>
          </Link>
        </div>
      </div>
    );
  }
}
