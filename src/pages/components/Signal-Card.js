import React from 'react';
import { Card, CardHeader, ListGroup, ListGroupItem, ListGroupItemHeading, CardFooter } from 'reactstrap';
import { format } from 'date-fns';

const SignalCard = ({ signal }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'yyyy-MM-dd');
      };
      console.log(signal);
  return (
    <Card className="my-2 p-0 text-center" color="warning" inverse style={{ width: '18rem', margin: 10 }} key={signal.id}>
        <CardHeader>BLZ / USDT (SPOT)</CardHeader>
        <ListGroup flush>
        <ListGroupItem color="warning" >
        Data: 03/05/2023
        </ListGroupItem>
        </ListGroup>
        <ListGroup flush>
        <ListGroupItemHeading>
            <ListGroupItem color="warning" >
            ENTRADAS
            </ListGroupItem>
        </ListGroupItemHeading>
        <ListGroupItem color="warning" >
        $0,07155
        </ListGroupItem>
        <ListGroupItem color="warning" >
        $0,07273
        </ListGroupItem>
        </ListGroup>
        <ListGroup flush>
        <ListGroupItemHeading>
            <ListGroupItem color="warning" >
            ALVOS
            </ListGroupItem>
        </ListGroupItemHeading>
        <ListGroupItem color="warning" >
        $0,07545 + 3,75%
        </ListGroupItem>
        <ListGroupItem color="warning" >
        $0,07750+ 6,56%
        </ListGroupItem>
        <ListGroupItem color="warning" >
        $0,08049 + 10,67%
        </ListGroupItem>
        </ListGroup>
        <CardFooter>
        STOP LOSS: $0,06981 (4,00%)
        </CardFooter>
    </Card>
  );
};

export default SignalCard;
