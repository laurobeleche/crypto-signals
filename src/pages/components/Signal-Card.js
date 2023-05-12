//./components/Signal-Card.js
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  CardFooter,
} from "reactstrap";
import { format } from "date-fns";
import EntradaTooltip from "./EntradaToolTip";

const SignalCard = ({ signal }) => {
  const entradas = signal.entradas ? signal.entradas.split(",") : [];
  const entradas_at = signal.entrada_at ? signal.entrada_at.split(",") : [];
  const alvos = signal.alvos ? signal.alvos.split(",") : [];
  const alvos_at = signal.alvos_at ? signal.alvos_at.split(",") : [];
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
    return ('😡 $' + entradas[0] + '( -' +
    (((entradas[0] - signal.stoploss) / entradas[0]) * 100).toFixed(2) + '% )');
  }
  console.log(stopLoss);

  return (
    <Card
      className="my-2 p-0 text-center"
      color={colorCard}
      inverse
      style={{ width: "18rem", margin: 10, maxWidth: 220 }}
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
              {simbolAlvos[index]} ${alvo}
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
      <CardFooter color={colorCard}>
        <CardText className="p-0">STOP LOSS</CardText>
        <CardText className="p-0">
          {stopLoss()}
        </CardText>
      </CardFooter>
    </Card>
  );
};

export default SignalCard;
