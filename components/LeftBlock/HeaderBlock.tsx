import { Badge, Col, Flex, Row } from 'antd';
import { status } from './setting';

const HeaderBlock = () => {
  return (
    <Row>
      <Col span={18} push={6}>
        <Flex gap='small' vertical align='baseline'>
          <h1
            style={{
              fontSize: '1.25rem',
              lineHeight: '1.75rem',
              margin: 0,
            }}
          >
            STUDILY3 (STY3)
          </h1>
          <div className='status-contain'>
            {status.map((item, index) => (
              <Badge key={index}
                className='text-uppercase font-weight'
                count={item.title}
                style={{ backgroundColor: item.background, color: item.color }}
              />
            ))}
          </div>
          <a
            className='block'
            href='https://dedemy.tech'
            target='_blank'
            rel='noreferrer nofollow'
          >
          </a>
        </Flex>
      </Col>
      <Col span={6} pull={18}>
        <img
          src='https://presale.world/_next/image?url=https%3A%2F%2Fimagedelivery.net%2FkRBCQzvwK7zwoBSRz37l_g%2Fd8f7fb74-7cc9-4ef2-9640-7782dd528800%2Fpublic&w=3840&q=75'
          alt='icon'
          width='96px'
          height='96px'
        />
      </Col>
    </Row>
  );
};

export default HeaderBlock;
