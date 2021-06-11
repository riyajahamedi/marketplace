import {
  getProducts,
  initializeDB,
  getCategories,
  getSortOptions,
  updateProductInfo,
} from "../api/market";
import * as actions from "../helpers/constants";

export const getProductsChunk =
  (pageIndex = 0, filter, search, sortInfo, reload = false) =>
  (dispatch) => {
    const filterQuery = {};
    if (filter) {
      if (Array.isArray(filter.category) && filter.category.length > 0) {
        filterQuery["productCategory"] = { $in: filter.category };
      }
      if (filter.price) {
        const min = filter.price.min ? filter.price.min : 1000;
        const max = filter.price.max ? filter.price.max : 100000;
        filterQuery["salePrice"] = { $between: [min, max] };
      }
    }

    if (search) {
      filterQuery["productName"] = { $regex: [search, "i"] };
    }

    const sortExp = sortInfo
      ? sortInfo
      : {
          field: "productName",
          order: "asc",
        };
    const [products, totalRecordCount] = getProducts(
      pageIndex,
      filterQuery,
      sortExp
    );
    const hasMoreItems = (pageIndex + 1) * 15 < totalRecordCount;
    dispatch({
      type: actions.UPDATE_PRODUCTS,
      payload: {
        products,
        pageIndex,
        hasMoreItems,
        reload,
      },
    });
  };

export const initFilterPanel = () => (dispatch) => {
  const categories = getCategories();
  const filter = {
    category: [],
    price: { min: 1000, max: 100000 },
  };
  dispatch({
    type: actions.INIT_FILTER,
    payload: {
      categories,
      filter,
    },
  });
};

export const initSortOptions = () => (dispatch) => {
  const options = getSortOptions();
  const selected = options[0];
  dispatch({
    type: actions.INIT_SORT,
    payload: {
      options,
      selected,
    },
  });
};

export const initializeData = () => async (dispatch) => {
  try {
    await initializeDB();
    dispatch(getProductsChunk());
    dispatch(initFilterPanel());
    dispatch(initSortOptions());
  } catch (e) {
    console.log(e);
  }
};

export const applyFilter = (payload) => (dispatch) => {
  dispatch({
    type: actions.APPLY_FILTER,
    payload,
  });
};

export const searchProduct = (payload) => (dispatch) => {
  dispatch({
    type: actions.APPLY_SEARCH,
    payload,
  });
};

export const sortProduct = (payload) => (dispatch) => {
  dispatch({
    type: actions.APPLY_SORT,
    payload,
  });
};

export const updateProduct = (payload) => (dispatch) => {
  updateProductInfo(payload);
  dispatch({
    type: actions.UPDATE_PRODUCT,
    payload,
  });
  dispatch({
    type: actions.SHOW_NOTIFICATION,
    payload: {
      show: true,
    },
  });
  setTimeout(() => {
    dispatch({
      type: actions.SHOW_NOTIFICATION,
      payload: {
        show: false,
      },
    });
  }, 4000);
};
