import React from 'react';
import { ListGroupItem } from 'reactstrap';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";


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
      <ReactTooltip id={`tooltip${index}`} place="top" effect="solid">
        {entrada_at}
      </ReactTooltip>
    </React.Fragment>
  );
};

export default EntradaTooltip;
