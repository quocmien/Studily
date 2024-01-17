import BannerHome from '../components/home/BannerHome';
import Advisor from '../components/home/Advisor'
import HowBuy from '../components/home/HowBuy'
import Tokenomics from '../components/home/Tokenomics';
import MeetOurTeam from '../components/home/MeetOurTeam'
import AboutHome from '../components/home/AboutHome'
import Roadmap from '../components/home/Roadmap'
import JoinOur from '../components/home/JoinOur'

const MainPage = () => {
  return (
    <div className="page-home">
      <BannerHome />
      <Advisor />
      <AboutHome />
      <HowBuy />
      <Tokenomics />
      <Roadmap />
      <MeetOurTeam />
      <JoinOur />
    </div>
  );
};

export default MainPage;
