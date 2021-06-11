const CategoryFilter = ({ category, filter, applyFilter }) => {
  const handleChange = (e) => {
    const updatedCategory = e.target.checked
      ? [...filter.category, e.target.value]
      : filter.category.filter((x) => x !== e.target.value);
    applyFilter({
      category: updatedCategory,
      price: { ...filter.price },
    });
  };

  return (
    <fieldset className="form-group">
      <legend className="col-form-label">Category</legend>
      <div className="form-row d-flex flex-column">
        {category.map((c, i) => {
          return (
            <div className="form-check" key={i}>
              <input
                className="form-check-input"
                type="checkbox"
                name="category"
                checked={filter.category.includes(c)}
                id={i}
                value={c}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <label className="form-check-label" htmlFor={i}>
                {c}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
};

export const PriceFilter = ({ category, filter, applyFilter }) => {
  const handleChange = (field, e) => {
    const changedValue = {};
    changedValue[field] = parseFloat(e.target.value);
    applyFilter({
      category: [...filter.category],
      price: {
        ...filter.price,
        ...changedValue,
      },
    });
  };

  return (
    <fieldset className="form-group">
      <legend className="col-form-label">Price</legend>
      <div className="form-row">
        {["Min", "Max"].map((x) => {
          return (
            <div key={x} className="form-group col-md-6">
              <label htmlFor={x}>{x}</label>
              <input
                className="form-control"
                id={x}
                placeholder={`${x}.Price`}
                value={filter.price[x.toLowerCase()]}
                onChange={(e) => {
                  handleChange(x.toLowerCase(), e);
                }}
              />
            </div>
          );
        })}
      </div>
    </fieldset>
  );
};

export const Filter = ({ category, filter, applyFilter }) => {
  return filter.category && filter.price ? (
    <div className="mp-filter-panel">
      <form>
        <CategoryFilter
          category={category}
          filter={filter}
          applyFilter={applyFilter}
        />
        <PriceFilter
          category={category}
          filter={filter}
          applyFilter={applyFilter}
        />
      </form>
    </div>
  ) : null;
};
