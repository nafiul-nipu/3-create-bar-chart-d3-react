export const Bar = ({data, xScale, yScale, xValue, yValue}) => data.map(d => <rect 
    key={xValue(d)}
    x={0}
    y={yScale(yValue(d))}
    width={xScale(xValue(d))}
    height={yScale.bandwidth()}
  />);