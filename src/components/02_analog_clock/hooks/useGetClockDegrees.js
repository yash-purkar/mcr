import { useEffect, useState } from "react";

export const useGetClockDegrees = () => {
  // Setting current time
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    // Bcz Time will change after each second
    const currenTimeInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(currenTimeInterval);
  }, []);

  //   This fn returns the degree based on the unit and max unit
  const getDegrees = (unit, maxUnits) => {
    // degrees for rotation in a circular (360-degree) clock face.
    return (unit / maxUnits) * 360 + 90;
  };

  const secondsDegree = getDegrees(time?.getSeconds(), 60);
  const minuteDegree = getDegrees(59, 60);
  const hoursDegree = getDegrees(time?.getHours(), 12);

  return { secondsDegree, minuteDegree, hoursDegree };
};

const arr = [
    {
      name: "xyz",
      licId: {
        name: "LIC1",
        id: 1,
      },
    },
    {
      name: "xyz",
      licId: {
        name: "LIC2",
        id: 2,
      },
    },
    {
      name: "xyz",
      licId: {
        name: "LIC3",
        id: 3,
      },
    },
  ];
  