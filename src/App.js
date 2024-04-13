import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import SpinsNowHomePage from "./SpinsNowHomePage/SpinsNowHomePage";
function App() {
  return (
    <div className="bgs">
      {/*<Header /> */}
      <div className="App">
        <Routes>
          <Route index element={<SpinsNowHomePage />} />
          {/*<Route path="/create" element={<LifeHackCreate />} />
          <Route path="/edit/:id" element={<LifeHackEdit />} />
          <Route path="/view/:id" element={<LifeHackSingle />} />
          <Route path="/viewAdmin/:id" element={<LifeHackSingleAdmin />} />
          <Route path="/admin" element={<LifeHackListApproved />} />
          <Route path="/adminedit/:id" element={<LifeHackEditAdmin />} />
          <Route path="/admincheck" element={<AdminCheck />} /> */}
        </Routes>
      </div>
      {/*<Footer /> */}
    </div>
  );
}

export default App;
