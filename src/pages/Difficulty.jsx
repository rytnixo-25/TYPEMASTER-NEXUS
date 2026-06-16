import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Difficulty = () => {
    const navigate = useNavigate();

    const selectDifficulty = (difficulty) => {
        localStorage.setItem("difficulty", difficulty);
        navigate("/typing");
    };

    return (
        <div className="min-h-screen bg-black text-white px-4 md:px-6 py-8 md:py-10">

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
                Select Difficulty
            </h1>

            <p className="text-center text-gray-400 mb-10">
                Choose your challenge level
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">

                <div
                    onClick={() => selectDifficulty("Easy")}
                    className="bg-green-500/10 border border-green-500 rounded-2xl p-6 cursor-pointer hover:scale-105 transition"
                >
                    <h2 className="text-2xl font-bold text-green-400">
                        Easy
                    </h2>
                    <p className="mt-3 text-gray-400">
                        Beginner friendly words
                    </p>
                </div>

                <div
                    onClick={() => selectDifficulty("Medium")}
                    className="bg-yellow-500/10 border border-yellow-500 rounded-2xl p-6 cursor-pointer hover:scale-105 transition"
                >
                    <h2 className="text-2xl font-bold text-yellow-400">
                        Medium
                    </h2>
                    <p className="mt-3 text-gray-400">
                        Balanced difficulty
                    </p>
                </div>

                <div
                    onClick={() => selectDifficulty("Hard")}
                    className="bg-red-500/10 border border-red-500 rounded-2xl p-6 cursor-pointer hover:scale-105 transition"
                >
                    <h2 className="text-2xl font-bold text-red-400">
                        Hard
                    </h2>
                    <p className="mt-3 text-gray-400">
                        Advanced vocabulary
                    </p>
                </div>

                <div
                    onClick={() => selectDifficulty("Expert")}
                    className="bg-purple-500/10 border border-purple-500 rounded-2xl p-6 cursor-pointer hover:scale-105 transition"
                >
                    <h2 className="text-2xl font-bold text-purple-400">
                        Expert
                    </h2>
                    <p className="mt-3 text-gray-400">
                        Ultimate typing challenge
                    </p>
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default Difficulty;