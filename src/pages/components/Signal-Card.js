//./components/Signal-Card.js
import React, {useState, useEffect, useRef }from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  CardFooter,
  Button,
} from "reactstrap";
import { format } from "date-fns";
import EntradaTooltip from "./EntradaToolTip";
import LineChartComponent from "./LineChartComponent";
import axios from "axios";
import html2canvas from 'html2canvas';


const SignalCard = ({ signal }) => {
  const entradas = signal.entradas ? signal.entradas.split(",") : [];
  const entradas_at = signal.entrada_at ? signal.entrada_at.split(",") : [];
  const alvos = signal.alvos ? signal.alvos.split(",") : [];
  const alvos_at = signal.alvos_at ? signal.alvos_at.split(",") : [];
  const [chartData, setChartData] = useState([]);
  const cardRef = useRef();

  const saveAsPNG = async () => {
    const canvas = await html2canvas(cardRef.current);
    const imgData = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'card.png';
    link.click();
  };

  entradas.sort((a, b) => {
    return b - a;
  });
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "yyyy-MM-dd HH:mm");
  };
  const colorsCard = ["warning", "primary", "primary", "success", "danger"];
  const colorCard = colorsCard[signal.status];
  const colorAlvos = alvos.map((alvo, index) => {
    return alvos_at.length >= index + 1 ? "success" : colorCard;
  });
  const colorEntradas = entradas.map((entrada, index) => {
    return entradas_at.length >= index + 1 ? "success" : colorCard;
  });
  const simbolAlvos = alvos.map((alvo, index) => {
    return alvos_at.length >= index + 1 ? "✅" : "";
  });
  const simbolEntradas = entradas.map((entrada, index) => {
    
    return entradas_at.length >= index + 1 ? "✅" : "";
  });

  const stopLoss = () => {
    if(alvos_at.length > 0){
      return ('😐 $' + entradas[0] + '( 0% )');
    }
    return ('😡 $' + signal.stoploss + '( -' +
    (((entradas[0] - signal.stoploss) / entradas[0]) * 100).toFixed(2) + '% )');
  }
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        
        const dateString = signal.created_at;
        const dateObject = new Date(dateString);
        const start = dateObject.getTime();
        let endTime = Date.now();
        if(signal.stop_at !== null){
          const stopdateString = signal.stop_at;
          const stopdateObject = new Date(stopdateString);
          endTime = stopdateObject.getTime();
        }
        if(alvos_at.length === alvos.length){
          const dateString = alvos_at[alvos_at.length - 1];
          const dateObject = new Date(dateString);
          endTime = dateObject.getTime();
        }
        const response = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${signal.crypto}USDT&interval=15m&limit=1000&startTime=${start}&endTime=${endTime}`);
        const rawData = response.data;
        const data = rawData.map((entry, index) => {
          return {
            price: parseFloat(entry[4]) // Close price
          };
        });
        setChartData(data);
      } catch (error) {
        console.error('Erro ao buscar dados da Binance:', error);
      }
    };
    fetchChartData();
  });

  return (

    <Card
      className="my-2 p-0 text-center"
      color={colorCard}
      inverse
      style={{ width: "18rem", margin: 10, maxWidth: 220 }}
      innerRef={cardRef}
    >
      <CardHeader className="p-0">📌{signal.crypto} / USDT (SPOT)📌</CardHeader>
      <CardBody className="p-0">
        <ListGroup flush>
          <ListGroupItem color={colorCard} className="p-0">
            {formatDate(signal.created_at)}
          </ListGroupItem>
        </ListGroup>
        <CardText></CardText>
        <ListGroup flush>
          <ListGroupItemHeading>
            <ListGroupItem color={colorCard} className="p-0">
              ENTRADAS
            </ListGroupItem>
          </ListGroupItemHeading>
          {entradas.map((entrada, index) => (
            <EntradaTooltip
              key={entrada}
              color={colorEntradas[index]}
              entrada={entrada}
              index={index}
              simbol={simbolEntradas[index]}
              entrada_at={entradas_at[index]}
            />
          ))}
        </ListGroup>
        <CardText></CardText>
        <ListGroup flush>
          <ListGroupItemHeading>
            <ListGroupItem color={colorCard} className="p-0">
              ALVOS
            </ListGroupItem>
          </ListGroupItemHeading>
          {alvos.map((alvo, index) => (
            <ListGroupItem color={colorAlvos[index]} key={alvo} className="p-0">
              {simbolAlvos[index]} ${alvo} ( {((alvo - entradas[0])/entradas[0]*100).toFixed(2)}% )
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
      <CardFooter color={colorCard}>
        <CardText className="p-0">STOP LOSS</CardText>
        <CardText className="p-0">
          {stopLoss()}
        </CardText>
        <div>
          <LineChartComponent data={chartData} entradas={entradas} alvos={alvos} stop={signal.stoploss} width={180} height={75} />
        </div>
      </CardFooter>
    </Card>

  );
};

export default SignalCard;