import React from "react";
import Section from "./Section";
import Skill from "./Skill";

const Skills = () => {
  return (
    <Section sectionTitle="Skills">
      <h3 className="absolute top-32 uppercase tracking-[3px] text-gray-500 text-sm">
        Hover over a skill for current proficiency.
      </h3>

      <div className="grid grid-cols-4 gap-5">
        <Skill directionLeft />
        <Skill directionLeft />
        <Skill directionLeft />
        <Skill directionLeft />
        <Skill />
        <Skill />
        <Skill />
        <Skill />
      </div>
    </Section>
  );
};

export default Skills;
