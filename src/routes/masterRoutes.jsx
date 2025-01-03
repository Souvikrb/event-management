import { Route, Routes } from "react-router-dom";
import Login from "../components/pages/login";
import Dashboard from "../components/pages/dashboard";
import CityAdd from "../components/pages/countrySetup/cityAdd";
import CountryAdd from "../components/pages/countrySetup/countryAdd";
import ServiceProvider from "../components/pages/serviceProvider/serviceProvider";
import ServiceProviderAdd from "../components/pages/serviceProvider/serviceProviderAdd";
import Country from "../components/pages/countrySetup/country";
import City from "../components/pages/countrySetup/city";
import CategoryAdd from "../components/pages/categoryMaster/categoryAdd";
import Category from "../components/pages/categoryMaster/category";
import Location from "../components/pages/locationMaster/location";
import LocationAdd from "../components/pages/locationMaster/locationAdd";
import ServiceProviderEdit from "../components/pages/serviceProvider/serviceProviderEdit";
import Registration from "../components/pages/registration";
import ProtectedRoute from "../app/protectedRoute";
import EventAdd from "../components/pages/eventManager/eventAdd";
import EventManager from "../components/pages/eventManager/eventManager";
import EventEdit from "../components/pages/eventManager/eventEdit";
import AdvertisementAdd from "../components/pages/advertisementManager/advertisementAdd";
import Advertisement from "../components/pages/advertisementManager/advertisement";

export default function MasterRoutes(){
    return(
        <Routes>
            <Route path="/admin/login" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/city/add/:id?" element={<CityAdd />} />
            <Route path="/country/add/:id?" element={<CountryAdd />} />
            <Route path="/country" element={<Country />} />
            <Route path="/city/:id?" element={<City />} />
            <Route path="/category/:id?" element={<Category />} />
            <Route path="/add-category" element={<CategoryAdd />} />
            <Route path="/location/:id?" element={<Location />} />
            <Route path="/location/add/:id?" element={<LocationAdd />} />
            <Route
            path="/serviceprovider"
            element={
                <ProtectedRoute permission="serviceprovider">
                    <ServiceProvider />
                </ProtectedRoute>
            }
        />
            {/* <Route path="/serviceprovider/" element={<ServiceProvider />} /> */}
            <Route path="/serviceprovider/add/" element={<ServiceProviderAdd />} />
            <Route path="/serviceprovider/update/:id" element={<ServiceProviderEdit />} />

            <Route path="/event/add/:id?" element={<EventAdd />} />
            <Route path="/event/" element={<EventManager />} />
            <Route path="/event/update/:id?" element={<EventEdit />} />
            <Route path="/advertisement/add/:id?" element={<AdvertisementAdd />} />
            <Route path="/advertisement/" element={<Advertisement />} />
        </Routes>
    );
}