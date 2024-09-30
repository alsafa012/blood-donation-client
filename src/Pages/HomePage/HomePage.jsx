import Banner from "../../Components/Header/Banner";
import ReviewSection from "../../Components/ReviewSection/ReviewSection";
import MyContainer from "../../Shared/MyContainer";
import WebsiteTitle from "../../Shared/WebsiteTitle";

const HomePage = () => {
  return (
    <MyContainer>
      <WebsiteTitle name={"Hope || Home"} />
      <Banner />
      <ReviewSection />
    </MyContainer>
  );
};

export default HomePage;
