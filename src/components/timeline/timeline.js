import React from 'react';
import { dateDisplay } from '../../utilities/formatting';
import DiscreteSlider from '../discrete-slider/discrete-slider';
import './timeline.css';

//Define a custom non-enumerable `sortBy` function using a Schwartzian transform:
(function(){
  if (typeof Object.defineProperty === 'function'){
    try{Object.defineProperty(Array.prototype,'sortBy',{value:sb}); }catch(e){}
  }
  if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;

  function sb(f){
    for (var i=this.length;i;){
      var o = this[--i];
      this[i] = [].concat(f.call(o,o,i),o);
    }
    this.sort(function(a,b){
      for (var i=0,len=a.length;i<len;++i){
        if (a[i]!=b[i]) return a[i]<b[i]?-1:1;
      }
      return 0;
    });
    for (var i=this.length;i;){
      this[--i]=this[i][this[i].length-1];
    }
    return this;
  }
})();

const Timeline = ({
  timestamps,
  expanded,
  selectedDate,
  handleCollapseTimeline,
  handleTimeSelect,
}) => {
  const cls = `timeline ${expanded ? 'expanded' : ''}`;
  return(
    <TimelineWrapper cls={cls}>
      <DiscreteSlider
        min={timestamps[0]}
        max={timestamps[timestamps.length - 1]}
        availableValues={timestamps}
        onChange={handleTimeSelect}
        formatValue={(v) => `${v}px`}
      />
      {/*
      <TimelineWrapper cls={cls}>
        <CloseButton onClick={handleCollapseTimeline} />
        {timestamps.sortBy((d) => (new Date(d))).map((t) => (
          <TimelineNode
            key={t}
            timestamp={t}
            currentTimestamp={selectedDate}
            onClick={handleTimeSelect}
          />
        ))}
      </TimelineWrapper>
      */}
    </TimelineWrapper>
  );
}

const TimelineWrapper = ({ cls, children }) => {
  return(
    <div className={cls}>{children}</div>
  );
}

const TimelineNode = ({
  timestamp, currentTimestamp, onClick
}) => {
  const sty = {
    pointerEvents: 'none',
    opacity: '.5',
  }
  const clickParams = {
    onClick,
    'data-timestamp': timestamp,
    style: timestamp === currentTimestamp ? sty : {},
  }
  const date = new Date(timestamp);
  return(
    <div className="timeline__node" {...clickParams}>
      <div className="timeline__node__circle" {...clickParams}></div>
      <div className="timeline__node__timestamp" {...clickParams}>
        {dateDisplay(date)}
      </div>
    </div>
  );
}

const CloseButton = ({ onClick }) => {
  const params = {
    className: 'close-button',
    onClick,
  }
  return(
    <div {...params}>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
      </svg>
    </div>
  );
}

export default Timeline;
