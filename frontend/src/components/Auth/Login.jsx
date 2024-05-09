import { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

import {BACKEND_URL_POINT} from '../utils/constants.js';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);
  // console.log(isAuthorized);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${BACKEND_URL_POINT}/api/v1/user/login`,
        { email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      console.log(data);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setIsAuthorized(false)
    }
  };

  // if user is present then redirect to home page 
  if (isAuthorized) {
    return <Navigate to={'/'} />
  }


  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            {/* <img src="/JobZeelogo.png" alt="logo" /> */}
            <h2>DC</h2>
            <h3>Log to your account </h3>
          </div>

          <form>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="JobSeeker">JobSeeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>


            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  autoComplete="false"
                  placeholder="dee@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>

            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>

            <button type="submit" onClick={handleLogin}>
              LogIn
            </button>

            <Link to={"/signup"}> Register Now </Link>
          </form>
        </div>

        <div className="banner">
          <img src="/login.png" alt="login" />
        </div>
      </section>
    </>
  );
}


export default Login;
