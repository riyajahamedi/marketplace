import { combineReducers } from "redux";
import * as actions from "../helpers/constants";

const products = (state = [], action) => {
  switch (action.type) {
    case actions.UPDATE_PRODUCTS:
      return action.payload.reload
        ? [...action.payload.products]
        : [...state, ...action.payload.products];
    case actions.UPDATE_PRODUCT:
      return state.map((x) => {
        if (x.productId === action.payload.productId) {
          x = { ...action.payload };
        }
        return x;
      });
    default:
      return state;
  }
};

const pageInfo = (state = { pageIndex: 0, hasMoreProducts: true }, action) => {
  switch (action.type) {
    case actions.UPDATE_PRODUCTS:
      return {
        pageIndex: action.payload.pageIndex,
        hasMoreItems: action.payload.hasMoreItems,
      };

    default:
      return state;
  }
};

const filter = (
  state = {
    categories: [],
    filter: {},
  },
  action
) => {
  switch (action.type) {
    case actions.INIT_FILTER:
      return {
        filter: { ...action.payload.filter },
        categories: [...action.payload.categories],
      };
    case actions.APPLY_FILTER:
      return {
        ...state,
        filter: { ...action.payload },
      };
    default:
      return state;
  }
};

const sortInfo = (
  state = {
    options: [],
    selected: {},
  },
  action
) => {
  switch (action.type) {
    case actions.INIT_SORT:
      return {
        options: [...action.payload.options],
        selected: { ...action.payload.selected },
      };
    case actions.APPLY_SORT:
      return {
        ...state,
        selected: { ...action.payload },
      };
    default:
      return state;
  }
};

const search = (state = "", action) => {
  switch (action.type) {
    case actions.APPLY_SEARCH:
      return action.payload;
    default:
      return state;
  }
};

const notification = (state = false, action) => {
  switch (action.type) {
    case actions.SHOW_NOTIFICATION:
      return action.payload.show;
    default:
      return state;
  }
};

export default combineReducers({
  products,
  filter,
  pageInfo,
  sortInfo,
  search,
  notification,
});

export const getProductById = (state, id) => {
  return state.products.find((x) => x.productId === parseInt(id));
};
