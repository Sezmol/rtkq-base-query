import { useGetRandomJokeQuery } from "./store/services/chuckNorrisApi";
import "./App.css";
import { AxiosQueryError } from "./core/apiClient";

function App() {
  const { data, isFetching, refetch, error } = useGetRandomJokeQuery();

  const getAnotherJoke = () => {
    refetch();
  };

  if (error) {
    const err = error as AxiosQueryError;

    return <div>Error! Code {err.status}</div>;
  }

  return (
    <div className="app">
      <h1>Chuck Norris Joke</h1>
      <div>{isFetching ? "Loading..." : data?.value}</div>
      <img className="img" src={data?.icon_url} alt="Chuck Norris" />
      <button className="btn" onClick={getAnotherJoke}>
        Get another joke
      </button>
    </div>
  );
}

export default App;
