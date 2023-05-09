// pages/add-signals.js
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import axios from 'axios';
import { Container, Row, Col, Card, CardText, CardHeader, CardBody, Button, Form, FormGroup, Label, Input, ListGroup, ListGroupItem, ListGroupItemHeading, CardFooter} from 'reactstrap';

import withAdminAuth from '../hoc/withAdminAuth'; // Importe o HOC
import StatusAlert from './components/Status-Alert'; // Importe o componente StatusAlert
import MyToast from './components/My-Toast';
import SignalCard from './components/Signal-Card';

function AddSignals(props) {
    const [showToast, setShowToast] = useState(false);
    const [toastTitle, setToastTitle] = useState('');
    const [toastText, setToastText] = useState('');
    const [bgClass, setBgClass] = useState('');
    const { userStatus } = props; // Obtenha o userStatus das props
    const [sinais, setSinais] = useState([]);

    const addValueToSinais = (data) => {
        // Verifica se dataArray é um array
        if (Array.isArray(data)) {
            // Cria uma cópia do array atual e concatena dataArray
            const newArray = [...sinais, ...data];

            // Atualiza o estado com o novo array
            setSinais(newArray);
        } else {
            // Lida com casos em que dataArray não é um array
        }
      };
  
    // Define a função para esconder o Toast automaticamente
    const hideToast = () => setShowToast(false);
  
    const [signalForm, setSignalForm] = useState({
      moeda: '',
      precoEntrada: '',
      alvos: '',
      stopLoss: '',
    });
  

  useEffect(() => {
    
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignalForm({ ...signalForm, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        signalForm.token = localStorage.getItem('token');
        const response = await axios.put(`${process.env.REACT_APP_API_ADDRESS}addSignal.php`, signalForm);
        addValueToSinais(response.data.data);
        
        setShowToast(true);
        setTimeout(hideToast, 3000); // Fechar o toast após 3 segundos
        setToastTitle('Sucesso');
        setToastText(response.data.message);
        setBgClass('bg-success');
  
      } catch (error) {
        setShowToast(true);
        setTimeout(hideToast, 3000); // Fechar o toast após 3 segundos
        setToastTitle('Erro');
        setToastText(error.response.data.message);
        setBgClass('bg-danger');
      }
  };


  return (
    <div style={{backgroundColor: '#dddddd', paddingBottom: 20}}>
      <Navbar />
      <MyToast isOpen={showToast} title={toastTitle} message={toastText} bgClass={bgClass}/>
          <Container className="mt-4">
            <StatusAlert userStatus={userStatus} />
            <Row  className="h-100" fluid='true'>
            {console.log(sinais)}
            {sinais && sinais.length > 0 ? (
                
                sinais.map(sinal => (
                    
                <SignalCard sinal={sinal} />
                    ))
            ) : ('')
            }
            </Row>
            <Row className="h-100">
                <Card className="h-100 p-0">
                    <CardHeader>Criar Sinal</CardHeader>
                    <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                        <Label for="moeda">Moeda</Label>
                        <Input type="text" name="moeda" id="moeda" placeholder="Digite a moeda" onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                        <Label for="precoEntrada">Preço de Entrada</Label>
                        <Input type="number" name="precoEntrada" id="precoEntrada" placeholder="Digite o preço de entrada" onChange={handleInputChange}/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="alvos">Alvos</Label>
                        <Input type="text" name="alvos" id="alvos" placeholder="Digite os alvos" onChange={handleInputChange}/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="stopLoss">Stop Loss</Label>
                        <Input type="number" name="stopLoss" id="stopLoss" placeholder="Digite o valor do Stop Loss" onChange={handleInputChange}/>
                        </FormGroup>
                        <Button type="submit" color="primary">Enviar</Button>
                    </Form>
                    </CardBody>
                </Card>
            </Row>
            
          </Container>
    </div>
    
  );
}


export default withAdminAuth(AddSignals); // Use o HOC
