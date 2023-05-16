// pages/dashboard.js
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Container, CardHeader, CardBody } from 'reactstrap';
import classnames from 'classnames';
import { format } from 'date-fns';
import withAuth from '../hoc/withAuth'; // Importe o HOC
import StatusAlert from './components/Status-Alert'; // Importe o componente StatusAlert
import SignalCard from './components/Signal-Card';

function Dashboard(props) {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }
  const [sinais, setSinais] = useState([]);
  const [feito, setFeito] = useState(false);
  const [sinaisAbertos, setSinaisAbertos] = useState([]);
  const [sinaisGain, setSinaisGain] = useState([]);
  const [sinaisLoss, setSinaisLoss] = useState([]);

  const { userStatus, isAdmin } = props;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd');
  };

  const fetchSignals = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ADDRESS}getSignals.php`
      );
      const data = response.data.data;
      setSinais(data);

      const sinaisAbertos = data.filter(signal => [0, 1, 2].includes(signal.status));
      const sinaisGain = data.filter(signal => signal.status === 3);
      const sinaisLoss = data.filter(signal => signal.status === 4);

      setSinaisAbertos(sinaisAbertos);
      setSinaisGain(sinaisGain);
      setSinaisLoss(sinaisLoss);

      setFeito(true);
    } catch (error) {
      console.error("Erro ao buscar sinais:", error);
    }
  };

  useEffect(() => {
    if (!feito) {
      fetchSignals(); // Chame a função fetchSignals no useEffect
    }
  }, [feito]);

  return (
    <div style={{ backgroundColor: '#dddddd', paddingBottom: 20 }}>
      <Navbar isAdmin={isAdmin} />
      <Container className="mt-4">
        <StatusAlert userStatus={userStatus} />
        <Row className="h-100 text-center justify-content-center" fluid="true">
            <Card className="my-2 p-0" color="primary" inverse style={{ width: '18rem' }}>
              <CardHeader>SINAIS ABERTOS</CardHeader>
              <CardBody>
                <CardText>{sinaisAbertos.length}</CardText>
              </CardBody>
            </Card>
            <Card className="my-2 p-0" color="success" inverse style={{ width: '18rem' }}>
              <CardHeader>GAIN</CardHeader>
              <CardBody>
                <CardText>{sinaisGain.length}</CardText>
              </CardBody>
            </Card>
            <Card className="my-2 p-0" color="danger" inverse style={{ width: '18rem' }}>
              <CardHeader>LOSS</CardHeader>
              <CardBody>
                <CardText>{sinaisLoss.length}</CardText>
              </CardBody>
            </Card>
        </Row>
        <Row className="h-100 text-center justify-content-center" fluid="true">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1'); }}
              >
                Sinais Abertos
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggle('2'); }}
              >
                Sinais Gain
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '3' })}
                onClick={() => { toggle('3'); }}
              >
                Sinais Loss
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab} className='p-0'>
            <TabPane tabId="1" style={{backgroundColor: '#ffffFF'}}>
              <Row className="h-100 text-center justify-content-center" fluid="true">
              {sinaisAbertos && sinaisAbertos.length > 0
                ? [...sinaisAbertos]
                  .reverse()
                  .map((sinal) => <SignalCard key={sinal.id} signal={sinal} />)
                : ""}
                </Row>
            </TabPane>
            <TabPane tabId="2" style={{backgroundColor: '#ffffFF'}} >
            <Row className="h-100 text-center justify-content-center" fluid="true">
              {sinaisGain && sinaisGain.length > 0
                ? [...sinaisGain]
                  .reverse()
                  .map((sinal) => <SignalCard key={sinal.id} signal={sinal} />)
                : ""}
                </Row>
            </TabPane>
            <TabPane tabId="3" style={{backgroundColor: '#ffffFF'}}>
            <Row className="h-100 text-center justify-content-center" fluid="true">
              {sinaisLoss && sinaisLoss.length > 0
                ? [...sinaisLoss]
                  .reverse()
                  .map((sinal) => <SignalCard key={sinal.id} signal={sinal} />)
                : ""}
                </Row>
            </TabPane>
          </TabContent>
        </Row>


      </Container>
    </div>

  );
}


export default withAuth(Dashboard); // Use o HOC
