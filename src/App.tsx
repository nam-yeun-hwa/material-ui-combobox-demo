import "./App.css";
import "./components/select.css";
import { useEffect, useRef, useState } from "react";
import { fetchTop100Films } from "./fetch/fetchTop100Films";
import Select from "./components/Select";
import { selectOptionType } from "type/data";

function App() {
  const [selectedValue, setSelectedValue] = useState<string>();
  const [data, setData] = useState<selectOptionType>();

  useEffect(() => {
    const fetchData = async () => {
      let data = await fetchTop100Films();
      if (data) {
        setData(data);
      }
    };

    fetchData();
  }, [data]);

  return (
    <div className="container">
      <div className="contents">
        <Select options={data} />
      </div>
    </div>
  );
}

export default App;
