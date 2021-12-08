import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ProfileIcon } from "./Icons";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      history.push(`/search/result/${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="min-h-14 w-full container-fluid">
      <div className="row gy-3 mt-0 items-center py-2 md:py-0">
        <div className="col-12 lg:col-1 flex items-center justify-between">
          <span className="invisible">....</span>
          <Link to="/" className="text-lg font-bold text-red-500">
            MyFlix
          </Link>
          <Link to="/profile" className="lg:hidden">
            <ProfileIcon size={18} />
          </Link>
        </div>
        <div className="col-12 lg:col-4 flex justify-center">
          <Link
            to="/"
            className="px-3 py-1 md:py-0 text-gray-400 hover:text-gray-200 text-md md:text-sm"
          >
            Home
          </Link>
          <Link
            to="/new"
            className="px-3 py-1 md:py-0 text-gray-400 hover:text-gray-200 text-md md:text-sm"
          >
            New
          </Link>
          <Link
            to="/popular"
            className="px-3 py-1 md:py-0 text-gray-400 hover:text-gray-200 text-md md:text-sm"
          >
            Popular
          </Link>
          <Link
            to="/watchlist"
            className="px-3 py-1 md:py-0 text-gray-400 hover:text-gray-200 text-md md:text-sm"
          >
            Watchlist
          </Link>
        </div>
        <div className="col-12 lg:col-6">
          <input
            className="bg-secondary py-2 px-4 outline-none w-full rounded"
            type="search"
            placeholder="Search for movies or tv shows"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
        <div className="col-1 hidden lg:flex justify-end ">
          <Link to="/profile">
            <ProfileIcon size={18} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
