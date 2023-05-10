// pages/add-signals.js
import { useEffect, useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  ListGroupItem,
  Form,
  ListGroup,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import withAdminAuth from "../hoc/withAdminAuth"; // Importe o HOC
import StatusAlert from "./components/Status-Alert"; // Importe o componente StatusAlert
import MyToast from "./components/My-Toast";
import SignalCard from "./components/Signal-Card";

function AddSignals(props) {
  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastText, setToastText] = useState("");
  const [bgClass, setBgClass] = useState("");
  const { userStatus } = props; // Obtenha o userStatus das props
  const [sinais, setSinais] = useState([]);
  const [feito, setFeito] = useState(false);

  console.log("renderizou");

  const addValueToSinais = (data) => {
    // Verifica se dataArray é um array
    let newArray = [...sinais];
    newArray.push(data);

    // Atualiza o estado com o novo array
    setSinais(newArray);
  };
  // Adicione a função fetchSignals
  const fetchSignals = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ADDRESS}getSignals.php`
      );
      setSinais(response.data.data);
      setFeito(true);
    } catch (error) {
      console.error("Erro ao buscar sinais:", error);
    }
  };

  // Define a função para esconder o Toast automaticamente
  const hideToast = () => setShowToast(false);

  const isFormValid = () => {
    return (
      signalForm.moeda.trim() !== "" &&
      signalForm.stopLoss.trim() !== "" &&
      signalForm.entradas.length > 0 &&
      signalForm.palvos.length > 0
    );
  };


  const [signalForm, setSignalForm] = useState({
    moeda: "",
    precoEntrada: "",
    alvos: "",
    stopLoss: "",
    entradas: [],
    palvos: [],
  });
  const addEntry = () => {
    const newEntries = [...signalForm.entradas, signalForm.precoEntrada];
    setSignalForm({ ...signalForm, entradas: newEntries, precoEntrada: "" });
    localStorage.setItem("signalForm", JSON.stringify(signalForm));
  };
  const addAlvo = () => {
    if (signalForm.entradas.length > 0) {
      const maxEntry = Math.max(...signalForm.entradas);
      if (parseFloat(signalForm.alvos) <= parseFloat(maxEntry)) {
        alert("O alvo deve ser maior que a maior entrada cadastrada.");
        return;
      }
    }

    const newEntries = [...signalForm.palvos, signalForm.alvos];
    setSignalForm({ ...signalForm, palvos: newEntries, alvos: "" });
    localStorage.setItem("signalForm", JSON.stringify(signalForm));
  };

  const removeEntry = (index) => {
    const newEntries = signalForm.entradas.filter((_, i) => i !== index);
    setSignalForm({ ...signalForm, entradas: newEntries });
    localStorage.setItem("signalForm", JSON.stringify(signalForm));
  };

  const removeAlvo = (index) => {
    const newAlvos = signalForm.palvos.filter((_, i) => i !== index);
    setSignalForm({ ...signalForm, palvos: newAlvos });
    localStorage.setItem("signalForm", JSON.stringify(signalForm));
  };

  useEffect(() => {
    if (!feito) {
      fetchSignals(); // Chame a função fetchSignals no useEffect
    }
  }, [feito]);

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setSignalForm((prevState) => ({ ...prevState, [name]: value }));
    localStorage.setItem("signalForm", JSON.stringify(signalForm));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      signalForm.token = localStorage.getItem("token");
      signalForm.precoEntrada = signalForm.entradas.join(","); // Converter array em string separada por vírgulas
      signalForm.alvos = signalForm.palvos.join(","); // Converter array em string separada por vírgulas
      const response = await axios.put(
        `${process.env.REACT_APP_API_ADDRESS}addSignal.php`,
        signalForm
      );
      addValueToSinais(response.data.data);

      setShowToast(true);
      setTimeout(hideToast, 3000); // Fechar o toast após 3 segundos
      setToastTitle("Sucesso");
      setToastText(response.data.message);
      setBgClass("bg-success");
      resetForm(); // Chamar a função resetForm aqui
    } catch (error) {
      setShowToast(true);
      setTimeout(hideToast, 3000); // Fechar o toast após 3 segundos
      setToastTitle("Erro");
      setToastText(error.response.data.message);
      setBgClass("bg-danger");
    }
  };
  const resetForm = () => {
    setSignalForm({
      moeda: "",
      precoEntrada: "",
      alvos: "",
      stopLoss: "",
      entradas: [],
      palvos: [],
    });
  };
  

  return (
    <div style={{ backgroundColor: "#dddddd", paddingBottom: 20 }}>
      <Navbar />
      <MyToast
        isOpen={showToast}
        title={toastTitle}
        message={toastText}
        bgClass={bgClass}
      />
      <Container className="mt-4">
        <StatusAlert userStatus={userStatus} />
        <Row className="h-100 text-center" fluid="true">
          {sinais && sinais.length > 0
            ? [...sinais]
              .reverse()
              .map((sinal) => <SignalCard key={sinal.id} signal={sinal} />)
            : ""}
        </Row>
        <Row className="h-100">
          <Card className="h-100 p-0">
            <CardHeader>Criar Sinal</CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="moeda">Moeda</Label>
                  <Input
                    type="text"
                    name="moeda"
                    id="moeda"
                    placeholder="Digite a moeda"
                    value={signalForm.moeda}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <Row fluid="true">
                  <Col xs="6">
                    <FormGroup>
                      <Label for="precoEntrada">Preço de Entrada</Label>
                      <Input
                        type="text"
                        name="precoEntrada"
                        id="precoEntrada"
                        value={signalForm.precoEntrada}
                        placeholder="Digite o preço de entrada"
                        onChange={handleInputChange}
                      />
                      <Button color="secondary" onClick={addEntry} className="mt-2">
                        Adicionar Entrada
                      </Button>
                      <ListGroup className="mt-2" fluid="true">
                        {signalForm.entradas.map((entrada, index) => (
                          <ListGroupItem
                            key={index}
                            style={{ maxWidth: 250 }}
                            className="d-flex justify-content-between"
                          >
                            <span>
                              Entrada {index + 1} - ${entrada}
                            </span>
                            <Button
                              color="danger"
                              size="sm"
                              onClick={() => removeEntry(index)}
                              className="float-right"
                            >
                              X
                            </Button>
                          </ListGroupItem>
                        ))}
                      </ListGroup>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label for="alvos">Alvos</Label>
                      <Input
                        type="text"
                        name="alvos"
                        id="alvos"
                        placeholder="Digite os alvos"
                        value={signalForm.alvos}
                        onChange={handleInputChange}
                      />
                      <Button color="secondary" onClick={addAlvo} className="mt-2">
                        Adicionar Alvo
                      </Button>
                      <ListGroup className="mt-2" fluid="true">
                        {signalForm.palvos.map((alvo, index) => (
                          <ListGroupItem
                            key={index}
                            style={{ maxWidth: 250 }}
                            className="d-flex justify-content-between"
                          >
                            <span>
                              Alvo {index + 1} - ${alvo}
                            </span>
                            <Button
                              color="danger"
                              size="sm"
                              onClick={() => removeAlvo(index)}
                              className="float-right"
                            >
                              X
                            </Button>
                          </ListGroupItem>
                        ))}
                      </ListGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="stopLoss">Stop Loss</Label>
                  <Input
                    type="text"
                    name="stopLoss"
                    id="stopLoss"
                    placeholder="Digite o valor do Stop Loss"
                    value={signalForm.stopLoss}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <Button type="submit" color="primary" disabled={!isFormValid()}>
                  Enviar
                </Button>

              </Form>
            </CardBody>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default withAdminAuth(AddSignals); // Use o HOC
