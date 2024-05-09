import { useContext, useState } from "react"
import { Context } from '../../main';
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi"

import {BACKEND_URL_POINT} from '../utils/constants.js';


const Navbar = () => {

  const [show, setShow] = useState(false);

  const { isAuthorized, setIsAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL_POINT}/api/v1/user/logout`, { withCredentials: true })

      toast.success(response.data.message);
      setIsAuthorized(false) // agar user login nahi hai to.
      navigateTo("/login")
    } catch (error) {
      toast.error(error.response.data.message),
        setIsAuthorized(true); // logout nahi ho raha hai matlab user login hai.
    }
  }

  return (
    (
      <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
        <div className="container">

          <div className="logo">
              <h1>DC</h1>       
          </div>

          <ul className={!show ? "menu" : "show-menu menu"}>
            <li>
              <Link to={"/"} onClick={() => setShow(false)}>
                HOME
              </Link>
            </li>

            <li>
              <Link to={"/job/getalljob"} onClick={() => setShow(false)}>
                ALL JOBS
              </Link>
            </li>

            <li>
              <Link to={"/application/my"} onClick={() => setShow(false)}>
                {user && user.role === "Employer"
                  ? "APPLICANT'S APPLICATIONS"
                  : "MY APPLICATIONS"}
              </Link>
            </li>

            {user && user.role === "Employer" ? (
              <>
                <li>
                  <Link to={"/job/post"} onClick={() => setShow(false)}>
                    POST NEW JOB
                  </Link>
                </li>
                <li>
                  <Link to={"/job/my"} onClick={() => setShow(false)}>
                    VIEW YOUR JOBS
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}

            <button onClick={handleLogout}>LOGOUT</button>
          </ul>
          <div className="hamburger">
            <GiHamburgerMenu onClick={() => setShow(!show)} />
          </div>
        </div>
      </nav>
    )
  )
}

export default Navbar;