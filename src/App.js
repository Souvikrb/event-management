import { BrowserRouter as Router,useNavigate,Route,useLocation,Routes    } from "react-router-dom";
import MasterRoutes from "./routes/masterRoutes";
import Header from "./components/common/header";
import Sidebar from "./components/common/sidebar";
import Login from "./components/pages/login";
import Registration from "./components/pages/registration";

function App() {
  const AppLayout = () => {
    const location = useLocation();

    // Define routes where Header and Sidebar should not be shown
    const noLayoutRoutes = ["/login", "/registration","/admin/login"];

    const isNoLayoutRoute = noLayoutRoutes.includes(location.pathname);

    return (
      <>
        {/* Conditionally render Header and Sidebar */}
        {!isNoLayoutRoute && <Header />}
        {!isNoLayoutRoute && <Sidebar />}
        {/* Main application routes */}
        <MasterRoutes />
      </>
    );
  };

  return (
    <Router>
      <Routes>
        {/* Define public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        {/* Wrap all other routes inside the AppLayout */}
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}


export default App;
