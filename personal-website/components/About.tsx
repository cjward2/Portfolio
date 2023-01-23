import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";

const About = () => {
  return (
    <Section sectionTitle="About">
      <motion.img
        initial={{ x: -200, opacity: 0 }}
        whileInView={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1.2,
        }}
        viewport={{ once: true }}
        src="https://avatars.githubusercontent.com/u/84754656?v=4"
        className="-mb-20 md:mb-0 flex-shrink-0 w-56 h-56 rounded-full object-cover md:rounded-lg md:w-64 md:h-95 xl:w-[400px] xl:h-[500px]"
      />

      <div className="space-y-10 px-0 md:px-10">
        <h4 className="text-4xl font-semibold">
          Here is a{" "}
          <span className="underline decoration-[#EEE]/50">little</span>{" "}
          background
        </h4>
        <p className="text-base">
          I am a developer, specializing in JavaScript, HTML and CSS. I love
          working with React and I'm using it for some interesting projects.
          Between an immersive bootcamp and intense self-study, I have become
          highly skilled with many technologies and have developed a true
          passion for coding. I code every single day. When I'm not coding at
          work or spending time with my wife and newborn daughter, I am
          learning. My favorite part of being a developer is the unlimited
          potential for learning and personal growth. I love utilizing online
          courses in order to push myself to grow as a developer and to become
          someone my teammates can rely on.
        </p>
      </div>
    </Section>
  );
};

export default About;
