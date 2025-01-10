import { Route, Routes } from "react-router-dom";
import Login from "../components/pages/login";
import Registration from "../components/pages/registration";
import Dashboard from "../components/pages/dashboard";
import CityAdd from "../components/pages/countrySetup/cityAdd";
import CountryAdd from "../components/pages/countrySetup/countryAdd";
import ServiceProvider from "../components/pages/serviceProvider/serviceProvider";
import ServiceProviderAdd from "../components/pages/serviceProvider/serviceProviderAdd";
import ServiceProviderEdit from "../components/pages/serviceProvider/serviceProviderEdit";
import Country from "../components/pages/countrySetup/country";
import City from "../components/pages/countrySetup/city";
import CategoryAdd from "../components/pages/categoryMaster/categoryAdd";
import Category from "../components/pages/categoryMaster/category";
import Location from "../components/pages/locationMaster/location";
import LocationAdd from "../components/pages/locationMaster/locationAdd";
import EventAdd from "../components/pages/eventManager/eventAdd";
import EventManager from "../components/pages/eventManager/eventManager";
import EventShow from "../components/pages/eventManager/eventshow";
import AdvertisementAdd from "../components/pages/advertisementManager/advertisementAdd";
import Advertisement from "../components/pages/advertisementManager/advertisement";
import UserManager from "../components/pages/userManager/userManager";
import UserManagerAdd from "../components/pages/userManager/userManagerAdd";
import ProtectedRoute from "../app/protectedRoute";

export default function MasterRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />

            {/* Dashboard */}
            <Route
                path="/"
                element={
                    <ProtectedRoute permission="dashboard">
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            {/* Country & City Setup */}
            <Route
                path="/country"
                element={
                    <ProtectedRoute permission="country">
                        <Country />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/country/add/:id?"
                element={
                    <ProtectedRoute permission="country">
                        <CountryAdd />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/city"
                element={
                    <ProtectedRoute permission="city">
                        <City />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/city/add/:id?"
                element={
                    <ProtectedRoute permission="city">
                        <CityAdd />
                    </ProtectedRoute>
                }
            />

            {/* Category Management */}
            <Route
                path="/category"
                element={
                    <ProtectedRoute permission="category">
                        <Category />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/category/add/:id?"
                element={
                    <ProtectedRoute permission="category">
                        <CategoryAdd />
                    </ProtectedRoute>
                }
            />

            {/* Location Management */}
            <Route
                path="/location"
                element={
                    <ProtectedRoute permission="location">
                        <Location />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/location/add/:id?"
                element={
                    <ProtectedRoute permission="location">
                        <LocationAdd />
                    </ProtectedRoute>
                }
            />

            {/* Service Provider Management */}
            <Route
                path="/serviceprovider"
                element={
                    <ProtectedRoute permission="serviceprovider">
                        <ServiceProvider />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/serviceprovider/add"
                element={
                    <ProtectedRoute permission="serviceprovider">
                        <ServiceProviderAdd />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/serviceprovider/update/:id"
                element={
                    <ProtectedRoute permission="serviceprovider">
                        <ServiceProviderEdit />
                    </ProtectedRoute>
                }
            />

            {/* Event Management */}
            <Route
                path="/event"
                element={
                    <ProtectedRoute permission="event">
                        <EventManager />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/event/add/:id?"
                element={
                    <ProtectedRoute permission="event">
                        <EventAdd />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/event/list/:id?"
                element={
                    <ProtectedRoute permission="event">
                        <EventShow />
                    </ProtectedRoute>
                }
            />

            {/* Advertisement Management */}
            <Route
                path="/advertisement"
                element={
                    <ProtectedRoute permission="advertisement">
                        <Advertisement />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/advertisement/add/:id?"
                element={
                    <ProtectedRoute permission="advertisement">
                        <AdvertisementAdd />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/advertisement/update/:id?"
                element={
                    <ProtectedRoute permission="advertisement">
                        <AdvertisementAdd />
                    </ProtectedRoute>
                }
            />

            {/* User Management */}
            <Route
                path="/users"
                element={
                    <ProtectedRoute permission="usermanager">
                        <UserManager />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user/add"
                element={
                    <ProtectedRoute permission="usermanager">
                        <UserManagerAdd />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user/update/:id?"
                element={
                    <ProtectedRoute permission="usermanager">
                        <UserManagerAdd />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}
