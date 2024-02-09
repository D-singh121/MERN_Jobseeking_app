import { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Context } from '../../main';
import { Link, useNavigate } from 'react-router-dom';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]); // jo bhi job aayegi use hum yaha store karenge 
  // console.log(jobs);

  const { isAuthorized, } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios.get("http://localhost:8000/api/v1/job/getalljob", {
        withCredentials: true, // for cookies ,header
      }).then((res) => {
        // console.log(res);
        setJobs(res.data)   // sabhi jobs ko fetch karke "jobs" state me store kar rahe hai.
        console.log(res.data);
      });

    } catch (error) {
      console.log(error);
    }
  },[]);
  // if user is not authorized then he can't access the resource so redirecting to the home page.
  if (!isAuthorized) {
    navigate("/")
  }



  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        
        <div className="banner">
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default AllJobs