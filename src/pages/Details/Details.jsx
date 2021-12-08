import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  BASE_URL,
  getById,
  getSimilar,
  IMAGE_BASE_URL,
  IMAGE_BASE_URL_HD,
  SERVER_URL,
  YOUTUBE_BASE_URL,
  YOUTUBE_THUMBNAIL_URL,
} from "../../requests";

import { BookmarkIcon } from "../../components/Icons";

const Details = () => {
  const { category, id } = useParams();
  const [details, setDetails] = useState({});
  const [showWatchlist, setShowWatchlist] = useState(true);
  const history = useHistory();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      let result = {};
      if (category === "movie" || "tv") {
        let res = await axios.get(BASE_URL + getById(category, id));
        let similar = await axios.get(BASE_URL + getSimilar(category, id));
        result = { ...res.data, similar: [...similar.data.results] };
        setDetails(result);
      }
    };
    fetchData();
  }, [id, category]);

  useEffect(() => {
    const fetchWatchlistCheck = async () => {
      if (currentUser.id.length > 0 && details.id) {
        const watchlistCheck = {
          id: currentUser.id,
          content_id: details.id,
        };
        let { data } = await axios.post(
          `${SERVER_URL}/checkWatchlist`,
          watchlistCheck
        );
        if (data.success) {
          setShowWatchlist(false);
        } else {
          setShowWatchlist(true);
        }
      }
    };
    fetchWatchlistCheck();
  }, [currentUser, details]);

  const handleWatchlistClick = async () => {
    let { data } = await axios.post(`${SERVER_URL}/addWatchlist`, {
      id: currentUser.id,
      media_type: category,
      content_id: details.id,
      poster_path: details.poster_path,
    });
    if (data.success) {
      alert("Added to Watchlist");
      setShowWatchlist(false);
    } else {
      alert("There was a problem in adding watchlist");
    }
  };

  const removeWatchlist = async () => {
    if (currentUser.id.length > 0 && details.id) {
      const watchlistCheck = {
        id: currentUser.id,
        content_id: details.id,
      };
      let { data } = await axios.post(
        `${SERVER_URL}/removeWatchlist`,
        watchlistCheck
      );
      if (data.success) {
        alert("Removed from watchlist");
        setShowWatchlist(true);
      } else {
        setShowWatchlist(false);
      }
    }
  };

  return (
    <div className="min-h-full">
      {details.id && (
        <>
          <img
            className="mt-2 h-96 w-full object-cover"
            src={IMAGE_BASE_URL_HD + details.backdrop_path}
            alt={details.id}
          />
          <div className="md:px-12">
            <div className="container-fluid px-4 py-4 md:relative md:bottom-20 bg-primary rounded-2xl">
              <div className="row">
                <div className="col-4 hidden md:block">
                  <img
                    className="rounded-2xl"
                    src={IMAGE_BASE_URL_HD + details.poster_path}
                    alt={details.id}
                  />
                  <hr className="border border-gray-800 mt-6" />
                  <div className="w-full p-4 flex flex-col gap-4">
                    <div className="w-full flex justify-between">
                      <h3 className="text-sm text-gray-500">Rating</h3>
                      <h3 className="text-sm text-gray-400">
                        {details.vote_average}
                      </h3>
                    </div>
                    <div className="w-full flex justify-between">
                      <h3 className="text-sm text-gray-500">Genre</h3>
                      <div>
                        {details.genres &&
                          details.genres.map((item) => (
                            <h3
                              className="text-sm text-right text-gray-400"
                              key={item.id}
                            >
                              {item.name + ", "}
                            </h3>
                          ))}
                      </div>
                    </div>
                    <div className="w-full flex justify-between">
                      <h3 className="text-sm text-gray-500">Runtime</h3>
                      <h3 className="text-sm text-gray-400">
                        {details.episode_run_time
                          ? details.episode_run_time
                          : details.runtime}
                        mins
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-12 md:col-8">
                  <h1 className="text-2xl font-bold mb-6">
                    {details.name ||
                      details.original_name ||
                      details.title ||
                      details.original_title}
                  </h1>
                  {currentUser.id.length > 0 && showWatchlist && (
                    <div className="w-full h-16 flex items-center justify-evenly bg-secondary rounded">
                      <button
                        className="flex items-center gap-2"
                        onClick={handleWatchlistClick}
                      >
                        <BookmarkIcon />
                        <h3 className="text-sm">Add to Watchlist</h3>
                      </button>
                    </div>
                  )}
                  {currentUser.id.length > 0 && !showWatchlist && (
                    <div className="w-full h-16 flex items-center justify-evenly bg-secondary rounded">
                      <button
                        className="flex items-center gap-2"
                        onClick={removeWatchlist}
                      >
                        <BookmarkIcon />
                        <h3 className="text-sm">Remove from Watchlist</h3>
                      </button>
                    </div>
                  )}
                  <div className="flex md:hidden w-full p-4 flex-col gap-4">
                    <div className="w-full flex justify-between">
                      <h3 className="text-sm text-gray-500">Rating</h3>
                      <h3 className="text-sm text-gray-400">
                        {details.vote_average}
                      </h3>
                    </div>
                    <div className="w-full flex justify-between">
                      <h3 className="text-sm text-gray-500">Genre</h3>
                      <div>
                        {details.genres &&
                          details.genres.map((item) => (
                            <h3
                              className="text-sm text-right text-gray-400"
                              key={item.id}
                            >
                              {item.name + ", "}
                            </h3>
                          ))}
                      </div>
                    </div>
                    <div className="w-full flex justify-between">
                      <h3 className="text-sm text-gray-500">Runtime</h3>
                      <h3 className="text-sm text-gray-400">
                        {details.episode_run_time
                          ? details.episode_run_time
                          : details.runtime}
                        mins
                      </h3>
                    </div>
                  </div>
                  {details.overview.length > 0 && (
                    <div className="my-5">
                      <h1 className="text-sm my-1 font-semibold text-gray-500">
                        SYNOPSIS
                      </h1>
                      <p className="text-sm text-gray-400 text-justify">
                        {details.overview}
                      </p>
                    </div>
                  )}
                  {details?.videos?.results?.length > 0 && (
                    <div className="my-5">
                      <h1 className="text-sm mb-3 font-semibold text-gray-500 uppercase">
                        {details.name ||
                          details.original_name ||
                          details.title ||
                          details.original_title}
                        : Videos: Trailers, Teasers, Featurettes
                      </h1>
                      <div className="row gy-1 gx-1">
                        {details?.videos?.results?.map(
                          (item, index) =>
                            index < 4 && (
                              <div className="col-12 md:col-6" key={item.id}>
                                <a
                                  href={YOUTUBE_BASE_URL + item.key}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <img
                                    className="h-48 md:h-32 lg:h-56 w-full object-cover rounded"
                                    src={YOUTUBE_THUMBNAIL_URL(item.key)}
                                    alt={item.name}
                                  />
                                </a>
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  )}
                  {details.similar.length > 0 && (
                    <div className="my-5">
                      <h1 className="uppercase text-sm mb-3 text-gray-500 font-semibold">
                        People who liked
                        {" " +
                          (details.name ||
                            details.original_name ||
                            details.title ||
                            details.original_title)}{" "}
                        also liked
                      </h1>
                      <div className="flex gap-2 overflow-x-scroll no-scrollbar">
                        {details.similar.map((item) => (
                          <img
                            className="h-64 rounded cursor-pointer"
                            src={IMAGE_BASE_URL + item.poster_path}
                            alt={item.id}
                            key={item.id}
                            onClick={() => {
                              history.push(`/${category}/${item.id}`);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
