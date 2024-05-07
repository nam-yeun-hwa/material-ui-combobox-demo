import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { fetchTop100Films } from "./fetch/fetchTop100Films";
import Select from "./components/Select";
import { selectOptionType } from "type/data";
import jsonData from "./json/top100Films.json";

function App() {
  const [selectedValue, setSelectedValue] = useState<string>();
  const [data, setData] = useState<selectOptionType>();

  useEffect(() => {
    const fetchData = async () => {
      let data = await fetchTop100Films();
      if (data) {
        setData(data);
        console.log("data", data);
      }
    };

    fetchData();
  }, [data]);

  return (
    <>
      <Select
        value={selectedValue}
        options={data}
        onChange={(value) => setSelectedValue(value)}
      />
    </>
  );
}

export default App;
