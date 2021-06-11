const productStub = require("./products.json");
const loki = require("lokijs");
const ida = require("lokijs/src/loki-indexed-adapter");
const idaAdapter = new ida("marketplace");
const db = new loki("test.db", {
  adapter: idaAdapter,
  autosave: true,
  autosaveInterval: 2000,
});

export const initializeDB = () => {
  return new Promise((res, rej) => {
    db.loadDatabase({}, (err) => {
      const products = db.getCollection("products");
      if (err || !products) {
        db.addCollection("views");
        const products = db.addCollection("products");
        products.insert(productStub);
        res(true);
      } else {
        res(true);
      }
    });
  });
};

export const getProducts = (pageIndex, filter, sortInfo) => {
  const products = db.getCollection("products");
  const filteredProduct = products.chain().find(filter);
  const totalRecordCount = filteredProduct.count();

  const productChunk = filteredProduct
    .simplesort(sortInfo.field, sortInfo.order === "desc")
    .offset(pageIndex * 15)
    .limit(15)
    .data();

  return [productChunk, totalRecordCount];
};

export const hasMoreProducts = (pageIndex) => {
  const products = db.getCollection("products");
  return pageIndex * 15 < products.count();
};

export const getCategories = () => {
  const products = db.getCollection("products");
  const categories = products
    .chain()
    .data()
    .reduce((accum, current) => {
      accum.add(current.productCategory);
      return accum;
    }, new Set());
  return Array.from(categories).sort();
};

export const getSortOptions = () => {
  return [
    {
      field: "productName",
      order: "asc",
      displayText: "Name A-Z",
    },
    {
      field: "productName",
      order: "desc",
      displayText: "Name Z-A",
    },
    {
      field: "salePrice",
      order: "asc",
      displayText: "Price - Low to High",
    },
    {
      field: "salePrice",
      order: "desc",
      displayText: "Price - High to Low",
    },
  ];
};

export const updateProductInfo = (payload) => {
  const products = db.getCollection("products");
  products
    .chain()
    .find({ productId: { $eq: payload.productId } })
    .update((obj) => {
      Object.keys(payload).forEach((x) => (obj[x] = payload[x]));
      return obj;
    });
};

export const getProductById = (id) => {
  const products = db.getCollection("products");
  return products.find({ productId: { $eq: id } }).shift();
};
