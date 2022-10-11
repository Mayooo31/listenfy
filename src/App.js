import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Mode from "./pages/Mode";
import Home from "./pages/Home";

const App = () => {
  const [openPanel, setOpenPanel] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mode />} />
        <Route
          path="/home"
          element={<Home openPanel={openPanel} setOpenPanel={setOpenPanel} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
