import { Card, Flex } from 'antd';
import BannerHome from '../components/home/BannerHome';
import Advisor from '../components/home/Advisor'

const MainPage = () => {
  return (
    <div className="page-home">
      <BannerHome />
      <Advisor />
    </div>
  );
};

export default MainPage;
