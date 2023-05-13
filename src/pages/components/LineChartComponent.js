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
        <YAxis domain={['dataMin', 'dataMax']} hide />
        <ReferenceLine y={entradas[0]} label="Entrada1" stroke="#d7f542" />
        <ReferenceLine y={entradas[1]} label="Entrada2" stroke="#d7f542" />
        {alvos.map((alvo, index) => (
            <ReferenceLine y={alvo} label={`Alvo ${index+1}`} stroke="#42f569" />
        ))}
        <ReferenceLine y={stop} label="Stop" stroke="#f54242" />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="price" stroke="#FFFFFF" strokeWidth={1} dot={false} />
      </LineChart>
    );
  }
}

export default LineChartComponent;
