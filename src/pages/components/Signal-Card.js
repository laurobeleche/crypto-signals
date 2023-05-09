//./components/Signal-Card.js
import React from 'react';
import { Card, CardHeader, CardBody, CardText, ListGroup, ListGroupItem, ListGroupItemHeading, CardFooter } from 'reactstrap';
import { format } from 'date-fns';

const SignalCard = ({ signal }) => {
    const entradas = signal.entradas.split(',');
    const alvos = signal.alvos.split(',');
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'yyyy-MM-dd HH:mm');
      };
  return (
    <Card className="my-2 p-0 text-center" color="warning" inverse style={{ width: '18rem', margin: 10, maxWidth: 220 }}>
        <CardHeader className='p-0'>📌{signal.crypto} / USDT (SPOT)📌</CardHeader>
        <CardBody className='p-0'>
        <ListGroup flush>
        <ListGroupItem color="warning" className='p-0' >
        {formatDate(signal.created_at)}
        </ListGroupItem>
        </ListGroup>
        <CardText></CardText>
        <ListGroup flush>
        <ListGroupItemHeading>
            <ListGroupItem color="warning" className='p-0' >
            ENTRADAS
            </ListGroupItem>
        </ListGroupItemHeading>
        {entradas.map(entrada => (
            <ListGroupItem color="warning" key={entrada} className='p-0'>
            ${entrada}
            </ListGroupItem>
            ))}
        </ListGroup>
        <CardText></CardText>
        <ListGroup flush>
        <ListGroupItemHeading>
            <ListGroupItem color="warning" className='p-0'>
            ALVOS
            </ListGroupItem>
        </ListGroupItemHeading>
        {alvos.map(alvo => (
            <ListGroupItem color="warning" key={alvo} className='p-0'>
            ${alvo}
            </ListGroupItem>
            ))}
        </ListGroup>
        </CardBody>
        <CardFooter>
        <CardText  className='p-0'>STOP LOSS</CardText>
        <CardText  className='p-0'>😡${signal.stoploss} (-{(((entradas[0] - signal.stoploss)/entradas[0])*100).toFixed(2)}%)</CardText>        
        </CardFooter>
    </Card>
  );
};

export default SignalCard;
