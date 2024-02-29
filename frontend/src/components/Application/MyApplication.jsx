import { useContext, useEffect, useState } from "react";
import { Context } from "../../main.jsx";
import axios from "axios";
import ResumeModal from "./ResumeModal.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const MyApplication = () => {

  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();



  useEffect(() => {
    try {
      if (user && user.role === "JobSeeker") {
        axios.get("http://localhost:8000/api/v1/application/jobseeker/getall", { withCredentials: true }).then((res) => {
          console.log(res.data.applications, " from jobseeker");
          setApplications(res.data.applications)
        })
      } else {
        axios.get("http://localhost:8000/api/v1/application/employer/getall", { withCredentials: true }).then((res) => {
          // console.log(res.data.applications);
          setApplications(res.data.applications)
        })
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }, [isAuthorized]);


  if (!isAuthorized) {
    navigateTo("/login"); // yaha pe JobSeeker And Employer dono bhi aa sakte hai isliye use "/login " pe redirect kar denge ;
  }



  // Delete Application function for jobseeker 
  const deleteApplicationByJobseeker = (id) => {

    try {
      axios.delete(`http://localhost:8000/api/v1/application/jobseeker/delete/${id}`, { withCredentials: true })
        .then((res) => {
          toast.success(res.data.message); // application delete hone ke baad remaining application ko show bhi karna padega .
          setApplications((...prevApplications) =>
            prevApplications.filter((application) => application._id !== id)  // delete application ko exclude karke rest application ko state  me update kar denge.
          )
          navigateTo("/job/getalljob")
        })

    } catch (error) {
      toast.error(error.response.data.message)
    }
  };


  // To open a perticular Application in a model.
  const openApplicationModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  }

  // To Close the Application model.
  const closeApplicationModal = () => {
    setModalOpen(false);
  }

  return (
    <>
      <section className="my_applications page">
        {user && user.role === "JobSeeker" ? (
          <div className="container">
            <h1>My Applications</h1>
            {applications.length <= 0 ? (
              <>
                <h4>No Applications Found</h4>{" "}
              </>
            ) : (
              applications.map((element) => {
                return (
                  <JobSeekerCard  // passing some props into JobSeekerCard component.
                    element={element}
                    key={element._id}
                    deleteApplication={deleteApplicationByJobseeker}
                    openModal={openApplicationModal}
                  />
                );
              })
            )}
          </div>
        ) : (
          <div className="container">
            <h1>Applications From Job Seekers</h1>
            {applications.length <= 0 ? (
              <>
                <h4>No Applications Found</h4>
              </>
            ) : (
              applications.map((element) => {
                return (
                  <EmployerCard
                    element={element}
                    key={element._id}
                    openModal={openApplicationModal}
                  />
                );
              })
            )}
          </div>
        )}
        {modalOpen && ( // agar model open hai to model ko close kardenge.
          <ResumeModal imageUrl={resumeImageUrl} onClose={closeApplicationModal} />
          // imageUrl and onClose dono ko ResumeModal me as Props bhej rahe hai.
        )}
      </section>
    </>
  )
}

export default MyApplication;


// creating JobSeekerCard and EmployerCard .
const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>

        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
      </div>
    </>
  );
};