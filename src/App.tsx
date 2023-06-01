import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "./components";
import { useState } from "react";
function App() {
  const [date, setDate] = useState(new Date());
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ alignSelf: "flex-start" }}>
        <DatePicker date={date} setDate={setDate} name={"Start date"} />
      </div>
    </div>
  );
}

export default App;
