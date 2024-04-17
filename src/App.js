import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import SpinsNowHomePage from "./SpinsNowHomePage/SpinsNowHomePage";
import LoginPage from "./Modules/SecurityModule/LoginPage";
import Header from "./Modules/HeaderModule/Header";
import { AuthProvider } from "./Modules/SecurityModule/AuthProvider";
function App() {
  return (
    <AuthProvider>
      <div className="bgs">
        <Header />
        <div className="App">
          <Routes>
            <Route index element={<SpinsNowHomePage />} />
            <Route path="/login" element={<LoginPage />} />
            {/*<Route path="/create" element={<LifeHackCreate />} />
          <Route path="/view/:id" element={<LifeHackSingle />} />
          <Route path="/viewAdmin/:id" element={<LifeHackSingleAdmin />} />
          <Route path="/admin" element={<LifeHackListApproved />} />
          <Route path="/adminedit/:id" element={<LifeHackEditAdmin />} />
          <Route path="/admincheck" element={<AdminCheck />} /> */}
          </Routes>
        </div>
        {/*<Footer /> */}
      </div>
    </AuthProvider>
  );
}

export default App;
