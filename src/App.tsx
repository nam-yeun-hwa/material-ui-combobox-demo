import "./App.css";
import { useEffect, useState } from "react";
import { fetchTop100Films } from "./fetch/fetchTop100Films";
import Select from "./components/Select";
import { selectOptionType } from "type/data";

function App() {
  const [selectedValue, setSelectedValue] = useState<Array<selectOptionType>>();

  useEffect(() => {
    fetchTop100Films();
    setSelectedValue((preValue) => {
      return preValue;
    });
  }, []);

  return (
    <>
      {/* <Select
        value={selectedValue}
        options={top100Films}
        onChange={(value) => setSelectedValue(value)}
      /> */}
    </>
  );
}

export default App;
