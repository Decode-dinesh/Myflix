import { useStore } from "../contexts/StoreContext";

import Row from "../components/Row";

const Home = () => {
  const { homeContent } = useStore();

  return (
    <div className="px-4 min-h-full">
      <h1 className="text-2xl md:text-3xl text-center font-bold mt-10 mb-6">
        Movies and TV shows for you
      </h1>
      {homeContent.map((item, index) => (
        <Row row={item} key={index} />
      ))}
    </div>
  );
};

export default Home;
