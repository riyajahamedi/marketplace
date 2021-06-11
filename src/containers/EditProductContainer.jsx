import { useState } from "react";
import { connect } from "react-redux";
import { updateProduct } from "../actions";
import { getUrlParamValue } from "../helpers/utils";
import { getProductById } from "../reducers";

export const EditProduct = ({
  product,
  categories,
  updateProduct,
  notification,
}) => {
  const [productInfo, setProductInfo] = useState(product);
  if (!productInfo) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(productInfo);
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setProductInfo({
      ...productInfo,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <h2> Edit product </h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="productName">Name</label>
              <input
                type="text"
                className="form-control"
                id="productName"
                value={productInfo.productName}
                name="productName"
                placeholder="Product name"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="productCategory">Category</label>
              <select
                name="productCategory"
                id="productCategory"
                value={productInfo.productCategory}
                className="form-control"
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                {categories.map((x, i) => {
                  return <option key={i}>{x}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="productImage">Image URL</label>
            <input
              type="text"
              className="form-control"
              id="productImage"
              value={productInfo.productImage}
              name="productImage"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Product image URL"
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="productPrice">Product price</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">&#8377;</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="productPrice"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={productInfo.productPrice}
                  name="productPrice"
                  placeholder="Product price"
                />
              </div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="salePrice">Sale price</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">&#8377;</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="salePrice"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={productInfo.salePrice}
                  name="salePrice"
                  placeholder="Sale price"
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={(e) => {
                  handleChange(e);
                }}
                checked={productInfo.productStock}
                name="productStock"
                id="productStock"
              />
              <label className="form-check-label" htmlFor="productStock">
                In stock
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
      {notification && (
        <div className="alert alert-success fixed-bottom" role="alert">
          Product saved successfully!!!
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: getProductById(state, getUrlParamValue("id")),
  categories: state.filter.categories,
  notification: state.notification,
});

const mapDispatchToProps = (dispatch) => ({
  updateProduct: (payload) => {
    dispatch(updateProduct(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
