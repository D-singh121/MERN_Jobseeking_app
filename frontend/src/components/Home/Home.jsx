import { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection.jsx";
import HowItWorks from "./subComponents/HowItWorks.jsx";
import PopularCategories from "./subComponents/PopularCategories.jsx";
import PopularCompanies from "./subComponents/PopularCompanies.jsx";

const Home = () => {
  const { isAuthorized } = useContext(Context);

  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  } else {
    // setIsAuthorized(true); // this was causing unneccesry state update.
    <Navigate to={"/"} />
  }
  return (
    <>
      <section className="homePage page">
        <HeroSection />
        <HowItWorks />
        <PopularCategories />
        <PopularCompanies />
      </section>
    </>
  );
}
export default Home;