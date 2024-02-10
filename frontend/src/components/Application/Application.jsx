import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";


const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null); // to manage the uploded file in resume input.

  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);   // updating the file state.
  };

  const { id } = useParams(); // getting  application id from params.

  const handleApplication = async (e) => {
    e.preventDefault(); // preventing default nature of form submission.

    // jab hum normal text data ko post karte hai to directly db me post kar dete hai but agar kisi file ya image ko bhejna hoga to pahle us data ko hum "FormData()" object  me store karenge fir post me bhejenge.

    const formData = new FormData(); // created a instance of FormData object which store the userProvided formData.
    formData.append("name", name);  // useState data
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/application/jobseeker/applyjob",
        formData, // containing all input field data.
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName(""); // after form get posted , empty or clearout the form input.
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume("");

      toast.success(data.message);
      navigateTo("/job/getalljob"); // redirecting to the getalljob page.
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section className="application">

      <div className="container">
        <h3>Application Form</h3>

        <form onSubmit={handleApplication}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <textarea
            placeholder="CoverLetter..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />

          <div>
            <label
              style={{ textAlign: "start", display: "block", fontSize: "20px" }}
            >
              Select Resume
            </label>
            <input
              type="file"
              accept=".pdf, .jpg, .png, .jpeg , webp"
              onChange={handleFileChange} // passing the ref of handleFileChange() function.
              style={{ width: "100%" }}
            />
          </div>

          <button type="submit">Send Application</button>
        </form>
      </div>
    </section>
  );
};

export default Application;