export const Search = ({ value, applySearch }) => {
  return (
    <div className="mp-search col-6">
      <label className="sr-only" htmlFor="search">
        Search
      </label>
      <div className="input-group mb-2">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fa fa-search" aria-hidden="true"></i>
          </div>
        </div>
        <input
          type="text"
          className="form-control"
          id="search"
          value={value}
          placeholder="Search"
          onChange={(e) => {
            applySearch(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
