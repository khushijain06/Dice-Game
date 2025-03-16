import React, { use } from "react";
import dice from "../assets/dice.avif";
import { useNavigate } from "react-router";
import {
  TextRevealCard,
} from "../acer-ui/text-reveal-card";
import { HoverBorderGradient } from "../acer-ui/hover-border";
function Home() {
  const navigate = useNavigate();
  const handlePlayNow = () => {
    navigate("/game");  // Navigate to Game component
  };
  return (
    <div>
      <div className="flex-col inline-block">
        <TextRevealCard
          text="Dice Game"
          revealText="Magical Game"
          className="bg-white  font-medium font-serif"
        ></TextRevealCard>{" "}
        <div className="ml-14">
          <HoverBorderGradient className="cursor-pointer" onClick={()=>handlePlayNow()}>
            Play Now
          </HoverBorderGradient>
        </div> 
        </div>
        <div className="absolute top-1/2 right-10 transform -translate-y-1/2">
        <img
          src={dice}
          alt="dice"
          className="w-56 h-56 md:w-80 md:h-80 lg:h-96 lg:w-96"
        />
     </div>
    </div>
  );
}

export default Home;
