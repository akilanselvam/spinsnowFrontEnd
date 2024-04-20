import "./App.css";
import { Routes, Route } from "react-router-dom";
import SpinsNowHomePage from "./SpinsNowHomePage/SpinsNowHomePage";
import LoginPage from "./Modules/SecurityModule/LoginPage";
import Header from "./Modules/HeaderModule/Header";
import LatestTenProblems from "./Modules/ProblemModule/LatestTenProblems";
import { AuthProvider } from "./Modules/SecurityModule/AuthProvider";
import ProblemCollabViewModel from "./SpinsNowHomePage/ProblemCollabViewModel";
import SpinsNowModuleHomePage from "./SpinsNowHomePage/SpinsNowModuleHomePage";
import Navbar from "./Modules/HeaderModule/NavBar";
import HompageProjectCard from "./Modules/ProjectModule/HompageProjectCard";
import MobileNavbar from "./Modules/HeaderModule/MobileNavbar";
import { useMediaQuery } from "react-responsive";
import HomePageCreateProblem from "./Modules/ProblemModule/HomePageCreateProblem";
import ProjectCommunityViewModel from "./SpinsNowHomePage/ProjectCommunityViewModel";
function App() {
  const isMobile = useMediaQuery({ maxWidth: 640 }); // Adjust the breakpoint as needed

  return (
    <AuthProvider>
      <Header />
      {isMobile && <MobileNavbar />}
      <div className="flex h-screen">
        <Navbar />

        <div className="flex-grow">
          <Routes>
            <Route index element={<SpinsNowHomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/Modulehomepage" element={<SpinsNowModuleHomePage />} />
            <Route path="/problem/:problemId" element={<ProblemCollabViewModel />} />
            <Route path="/project/:projectId" element={<ProjectCommunityViewModel />} />
            <Route path="/suggestedProjectFeed" element={<HompageProjectCard />} />

            {/*<Route path="/create" element={<LifeHackCreate />} />
            <Route path="/view/:id" element={<LifeHackSingle />} />
            <Route path="/viewAdmin/:id" element={<LifeHackSingleAdmin />} />
            <Route path="/admin" element={<LifeHackListApproved />} />
            <Route path="/adminedit/:id" element={<LifeHackEditAdmin />} />
            <Route path="/admincheck" element={<AdminCheck />} /> */}
          </Routes>
        </div>

        <div className="lg:block hidden">
          <HompageProjectCard />
        </div>
      </div>

      {/*<Footer /> */}
    </AuthProvider>
  );
}

export default App;
