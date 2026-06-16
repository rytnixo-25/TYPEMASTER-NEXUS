import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Modes from "../pages/Modes";
import Difficulty from "../pages/Difficulty";
import Typing from "../pages/Typing";
import Results from "../pages/Results";
import Leaderboard from "../pages/Leaderboard";
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import ComingSoon from "../pages/ComingSoon";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/modes" element={<Modes />} />
                <Route path="/difficulty" element={<Difficulty />} />
                <Route path="/typing" element={<Typing />} />
                <Route path="/results" element={<Results />} />
                <Route
                    path="/leaderboard"
                    element={<Leaderboard />} />
                <Route
                    path="/dashboard"
                    element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/coming-soon"element={<ComingSoon />}/>
            </Routes>

        </BrowserRouter>
    );
};

export default AppRoutes;