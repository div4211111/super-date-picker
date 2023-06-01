import "react-datepicker/dist/react-datepicker.css";
import { DatePicker, RelativeTimePicker, SetNow } from "./components";
import { useState } from "react";
function App() {
  const [date, setDate] = useState(new Date());
  const [isNow, setIsNow] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ alignSelf: "flex-start" }}>
        <DatePicker date={date} setDate={setDate} name={"Start date"} />
        <RelativeTimePicker date={date} setDate={setDate} name={"Start date"} />
        <SetNow setIsNow={setIsNow} type={"start"} />
      </div>
    </div>
  );
}

export default App;
