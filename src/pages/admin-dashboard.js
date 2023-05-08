// pages/admin-dashboard.js
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import axios from 'axios';
import { Container, Row, Col, Card, CardHeader, CardBody, Table, CardText } from 'reactstrap';
import withAdminAuth from '../hoc/withAdminAuth';

function AdminDashboard(props) {
  const [userCount, setUserCount] = useState(0);
  const [apiKeyCount, setApiKeyCount] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData () {
      const usersResponse = await axios.get(`${process.env.REACT_APP_API_ADDRESS}getUsersWithPnl.php?token=${localStorage.getItem('token')}`);
      setUsers(usersResponse.data.usersWithPnl);
      const apiKeyResponse = await axios.get(`${process.env.REACT_APP_API_ADDRESS}getApiKeyCount.php?token=${localStorage.getItem('token')}`);
      setApiKeyCount(apiKeyResponse.data.apiKeyCount);
      const userResponse = await axios.get(`${process.env.REACT_APP_API_ADDRESS}getUserCount.php?token=${localStorage.getItem('token')}`);
      setUserCount(userResponse.data.userCount);

    };

    fetchData();
    
  }, []);

  return (
    <div style={{ backgroundColor: '#dddddd', paddingBottom: 20 }}>
      <Navbar />
      <Container className="mt-4">
        <Row>
          <Col xs="4">
            <Card className="my-2" color="info" inverse>
              <CardHeader>Usuários</CardHeader>
              <CardBody>
                <CardText>{userCount}</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col xs="4">
            <Card className="my-2" color="warning" inverse>
              <CardHeader>Chaves de API</CardHeader>
              <CardBody>
                <CardText>{apiKeyCount}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Card>
            <CardBody>
              <Table responsive>
              <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Telegram</th>
                    <th>Email</th>
                    <th>PNL fechado</th>
                  </tr>
                </thead>
                <tbody>
                {users && users.length > 0 ? (
                    users.map(user => (
                    <tr key={user.id}>
                        <td>{user.nome}</td>
                        <td>{user.telegram}</td>
                        <td>{user.email}</td>
                        <td>{user.closedPnl}</td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan="4">Nenhum dado disponível</td>
                    </tr>
                )}
                </tbody>

              </Table>
            </CardBody>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default withAdminAuth(AdminDashboard); // Use o HOC

