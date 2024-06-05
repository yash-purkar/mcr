import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Accordion from "./components/01_accordion/Accordion";
import Clock from "./components/02_analog_clock/Clock";
import Carousel from "./components/03_carousel/Carousel";
import Navbar from "./components/navbar";
import { useLocation, useParams } from "react-router";
import CountDown from "./components/04_countdown_timer/CountDown";
import Counter from "./components/05_counter/Counter";
import DragAndDrop from "./components/06_drag_and_drop/DragAndDrop";

export const questions = {
  accordion: "ACCORDION",
  clock: "CLOCK",
  carousel: "CAROUSEL",
  countdown: "COUNTDOWN_TIMER",
  counter: "COUNTER",
  dragAndDrop: "DRAG_AND_DROP",
};

function App() {
  const [currentQuestion, setCurrentQuestion] = useState();

  const handleQuestionClick = useCallback((question) => {
    const url = new URL(window.location.href);
    setCurrentQuestion(question);
    url.searchParams.set("current_q", question);
    window.history.pushState(null, "", url.toString());
  }, []);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("current_q");

  useEffect(() => {
    setCurrentQuestion(query);
  }, [query]);

  const getCurrentComponent = () => {
    switch (currentQuestion) {
      case "ACCORDION":
        return <Accordion />;

      case "CLOCK":
        return <Clock />;

      case "CAROUSEL":
        return <Carousel />;

      case "COUNTDOWN_TIMER":
        return <CountDown />;

      case "COUNTER":
        return <Counter />;

      case "DRAG_AND_DROP":
        return <DragAndDrop />;

      default:
        return <Accordion />;
    }
  };

  return (
    <div className="App">
      <Navbar
        questions={questions}
        currentQuestion={currentQuestion}
        handleQuestionClick={handleQuestionClick}
      />
      {getCurrentComponent()}
    </div>
  );
}

export default App;
