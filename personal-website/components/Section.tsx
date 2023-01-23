import { motion } from "framer-motion";
import React from "react";

interface SectionHeaderProps {
  children: React.ReactNode;
  sectionTitle: string;
}

const Section = ({ sectionTitle, children }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col relative h-screen text-center md:flex-row md:text-left max-w-7xl px-10 justify-evenly mx-auto items-center"
    >
      <h3 className=" absolute top-12 uppercase tracking-[20px] text-gray-500 text-2xl">
        {sectionTitle}
      </h3>
      {children}
    </motion.div>
  );
};

export default Section;
