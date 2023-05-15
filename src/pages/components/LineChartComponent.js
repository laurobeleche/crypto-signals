import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';

class LineChartComponent extends Component {
  render() {
    const { data, entradas, alvos, stop, width, height } = this.props;
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip">
              <p className="label">{`$ ${payload[0].value}`}</p>
            </div>
          );
        }
      
        return null;
      };
    
    return (
      <LineChart width={width} height={height} data={data} style={{ backgroundColor: 'rgba(100, 100, 100, 0.5)' }}>
        <XAxis dataKey="name" hide />
        <YAxis domain={[(stop - (stop * 0.01)), (parseFloat((alvos[alvos.length - 1]))+parseFloat(((alvos[alvos.length - 1])*0.01)))]} stroke="ffffff" hide/>
        <ReferenceLine y={entradas[0]} label={{value: `Entrada1 $${entradas[0]}`, fill: '#292701', fontSize: '10px'}} stroke="#d7f542" />
        <ReferenceLine y={entradas[1]} label={{value: `Entrada2 $${entradas[1]}`, fill: '#292701', fontSize: '10px'}} stroke="#d7f542" />
        {alvos.map((alvo, index) => (
            <ReferenceLine key={index} y={alvo} label={{value: `Alvo ${index+1} $${alvo}`, fill: '#012901', fontSize: '10px'}} stroke="#42f569" />
        ))}
        <ReferenceLine y={stop} label={{ value: 'Stop $'+stop, fill: '#290301', fontSize: '10px' }} stroke="#f54242" />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="price" stroke="#FFFFFF" strokeWidth={1} dot={false} />
      </LineChart>
    );
  }
}

export default LineChartComponent;
