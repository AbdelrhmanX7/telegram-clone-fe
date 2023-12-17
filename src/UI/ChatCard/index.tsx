import React from "react";
import Image from "../ImageWithFallback";
import { FaVolumeMute } from "react-icons/fa";
import { TiPin } from "react-icons/ti";
import { classNames, formatDate } from "../../utils";
import { motion } from "framer-motion";
import { ChatCardProps } from "./type";
import { AnimateNumbers } from "../Animations";
import MessageState from "./MessageState";
import ChatCardSkeletonLoader from "./ChatCardSkeletonLoader";

export const ChatCard = ({
  isPinned = false,
  isMuted = false,
  isActive = false,
  messageState = "empty",
  lastMessage,
  newMessagesCount = 0,
  username,
  profileImage = "",
  blurHashProfileImage = "",
  lastMessageDate = "Last seen recently",
  className,
  isLoading = false,
  onClick,
}: ChatCardProps) => {
  if (isLoading) return <ChatCardSkeletonLoader />;
  return (
    <div
      onClick={onClick}
      className={classNames(
        "flex justify-start items-center w-full min-h-[70px] hover:bg-[#f1f1f1] duration-300 cursor-pointer py-1.5 px-2",
        className
      )}
    >
      <div className="w-fit h-fit relative">
        <Image
          width={48}
          height={48}
          className="rounded-full"
          src={profileImage}
          blurHash={blurHashProfileImage}
        />
        <div
          className={classNames(
            "absolute border-2 border-white bottom-0 right-0 w-3 h-3 rounded-full bg-[#6CCB5F] duration-300",
            isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
          )}
        />
      </div>
      <div className="flex flex-col justify-center w-[calc(100%-58px)] ml-2">
        <div className="flex justify-between">
          <div className="flex gap-2 justify-start items-center flex-1">
            <p className="font-semibold text-[#222222] overflow-hidden text-ellipsis w-fit max-w-[100px]">
              {username}
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isMuted ? 1 : 0 }}
            >
              <FaVolumeMute color="838383" />
            </motion.div>
          </div>
          <div className="flex justify-center items-center gap-2 w-fit">
            <div className="overflow-hidden max-h-[16px]">
              <MessageState messageState={messageState} />
            </div>
            <p className="text-sm text-[#95999A]">
              {formatDate(lastMessageDate)}
            </p>
          </div>
        </div>
        <div className="flex justify-between gap-1">
          <div className="text-[#8D8E90] whitespace-nowrap gap-1.5 overflow-hidden text-ellipsis text-sm flex-1">
            {lastMessage?.length ? lastMessage : `${username} joined Telegram`}
          </div>
          <motion.div
            initial={{ x: 20 }}
            animate={{ x: isPinned ? 0 : 20 }}
            className="w-fit flex justify-end items-center"
          >
            <div className="flex items-center gap-1">
              <div
                className={classNames(
                  "w-fit px-2 min-w-[24px] h-6 rounded-full text-center flex justify-center items-center text-white font-medium text-sm duration-300",
                  isMuted ? "bg-[#8A8A8A]" : "bg-[#3290ec]",
                  newMessagesCount ? "opacity-100" : "opacity-0"
                )}
              >
                <AnimateNumbers number={newMessagesCount} />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isPinned ? 1 : 0 }}
              >
                <TiPin color="838383" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
