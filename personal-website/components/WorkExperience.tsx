import React from "react";
import Section from "./Section";
import ExperienceCard from "./ExperienceCard";
import Carousel from "./Carousel";

const WorkExperience = () => {
  const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  return (
    <Section sectionTitle="Experience">
      <Carousel
        items={items}
        ItemComponent={ExperienceCard}
        id="ExperienceCarousel"
      />
    </Section>
  );
};

export default WorkExperience;
