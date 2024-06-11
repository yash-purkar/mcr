import React, { useEffect, useState } from "react";

const InfiniteScrolling = () => {
  const [allImagesData, setAllImagesData] = useState(
    [...Array(5)].map(
      (_, i) => `https://picsum.photos/seed/img${i + 1}/600/400`
    )
  );
  const [count, setCount] = useState(6);
  const [loading, setLoading] = useState(false);

  const nextImg = () => {
    return [...Array(5)].map(
      (_, i) => `https://picsum.photos/seed/img${i + count}/600/400`
    );
  };

  console.log({ allImagesData });
  const handleScroll = (e) => {
    // It gives the all height from top to bottom including all scroll.
    const allScrollHeight = document.documentElement.scrollHeight;

    // Current viewport height
    const viewportHeight = window.innerHeight;

    // It is the number of pexels of height has been scrolled
    const scrolledHeight = document.documentElement.scrollTop;

    // If current scrolled bar pexels and viewPortHeight is equal greater than equal to all scroll height we need to make an api call for more data
    if (scrolledHeight + viewportHeight + 1 >= allScrollHeight) {
      setLoading(true);

      // Assuming the api might take 1second to give response
      setCount((prev) => prev + 1);
      const data = nextImg();
      setTimeout(() => {
        setAllImagesData((prev) => [...prev, ...data]);
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    // Getting initial images
    // const initialImages = nextImg();
    // setAllImagesData(initialImages);

    window.addEventListener("scroll", handleScroll);

    // It will remove the event listener before unmounting the component
    return () => window.removeEventListener("scroll", handleScroll);
  }, [count]);

  return (
    <div>
      {allImagesData?.map((item, i) => (
        <div key={i}>
          <img src={item} alt="img" />
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default InfiniteScrolling;

// Arjun's code
/**
 * 
 * 
 useState(
  Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    url: `https://picsum.photos/seed/img${1 + i}/600/400`,
  }))
);

1.  It will create array [undefined, undefined, undefined, undefined, undefined]

and in second parameter it will map on that array
And it will replace the undefined with the return value of function.

And Array.from() will return the new array.
*/
