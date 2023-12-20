import { classNames } from '../../../utils';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { AnimateChangeInSizeProps } from './type';

export const AnimateChangeInSize = ({ children, className, containerClassName }: AnimateChangeInSizeProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number | 'auto'>('auto');
  const [width, setWidth] = useState<number | 'auto'>('auto');

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        // We only have one entry, so we can use entries[0].
        const observedHeight = entries[0].contentRect.height;
        const observedWidth = entries[0].contentRect.width;
        setHeight(observedHeight);
        setWidth(observedWidth);
      });

      resizeObserver.observe(containerRef.current);

      return () => {
        // Cleanup the observer when the component is unmounted
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <motion.div
      className={classNames(containerClassName, 'overflow-hidden w-full')}
      style={{ height, width }}
      animate={{ height, width }}
      transition={{ duration: 0.1 }}
    >
      <div className={classNames('w-fit', className)} ref={containerRef}>
        {children}
      </div>
    </motion.div>
  );
};
