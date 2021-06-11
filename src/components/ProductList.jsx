import { useHistory } from "react-router-dom";
const EmptyProducts = () => {
  return (
    <div className="mp-empty-products">
      {" "}
      <span>No matching products found.</span>{" "}
    </div>
  );
};

const Product = ({ data }) => {
  const history = useHistory();

  const handleEditClick = () => {
    history.push(`/edit?id=${data.productId}`);
  };

  const handleViewClick = () => {
    history.push(`/view?id=${data.productId}`);
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card h-100">
        <img
          alt={data.productName}
          src={data.productImage}
          className="card-img-top"
        />
        <div className="card-body px-2 pb-2 pt-1">
          <div className="d-flex justify-content-between">
            <div>
              <p className="h4 text-primary">
                &#8377;{data.salePrice.toFixed(0)}
              </p>
            </div>
          </div>
          <p className="mb-0">
            <strong className="text-secondary">{data.productName}</strong>
          </p>
          <p className="mb-1">
            <small className="text-secondary">{data.productCategory}</small>
          </p>
          <div className="d-flex mb-3 justify-content-between">
            <div>
              <p className="mb-0 small">
                <b>Original price: </b> &#8377;{data.productPrice.toFixed(0)}
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="col px-0">
              <button
                className="btn btn-outline-primary btn-block"
                onClick={(e) => handleViewClick()}
              >
                View
                <i className="fa fa-eye" aria-hidden="true"></i>
              </button>
            </div>
            <div className="ml-2">
              <div
                className="btn btn-outline-default"
                data-toggle="tooltip"
                data-placement="left"
                title="Edit"
                onClick={(e) => handleEditClick()}
              >
                <i className="fa fa-edit" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductList = ({ products }) => {
  if (!Array.isArray(products) || products.length === 0)
    return <EmptyProducts />;
  return (
    <div className="mp-products-list row">
      {products.map((p) => (
        <Product data={p} key={p.productId} />
      ))}
    </div>
  );
};
