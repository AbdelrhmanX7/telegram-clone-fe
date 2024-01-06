import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const AnimateNumbers = ({ number = 1234 }) => {
  const [arrNumber, setArrNumber] = useState<string[]>(['0']);
  useEffect(() => setArrNumber(number.toString().split('')), [number]);
  return (
    <div className='flex max-h-[24px] overflow-y-hidden'>
      {arrNumber?.map((item: any, index) => (
        <motion.div animate={{ y: item * -20 }} key={item + index}>
          <div className='flex flex-col justify-center items-center mt-0.5'>
            <p>0</p>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AnimateNumbers;
