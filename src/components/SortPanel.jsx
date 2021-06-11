export const SortPanel = ({ options, selected, applySort }) => {
  return (
    <div className="mp-sort-panel col-6">
      <div className="dropdown show">
        <button
          className="btn btn-secondary dropdown-toggle"
          id="sortby"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Sort by
        </button>

        <div className="dropdown-menu" aria-labelledby="sortby">
          {options.map((x, i) => {
            const className = `dropdown-item ${
              x.field === selected.field &&
              x.order === selected.order &&
              "active"
            }`;
            return (
              <button
                key={i}
                className={className}
                onClick={() => applySort(x)}
              >
                {x.displayText}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
