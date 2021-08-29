export const Bar = ({data, xScale, yScale, xValue, yValue, tooltipFormat}) => data.map(d => 
    <rect 
        className='mark'
        key={xValue(d)}
        x={0}
        y={yScale(yValue(d))}
        width={xScale(xValue(d))}
        height={yScale.bandwidth()}
    >
        <title>{tooltipFormat(xValue(d))}</title>
    </rect>
  );