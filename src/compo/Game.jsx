import { useState, useEffect } from "react";
import one from "../assets/one.jpg";
import two from "../assets/two.jpg";
import three from "../assets/three.jpg";
import four from "../assets/four.jpg";
import five from "../assets/five.jpg";
import six from "../assets/six.jpg";
import React from "react";
import { useNavigate } from "react-router";
import { IoArrowBack } from "react-icons/io5";
import { TextGenerateEffect } from "../acer-ui/generate-effect";


function Game() {
  const [color, setcolor] = useState("text-black");
  const [totalscore, settotalscore] = useState(0);
  const [options, setoptions] = useState([1, 2, 3, 4, 5, 6]);
  const [userinput, setuserinput] = useState(0);
  const [dice, setdice] = useState(one);
  const [randomno, setrandomno] = useState(0);
  const [warn, setwarn] = useState("");
  const [showrules, setshowrules] = useState(false);
  const [state, setstate] = useState("Show");
  const [key, setKey] = useState(0);

  const navigate = useNavigate();

  const reset = () => {
    settotalscore(0);
  };

  const back = () => {
    navigate("/");
  };

  const rules = () => {
    setshowrules(!showrules);
    setstate(showrules ? "Show" : "Hide");
  };

  const input = (val) => {
    setuserinput(val);
    setwarn("");
  };

  const isvalid = () => {
    if (userinput === 0) {
      setwarn("You have not selected any number");
    } else randomdice();
  };

  const generate = () => {
    setrandomno(Math.floor(Math.random() * 6) + 1);
  };

  const randomdice = () => {
    generate();
    if (randomno === 1) setdice(one);
    else if (randomno === 2) setdice(two);
    else if (randomno === 3) setdice(three);
    else if (randomno === 4) setdice(four);
    else if (randomno === 5) setdice(five);
    else setdice(six);
    check();
    setuserinput(0);
  };

  const check = () => {
    if (randomno === userinput){
       settotalscore((prev) => prev + userinput);
       setcolor("text-green-500")
    }
    else {
      settotalscore((prev) => prev - 2);
      setcolor("text-red-500")
    }
  };

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [totalscore]);

  return (
    <div className="p-3">
      <IoArrowBack className="text-xl hover:cursor-pointer" onClick={() => back()} />
      <div className="flex flex-col items-center justify-center m-10 space-y-6">
        {/* Top Section: Total Score on Left, Options on Right */}
        <div className="flex justify-between w-full ">
          <div className="text-lg font-bold">Total Score: <TextGenerateEffect key={key} words={`${totalscore}`} className={color}  /></div>
          <div className="flex space-x-4">
            {options.map((i, id) => (
              <div
                key={id}
                className={`border-1 rounded-2xl px-4 py-2 cursor-pointer flex justify-center items-center ${
                  userinput === i ? "bg-blue-400 text-white" : "hover:bg-blue-100"
                }`}
                onClick={() => input(i)}
              >
                {i}
              </div>
            ))}
          </div>
        </div>

        {/* Dice in Center */}
        <div>
          <img
            src={dice}
            alt="Dice"
            className=" cursor-pointer"
            onClick={() => isvalid()}
          />
        </div>

        {/* Buttons in Vertical Stack */}
        <div className="flex flex-col space-y-4">
          <button
            className="border-1 p-3 rounded-2xl shadow hover:cursor-pointer hover:bg-gray-200"
            onClick={() => reset()}
          >
            Reset Score
          </button>
          <button
            className="border-1 p-3 rounded-2xl shadow hover:cursor-pointer bg-blue-300 hover:bg-white"
            onClick={() => rules()}
          >
            {state} Rules
          </button>
        </div>

        {/* Rules Section */}
        {showrules && (
          <div className="bg-blue-100 p-4 rounded-lg w-3/4 text-left">
            <strong>How to play the Dice Game:</strong>
            <ul className="list-disc ml-6">
              <li>Select any number</li>
              <li>Click on the dice image</li>
              <li>
                If the selected number matches the dice number, you earn that
                number of points.
              </li>
              <li>
                If the guess is incorrect, 2 points will be deducted from your
                total score.
              </li>
            </ul>
          </div>
        )}

        {/* Warning Section */}
        {warn && <p className="text-red-600 mt-4">{warn}</p>}
      </div>
    </div>
  );
}

export default Game;
