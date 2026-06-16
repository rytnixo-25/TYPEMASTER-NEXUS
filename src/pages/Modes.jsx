import {
  FaKeyboard,
  FaRobot,
  FaCode,
  FaBook,
  FaUsers,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const modes = [
  {
    title: "Classic Mode",
    icon: <FaKeyboard size={35} />,
    desc: "Standard typing speed test",
  },
  {
    title: "AI Challenge",
    icon: <FaRobot size={35} />,
    desc: "AI generated typing challenges",
  },
  {
    title: "Coding Mode",
    icon: <FaCode size={35} />,
    desc: "Practice typing real code",
  },
  {
    title: "Story Mode",
    icon: <FaBook size={35} />,
    desc: "Type interesting stories",
  },
  {
    title: "Multiplayer",
    icon: <FaUsers size={35} />,
    desc: "Race against other players",
  },
];

const Modes = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-6 py-8 md:py-10">

      <h1
        className="
        text-3xl
        sm:text-4xl
        md:text-5xl
        font-bold
        text-center
        mb-4
        "
      >
        Select Mode
      </h1>

      <p
        className="
        text-center
        text-gray-400
        mb-10
        md:mb-12
        text-sm
        md:text-base
        "
      >
        Choose your typing challenge
      </p>

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
        max-w-6xl
        mx-auto
        "
      >
        {modes.map((mode, index) => (
          <div
            key={index}

            onClick={() => {
              if (mode.title === "Classic Mode") {
                navigate("/difficulty");
              } else {
                navigate("/coming-soon");
              }

            }}

            className="
            backdrop-blur-lg
            bg-white/5
            border
            border-white/10
            rounded-2xl
            p-5
            md:p-8
            hover:scale-105
            transition
            cursor-pointer
            shadow-sm
            "
          >
            <div className="text-cyan-400 mb-4">
              {mode.icon}
            </div>

            <h2
              className="
              text-xl
              md:text-2xl
              font-bold
              "
            >
              {mode.title}
            </h2>

            <p
              className="
              text-gray-400
              mt-3
              text-sm
              md:text-base
              "
            >
              {mode.desc}
            </p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Modes;