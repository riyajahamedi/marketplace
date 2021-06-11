import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ProductList } from "../components/ProductList";
import { Filter } from "../components/Filter";
import { SortPanel } from "../components/SortPanel";
import { useInfiniteScroll } from "../helpers/hooks";
import {
  getProductsChunk,
  applyFilter,
  sortProduct,
  searchProduct,
} from "../actions/index";
import { Search } from "../components/Search";

const MarketPlaceContainer = ({
  products,
  pageInfo,
  filterInfo,
  sortInfo,
  search,
  getNextProducts,
  applyFilter,
  applySort,
  applySearch,
}) => {
  const [isFetching, setIsFetching] = useInfiniteScroll(() => {
    console.log("Fetching moreItems");
    if (pageInfo.hasMoreItems) {
      getNextProducts(pageInfo.pageIndex + 1, filterInfo.filter, null, null);
    }
    setIsFetching(!isFetching);
  });

  const handleFilter = (payload) => {
    applyFilter(payload);
    getNextProducts(0, payload, search, sortInfo.selected, true);
  };

  const handleSort = (payload) => {
    applySort(payload);
    getNextProducts(0, filterInfo.filter, search, payload, true);
  };

  const handleSearch = (payload) => {
    applySearch(payload);
    getNextProducts(0, filterInfo.filter, payload, sortInfo.selected, true);
  };

  return (
    <main className="container-fluid pt-2">
      <div className="row">
        <div className="mp-left col-xl-3 col-lg-3 col-md-3 col-sm-12">
          <Filter
            category={filterInfo.categories}
            filter={filterInfo.filter}
            applyFilter={handleFilter}
          />
        </div>
        <div className="mp-right col-xl-9 col-lg-9 col-md-9 col-sm-12">
          <div className="action-panel row">
            <Search value={search} applySearch={handleSearch} />
            <SortPanel
              options={sortInfo.options}
              selected={sortInfo.selected}
              applySort={handleSort}
            />
          </div>
          <div className="products row">
            <ProductList products={products} />
          </div>
        </div>
      </div>
    </main>
  );
};

MarketPlaceContainer.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number.isRequired,
      productCategory: PropTypes.string.isRequired,
      productName: PropTypes.string.isRequired,
      productImage: PropTypes.string.isRequired,
      productStock: PropTypes.bool.isRequired,
      productPrice: PropTypes.number.isRequired,
      salePrice: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
  pageInfo: state.pageInfo,
  filterInfo: state.filter,
  sortInfo: state.sortInfo,
  search: state.search,
});

const mapDispatchToProps = (dispatch) => ({
  getNextProducts: (pageIndex, filter, search, sortInfo, reload = false) => {
    dispatch(getProductsChunk(pageIndex, filter, search, sortInfo, reload));
  },
  applyFilter: (payload) => {
    dispatch(applyFilter(payload));
  },
  applySort: (payload) => {
    dispatch(sortProduct(payload));
  },
  applySearch: (payload) => {
    dispatch(searchProduct(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarketPlaceContainer);
