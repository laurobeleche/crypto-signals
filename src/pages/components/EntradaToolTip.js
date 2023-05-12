import React from 'react';
import { ListGroupItem } from 'reactstrap';


const EntradaTooltip = ({ color, entrada, index, simbol, entrada_at }) => {
  return (
    <React.Fragment>
      <ListGroupItem
        color={color}
        className='p-0'
        id={`tooltip${index}`}
        data-tip
        data-for={`tooltip${index}`}
      >
        {simbol} ${entrada}
      </ListGroupItem>
    </React.Fragment>
  );
};

export default EntradaTooltip;
