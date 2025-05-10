"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function EmojiFly({
  emoji,
  onDone,
  x,
  y,
}: {
  emoji: string;
  x: number;
  y: number;
  onDone: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onDone, 3000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      className="fixed text-3xl pointer-events-none select-none"
      style={{ left: x, top: y }}
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: -window.innerHeight * 0.6, opacity: 0 }} // 화면 60%까지 올라감
      transition={{ duration: 2, ease: "easeOut" }}
    >
      {emoji}
    </motion.div>
  );
}
