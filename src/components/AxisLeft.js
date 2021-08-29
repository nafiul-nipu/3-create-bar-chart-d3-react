export const AxisLeft = ({yScale}) => yScale.domain().map(tickeValue => (       
    <g className='tick'>
      <text 
      key={tickeValue}
      y={yScale(tickeValue) + yScale.bandwidth() / 2}
      style={{textAnchor:'end'}}
      x={-3}
      dy={'0.32em'}
      >{tickeValue}</text>
    </g>
  ));