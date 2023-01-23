import { motion } from "framer-motion";
import React from "react";

const ExperienceCard = () => {
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[600px] snap-center bg-[#292929] p-10 cursor-pointer transition-opacity duration-200 overflow-hidden mt-12">
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1.2,
        }}
        viewport={{ once: true }}
        className="w-32 h-32 rounded-full md:rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center"
        src="https://avatars.githubusercontent.com/u/84754656?v=4"
        alt="company-logo"
      />
      <div className="px-0 md:px-10">
        <h4 className="text-4xl font-light">Job Title</h4>
        <p className="font-bold text-2xl mt-1">Company Name</p>
        <div className="flex space-x-2 my-2">
          <img
            className="h-10 w-10 rounded-full"
            alt="tech-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
          />
          <img
            className="h-10 w-10 rounded-full"
            alt="tech-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
          />
          <img
            className="h-10 w-10 rounded-full"
            alt="tech-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
          />
        </div>
        <p className="uppercase py-5 text-gray-300">
          Started work... -Ended...
        </p>

        <ul className="list-disc space-y-4 ml-5 text-lg">
          <li>Summary</li>
          <li>Summary</li>
          <li>Summary</li>
          <li>Summary</li>
          <li>Summary</li>
        </ul>
      </div>
    </article>
  );
};

export default ExperienceCard;
