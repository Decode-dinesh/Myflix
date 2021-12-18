import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, newRelease, popular, requests } from "../requests";

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

const StoreProvider = ({ children }) => {
  const [homeContent, setHomeContent] = useState([]);
  const [newContent, setNewContent] = useState({});
  const [popularContent, setPopularContent] = useState({});

  useEffect(() => {
    const fetchHomeContent = async () => {
      let homeData = [];
      for (const request in requests) {
        let result = await axios.get(BASE_URL + requests[request]);
        result.data["rowTitle"] = request;
        homeData.push(result.data);
      }
      setHomeContent(homeData);
    };

    const fetchNewContent = async () => {
      let today = new Date();
      let threeMonthBefore = new Date();
      threeMonthBefore = threeMonthBefore.setDate(today.getDate() - 90);
      today = today.toISOString().split("T")[0];
      let movieURL =
        BASE_URL +
        newRelease.movie +
        `&primary_release_date.gte=${threeMonthBefore}&primary_release_date.lte=${today}`;
      let tvURL =
        BASE_URL +
        newRelease.tv +
        `&primary_release_date.gte=${threeMonthBefore}&primary_release_date.lte=${today}`;
      let movieResult = await axios.get(movieURL);
      let tvResult = await axios.get(tvURL);

      setNewContent({
        movie: movieResult.data.results,
        tv: tvResult.data.results,
      });
    };

    const fetchPopularContent = async () => {
      let popularMoviesURL = BASE_URL + popular.movie;
      let popularTvURL = BASE_URL + popular.tv;
      let popularMovieResult = await axios.get(popularMoviesURL);
      let popularTvResult = await axios.get(popularTvURL);
      setPopularContent({
        movie: popularMovieResult.data.results,
        tv: popularTvResult.data.results,
      });
    };

    fetchHomeContent();
    fetchNewContent();
    fetchPopularContent();
  }, []);

  const value = {
    homeContent,
    newContent,
    popularContent,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider