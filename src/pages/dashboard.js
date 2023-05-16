// pages/dashboard.js
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import axios from 'axios';
import { Container, Row, Col, Table, Card, CardText, CardHeader, CardBody} from 'reactstrap';
import { format } from 'date-fns';
import withAuth from '../hoc/withAuth'; // Importe o HOC
import StatusAlert from './components/Status-Alert'; // Importe o componente StatusAlert
import BarChart from './components/Bar-Chart';

function Dashboard(props) {
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
    <div style={{backgroundColor: '#dddddd', paddingBottom: 20}}>
      <Navbar isAdmin={isAdmin} />
          <Container className="mt-4">
            <StatusAlert userStatus={userStatus} />
            <Row className="h-100">
              <Col xs="4" className="p-0">
                <Card className="my-2" color="success" inverse style={{ width: '18rem' }}>
                  <CardHeader>LOREN IPSUN</CardHeader>
                  <CardBody>
                    <CardText>LOREN IPSUN</CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="6" className="p-0">
                <Card className="my-2" color="light" inverse style={{ width: '18rem' }}>
                  <CardBody>
                  LOREN IPSUN
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row className="h-100" id='tabs'>
              <Card>
                <CardBody>
                LOREN IPSUN
                </CardBody>
              </Card>
            </Row>
            
            
          </Container>
    </div>
    
  );
}


export default withAuth(Dashboard); // Use o HOC
