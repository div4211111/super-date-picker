import "react-datepicker/dist/react-datepicker.css";
import { DatePicker, Input, RelativeTimePicker, Select } from "./components";
import { useState } from "react";
import { parseRelativeParts, relativeOptions } from "@shared/timeOptions";
function App() {
  const [date, setDate] = useState(new Date());
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ alignSelf: "flex-start" }}>
        <DatePicker date={date} setDate={setDate} name={"Start date"} />
        <RelativeTimePicker date={date} setDate={setDate} name={"Start date"} />
      </div>
    </div>
  );
}

export default App;
