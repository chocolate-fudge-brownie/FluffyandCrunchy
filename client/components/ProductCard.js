import React from 'react';
import { Link } from 'react-router-dom';

{
  /* <div className="spinner-border text-primary" role="status">
<span className="visually-hidden">Loading...</span>
</div> */
}
export default class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
    this.handleLoad = this.handleLoad.bind(this);
  }

  handleLoad() {
    this.setState({ loaded: true });
  }

  render() {
    return (
      <div className="col" style={{ marginTop: '40px' }}>
        <div
          className="card"
          style={{ borderStyle: 'solid', borderWidth: '5px' }}
        >
          <Link to={`/products/${this.props.product.id}`}>
            <img
              onLoad={this.handleLoad}
              src={this.props.product.imageUrl}
              className="card-img-top"
              style={
                this.state.loaded
                  ? { display: 'inline-block' }
                  : { display: 'none' }
              }
            />
            <div className="spinner-container">
              <div
                className="spinner-border text-primary"
                role="status"
                style={
                  this.state.loaded
                    ? { display: 'none' }
                    : {
                        display: 'inline-block',
                        width: '200px',
                        height: '200px',
                      }
                }
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </Link>
          <div className="card-body">
            <Link to={`/products/${this.props.product.id}`}>
              <h5 className="card-title">{this.props.product.name}</h5>
            </Link>
            <p className="card-text">${this.props.product.price}</p>
            <div className="plus-minus-buttons">
              <button
                className="btn btn-success"
                onClick={() => {
                  this.props.removeFromCart(
                    this.props.product.id,
                    this.props.userId
                  );
                  this.props.getCartProducts();
                }}
              >
                -
              </button>
              <p>{this.props.cart[this.props.product.id] || 0}</p>
              <button
                className="btn btn-success"
                onClick={() => {
                  this.props.addProductToCart(
                    this.props.product.id,
                    this.props.userId
                  );
                  this.props.getCartProducts();
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
