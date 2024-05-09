import { useContext, useEffect } from "react"
import { Context } from "./main.jsx";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignUp from "./components/Auth/SignUp.jsx"
import LogIn from "./components/Auth/Login.jsx";
import Navbar from "./components/Layout/Navbar.jsx"
import Footer from "./components/Layout/Footer.jsx";
import Home from "./components/Home/Home.jsx";

import JobDetails from "./components/Job/JobDetails.jsx";
import AllJobs from './components/Job/AllJobs.jsx';
import MyJobs from './components/Job/MyJobs.jsx';
import PostJob from './components/Job/PostJob.jsx';

import Application from './components/Application/Application.jsx';
import MyApplication from './components/Application/MyApplication.jsx';

import NotFound from "./components/NotFound/NotFound.jsx";
import { Toaster } from "react-hot-toast";

import {BACKEND_URL_POINT} from './components/utils/constants.js';


const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL_POINT}/api/v1/user/getuser`, { withCredentials: true });
        // console.log(response.data.user);
        
        if (response) {
          setUser(response.data.user);
          setIsAuthorized(true);
        }
      } catch (error) {
        setIsAuthorized(false)
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/job/getalljob" element={<AllJobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/my" element={<MyJobs />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/application/my" element={<MyApplication />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </>
  )
}

export default App
