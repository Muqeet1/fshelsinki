import React from "react";

const Course = ({ allcourses }) => {
  
  const Content = ({ parts }) => {
    const ContentHeading = () => <h2>{allcourses.name}</h2>;
    const contentParts = parts.map((part) => (
      <p key={part.id}>
        {part.name} {part.exercises}
      </p>
    ));
    return (
      <>
        <ContentHeading />
        {contentParts}
      </>
    );
  };

  const Total = ({ totalexe }) => {
    const sum = totalexe
      .map((param) => param.exercises)
      .reduce((a, b) => a + b, 0);
    return <h3>Total of {sum} exercises</h3>;
  };

  return (
    <div>
      <Content parts={allcourses.parts} />
      <Total totalexe={allcourses.parts} />
    </div>
  );
};
export default Course;
