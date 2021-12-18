import { useState, useEffect } from "react";
import axios from "axios";

import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { IMAGE_BASE_URL, SERVER_URL } from "../requests";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchWatchlist = async () => {
      let { data } = await axios.post(`${SERVER_URL}/getWatchlist`, {
        id: currentUser.id,
      });
      setWatchlist(data);
    };
    fetchWatchlist();
  }, [currentUser]);

  return (
    <>
      {watchlist.length > 0 ? (
        <div className="container-fluid">
          <h1 className="text-2xl font-semibold my-8 text-center">
            Your watchlist
          </h1>
          <div className="row gx-2 gy-2">
            {watchlist.map((item) => (
              <div className="col-6 md:col-4 lg:col-2" key={item.content_id}>
                <Link to={`/${item.media_type}/${item.content_id}`} role="img">
                  <img
                    className="h-64 rounded w-full object-cover"
                    src={IMAGE_BASE_URL + item.poster_path}
                    alt={item.content_id}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-grow items-center justify-center">
          <h1 className="text-2xl font-semibold">
            You don't have any watchlist
          </h1>
        </div>
      )}
    </>
  );
};

export default Watchlist;