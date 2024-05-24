import { useCallback, useState } from "react";
import { accordionData } from "../accordionData";
import "./Accordion.css";

const Accordion = () => {
  const [openAccordions, setOpenAccordions] = useState([]);
  const [openMultiple, setOpenMultiple] = useState(false);

  const handleAccordionOpenClose = useCallback(
    (index) => {
      if (openMultiple) {
        if (openAccordions?.includes(index)) {
          setOpenAccordions((prev) => prev?.filter((item) => item !== index));
          return;
        }
        setOpenAccordions((prev) => [...prev, index]);
      } else {
        if (openAccordions?.includes(index)) {
          setOpenAccordions([]);
          return;
        }
        setOpenAccordions([index]);
      }
    },
    [openAccordions, openMultiple]
  );

  const checkIsAccordionOpen = (index) => openAccordions?.includes(index);

  return (
    <div className="accordion_container">
      <div className="accordion_inner_container">
        <div className="multiple_checkbox_container">
          <small>Allow Multiple Accordions Open</small>
          <input
            value={openMultiple}
            onChange={(e) => {
              e.target.checked === false &&
                setOpenAccordions((prev) => [prev[0]]);
              setOpenMultiple(e.target.checked);
            }}
            type={"checkbox"}
          />
        </div>
        <div className="accordions">
          {accordionData?.map((data, i) => {
            return (
              <div className="single_accordion">
                <div className="accordion_header">
                  <p style={{ textAlign: "center" }}>{data?.title}</p>
                  <button
                    onClick={() => handleAccordionOpenClose(i)}
                    className="open_close_button"
                  >
                    {checkIsAccordionOpen(i) ? "-" : "+"}
                  </button>
                </div>
                <div
                  className={`accordion_content ${
                    checkIsAccordionOpen(i) && "show_accordion"
                  }`}
                >
                  Unicorn vinyl poutine brooklyn, next level direct trade
                  iceland. Shaman copper mug church-key coloring book, whatever
                  poutine normcore fixie cred kickstarter post-ironic street
                  art.
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
