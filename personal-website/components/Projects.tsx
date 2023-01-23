import React from "react";
import Section from "./Section";
import Carousel from "./Carousel";
import Project from "./Project";

const Projects = () => {
  const projects = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  return (
    <Section sectionTitle="Projects">
      <Carousel
        items={projects}
        ItemComponent={Project}
        id="ProjectsCarousel"
      />

      <div className="w-[100vw] absolute top-[30%] bg-[#FFFF]/10  h-[500px] -skew-y-12"></div>
    </Section>
  );
};

export default Projects;
