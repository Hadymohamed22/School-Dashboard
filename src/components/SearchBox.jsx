import { IoSearch } from "react-icons/io5";
import { handleSearch } from "../utils/handleSearch";

function SearchBox({ data, setFilteredData }) {
  return (
    <label
      className="search-box flex items-center gap-2 px-3 rounded-[40px] bg-white w-fit focus-within:shadow-md transition-all duration-300 border border-transparent focus-within:border-main/80 overflow-hidden"
      htmlFor="search"
    >
      <span className="icon text-main">
        <IoSearch />
      </span>
      <input
        type="text"
        className="border-none outline-none p-2 text-sm placeholder:text-sm text-main/80 placeholder:text-[#A098AE]"
        placeholder="Search here..."
        id="search"
        onChange={(e) => {
          if (data) {
            const result = handleSearch(data, e.target.value);
            setFilteredData(result);
          }
        }}
      />
    </label>
  );
}

export default SearchBox;
