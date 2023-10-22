import React from 'react'
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import { useGetCryptoCoinsQuery } from '../services/cryptoApi';
import coinsDescriptions from './coinsDescription';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
const Exchanges = () => {
    const {data,isFetching} = useGetCryptoCoinsQuery();
    
    const coinsList = data?.data?.coins;
    if(isFetching) return <Loader/>

  return (
    <>
        <Row className='top-coins-header'>
            <Col span={6}>Currencies</Col>
            <Col span={6}>Symbol</Col>
            <Col span={6}>Price</Col>
            <Col span={6}>MarketCap</Col>
        </Row>
        <Row>
            {coinsList.slice(0,10).map((coin, index) => (
                <Col span={24}>
                    <Collapse>
                        <Panel key={index}
                        showArrow={false} 
                        header={(
                            <Row key={index}>
                                <Col span={6}>
                                    <Text><strong>{coin.rank}</strong></Text>
                                    <Avatar className='exchange-image' src={coin?.iconUrl || demoImage}/>
                                    <Text><strong>{coin?.name}</strong></Text>
                                </Col>
                                <Col span={6}>{coin.symbol}</Col>
                                <Col span={6}>${millify(coin.price)}</Col>
                                <Col span={6}>${millify(coin.marketCap)}</Col>
                            </Row>

                        )} >
                                <p>{coinsDescriptions[index]}</p>
                        </Panel>
                    </Collapse>
                </Col>
            ))}
        </Row>
    </>
  )
}

export default Exchanges