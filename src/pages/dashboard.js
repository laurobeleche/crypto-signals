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

  const { userStatus } = props;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd');
  };

  useEffect(() => {
    
  }, []);

  return (
    <div style={{backgroundColor: '#dddddd', paddingBottom: 20}}>
      <Navbar />
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
            <Row className="h-100">
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
