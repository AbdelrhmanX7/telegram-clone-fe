import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Lottie from "lottie-react";
import { classNames } from "../../utils";
import { IoCheckmark, IoCheckmarkDone } from "react-icons/io5";
import clockAnimationData from "../../../public/lottie/clock.json";
import { MessageStateProps } from "./type";

export const MessageState = ({ messageState }: MessageStateProps) => {
  const [animationState, setAnimationState] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    let yValue = 0;
    switch (messageState) {
      case "empty":
        yValue = 0;
        setAnimationState(0);
        break;
      case "sending":
        yValue = 0;
        setAnimationState(1);
        break;
      case "sent":
        yValue = -16;
        setAnimationState(2);
        break;
      case "arrived":
      case "seen":
        yValue = -32;
        setAnimationState(3);
        break;
      default:
        break;
    }

    controls.start({ y: yValue });
  }, [messageState, controls]);

  return (
    <motion.div animate={controls} className="flex flex-col">
      <Lottie
        className={classNames(
          "w-4 h-4 duration-300",
          animationState === 1 ? "opacity-100" : "opacity-0"
        )}
        animationData={clockAnimationData}
        loop
      />
      <IoCheckmark
        className={classNames(
          "w-4 h-4 duration-300",
          animationState === 2 ? "opacity-100" : "opacity-0"
        )}
        color="8A8A8A"
      />
      <IoCheckmarkDone
        className={classNames(
          "w-4 h-4 duration-300",
          animationState === 3 ? "opacity-100" : "opacity-0"
        )}
        color={messageState === "seen" ? "3290ec" : "8A8A8A"}
      />
    </motion.div>
  );
};

export default MessageState;
