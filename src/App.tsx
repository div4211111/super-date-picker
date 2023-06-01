import "react-datepicker/dist/react-datepicker.css";
import { DatePicker, Input, Select } from "./components";
import { useState } from "react";
import { relativeOptions } from "@shared/timeOptions";
function App() {
  const [date, setDate] = useState(new Date());
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ alignSelf: "flex-start" }}>
        <DatePicker date={date} setDate={setDate} name={"Start date"} />
        <Input type={"number"} />
        <Select options={relativeOptions} />
      </div>
    </div>
  );
}

export default App;
