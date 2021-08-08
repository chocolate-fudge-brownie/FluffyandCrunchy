import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchProducts } from '../store/search';

class SearchResults extends React.Component {
  componentDidMount() {
    this.props.searchProducts(this.props.match.params.query);
  }
  render() {
    return (
      <div className="search-filter">
        <h1>Search Results:</h1>
        {this.props.filter.length ? (
          this.props.filter.map((product) => (
            <>
              <h3>
                Found {this.props.filter.length}{' '}
                {this.props.filter.length === 1 ? 'product' : 'products'} that
                matches '{this.props.match.params.query}'
              </h3>
              <div
                key={product.id}
                className="card"
                style={{ maxWidth: '370px' }}
              >
                <h5 className="card-header">{product.name}</h5>
                <div className="card-body">
                  <img
                    className="search-image"
                    src={product.imageUrl}
                    alt={product.name}
                  />
                  <Link to={`/products/${product.id}`}>
                    <button className="btn btn-primary">Details</button>
                  </Link>
                </div>
              </div>
            </>
          ))
        ) : (
          <h2>No products match: '{this.props.match.params.query}'</h2>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    filter: state.filter,
  };
};

const mapDispatch = (dispatch) => {
  return { searchProducts: (query) => dispatch(searchProducts(query)) };
};

export default connect(mapState, mapDispatch)(SearchResults);
