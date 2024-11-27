import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const AnimatedNumber = ({ value, duration = 2000 }) => {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: value },
    config: { duration },
  });

  return (
    <h2 className="bold">
      <animated.span>
        {number.to((n) => Math.round(n).toLocaleString())}
      </animated.span>
    </h2>
  );
};

export default AnimatedNumber;
