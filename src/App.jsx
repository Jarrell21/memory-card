import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon-species");
      const data = await response.json();
      setData(data.results);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <p className="">Hello World</p>
      {data.map((item, index) => (
        <p key={index}>{item.name}</p>
      ))}
    </div>
  );
}

export default App;
