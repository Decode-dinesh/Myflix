import { useHistory } from "react-router";

import { IMAGE_BASE_URL } from "../requests";

const Row = ({ row }) => {
  const history = useHistory();

  return (
    <div className="my-3">
      <h1 className="text-lg font-semibold mb-2">{row.rowTitle}</h1>
      <div className="flex overflow-y-hidden overflow-x-scroll no-scrollbar">
        {row.results.map((poster) => (
          <img
            className="h-48 md:h-56 px-1 rounded-md cursor-pointer"
            src={IMAGE_BASE_URL + poster.poster_path}
            alt={poster.id}
            key={poster.id}
            onClick={() => {
              history.push(
                `/${poster.first_air_date ? "tv" : "movie"}/${poster.id}`
              );
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Row