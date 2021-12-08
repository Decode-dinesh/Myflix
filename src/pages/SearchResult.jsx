import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL, IMAGE_BASE_URL, search } from "../requests";

const SearchResult = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResult = async () => {
      let res = await axios.get(BASE_URL + search(query));

      let filteredResult = res.data.results.filter(
        (item) => item.media_type !== "person" && item.poster_path
      );

      setResults(filteredResult);
    };
    fetchResult();
  }, [query]);

  return (
    <div className="min-h-full md:px-12">
      <div className="container-fluid">
        <h1 className="font-semibold text-2xl mt-14 mb-7">
          Search Result for: {query}
        </h1>
        <div className="row gx-2 gy-2">
          {results.map((item) => (
            <div className="col-6 md:col-4 lg:col-2" key={item.id}>
              <Link to={`/${item.media_type}/${item.id}`} role="img">
                <img
                  className="h-64 w-full object-cover rounded"
                  src={`${IMAGE_BASE_URL}${item?.poster_path}`}
                  alt={item.id}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
