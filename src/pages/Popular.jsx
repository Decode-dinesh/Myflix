import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../contexts/StoreContext";
import { IMAGE_BASE_URL } from "../requests";

const Popular = () => {
  const { popularContent } = useStore();
  const [category, setCategory] = useState("movie");

  return (
    <div className="px-4 min-h-full">
      <h1 className="text-lg font-bold text-center my-5">Popular</h1>
      <div className="container-fluid flex flex-col">
        <div className="mx-auto">
          <button
            className={`${
              category === "movie" ? "bg-yellow-500 text-black" : ""
            } px-3 py-1 mb-4 mr-1 border-2 border-solid border-yellow-500 rounded-md hover:bg-yellow-500 hover:text-black`}
            onClick={() => setCategory("movie")}
          >
            Movies
          </button>
          <button
            className={`${
              category === "tv" ? "bg-yellow-500 text-black" : ""
            } px-3 py-1 mb-4 ml-1 border-2 border-solid border-yellow-500 rounded-md hover:bg-yellow-500 hover:text-black`}
            onClick={() => setCategory("tv")}
          >
            TV Shows
          </button>
        </div>
        <div className="row gy-2 gx-1">
          {popularContent.movie &&
            popularContent.tv &&
            popularContent[category].map((poster) => (
              <div
                className="col-6 md:col-3 lg:col-auto flex justify-center"
                key={poster.id}
              >
                <Link
                  to={`/${poster.first_air_date ? "tv" : "movie"}/${poster.id}`}
                  role="img"
                >
                  <img
                    className="h-38 md:h-56 px-1 rounded-md cursor-pointer"
                    src={IMAGE_BASE_URL + poster.poster_path}
                    alt={poster.id}
                  />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Popular;
