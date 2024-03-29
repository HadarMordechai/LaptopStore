import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context";
import PropTypes from "prop-types";

export default class Product extends Component {
  render() {
    const { id, title, image, price, inCart } = this.props.product;
    return (
      <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
        <div className="card">
          <ProductConsumer>
            {value => (
              <div className="img-container  p-5">
                <Link
                  to="/details"
                  onClick={() => {
                    value.fetchProductDetails(id);
                  }}
                >
                  <img src={image} alt="a laptop" className="card-img-top" width="200" height="140"/>
                </Link>
                {/* add to cart button  */}
                <button
                  className="cart-btn"
                  disabled={inCart}
                  onClick={() => {
                    value.addToCart(id);
                    value.openModal(id);
                  }}
                >
                  {inCart ? (
                    <p className="text-capitalize mb-0" disabled>
                      {" "}
                      in cart
                    </p>
                  ) : (
                    <i className="fas fa-plus-circle" />
                  )}
                </button>
              </div>
            )}
          </ProductConsumer>

          {/* card footer */}
          <div className="card-footer d-flex justify-content-between">
            <p className="align-self-center mb-0">{title}</p>
            <h5 className="text-black mb-0">
              <span className="mr-1">$</span>
              {price}
            </h5>
          </div>
        </div>
      </ProductWrapper>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    imgae: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    // from cart
    count: PropTypes.number,
    inCart: PropTypes.bool
  }).isRequired
};
const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 1s linear;
  }
  .card-footer {
    border-top: transparent;
    transition: all 1s linear;
    background: var(--lightOrange);
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.3);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.3);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
  }
  .card-img-top {
    transition: all 1s linear;
  }
  .img-container:hover .card-img-top {
    transform: scale(1.2);
  }
  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: transparent;
    border: var(--lightOrange);
    color: var(--lightOrange);
    font-size: 1.4rem;
    transition: all 1s linear;
  }
  .img-container:hover .cart-btn {
    transform: scale(1.2);
  }
  .cart-btn:hover {
    color: var(--mainGrey);
    cursor: pointer;
  }
`;
