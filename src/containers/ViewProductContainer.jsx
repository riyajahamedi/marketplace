import { connect } from "react-redux";
import { getUrlParamValue } from "../helpers/utils";
import { getProductById } from "../reducers";

export const ViewProduct = ({ product }) => {
  if (!product) {
    return (
      <div className="container">
        <h3>Unable to fetch product</h3>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-6 product-image">
          <figure>
            <img
              className="view-product-image"
              alt={product.productName}
              src={product.productImage}
            ></img>
          </figure>
        </div>
        <div className="col-6 product-details">
          <h2 className="product-name text-primary">{product.productName}</h2>
          <h3 className="product-category">
            <small className="text-muted">{product.productCategory}</small>
          </h3>
          <h3 className="price pt-3">&#8377;{product.salePrice.toFixed(0)}</h3>
          <h4
            className={`pt-5 ${
              product.productStock ? "text-success" : "text-danger"
            }`}
          >
            {product.productStock ? "In stock" : "Out of stock"}
          </h4>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: getProductById(state, getUrlParamValue("id")),
});

export default connect(mapStateToProps, null)(ViewProduct);
