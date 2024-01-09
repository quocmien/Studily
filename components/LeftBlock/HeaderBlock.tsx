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
      <Col span={6} pull={18} className='text-center'>
        <img
          src='/logo.png'
          alt='icon'
          width='96px'
          height='96px'
        />
        <h3 className="text-uppercase">
          Studily
        </h3>
      </Col>
    </Row>
  );
};

export default HeaderBlock;
