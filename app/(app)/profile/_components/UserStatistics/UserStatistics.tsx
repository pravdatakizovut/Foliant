"use client";
import React from "react";
import {
  BookOpenCheck,
  MessageSquare,
  UserRoundPlus,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

function UserStatistics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 400, // жёсткость пружины
        damping: 20, // затухание: чем меньше — тем больше раскачка
        mass: 1, // масса: чем больше — тем инертнее
        delay: 0.1,
      }}
      className="flex gap-3  h-fit"
    >
      {/* Подписчиков */}
      <div className="flex flex-col background-block flex-1 rounded-xl p-4 ">
        <div className="flex justify-between">
          <p className="text-text-secondary font-bold text-[28px]">0</p>
          <Users color="#8A8A8F" />
        </div>
        <p className="text-text-secondary font-light">подписчиков</p>
      </div>
      {/* Подписок */}
      <div className="flex flex-col background-block flex-1 rounded-xl p-4">
        <div className="flex justify-between">
          <p className="text-text-secondary font-bold text-[28px]">0</p>
          <UserRoundPlus color="#8A8A8F" />
        </div>
        <p className="text-text-secondary font-light">подписок</p>
      </div>
      {/* Книг прочитано */}
      <div className="flex flex-col background-block flex-1 rounded-xl p-4">
        <div className="flex justify-between">
          <p className="text-text-secondary font-bold text-[28px]">0</p>
          <BookOpenCheck color="#8A8A8F" />
        </div>
        <p className="text-text-secondary font-light">книг прочитано</p>
      </div>
      {/* рецензий написано */}
      <div className="flex flex-col background-block flex-1 rounded-xl p-4">
        <div className="flex justify-between">
          <p className="text-text-secondary font-bold text-[28px]">0</p>
          <MessageSquare color="#8A8A8F" />
        </div>
        <p className="text-text-secondary font-light">рецензий написано</p>
      </div>
    </motion.div>
  );
}

export default UserStatistics;
