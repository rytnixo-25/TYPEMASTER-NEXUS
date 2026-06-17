import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {doc,getDoc,setDoc,} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const Results = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    const {
        wpm = 0,
        accuracy = 0,
        errors = 0,
        chars = 0,
        rating = "Beginner",
        wpmHistory = [],
    } = location.state || {};

    const getAccuracyGrade = () => {
        if (accuracy >= 98) return "A+";
        if (accuracy >= 95) return "A";
        if (accuracy >= 90) return "B+";
        if (accuracy >= 85) return "B";
        if (accuracy >= 80) return "C";
        return "D";
    };

    const getSpeedGrade = () => {
        if (wpm >= 100) return "A+";
        if (wpm >= 80) return "A";
        if (wpm >= 60) return "B+";
        if (wpm >= 40) return "B";
        if (wpm >= 20) return "C";
        return "D";
    };

    const getPerformanceScore = () => {
        return Math.min(
            100,
            Math.round((accuracy * 0.6) + (Math.min(wpm, 100) * 0.4))
        );
    };

    const getAiFeedback = () => {
        const tips = [];

        if (accuracy < 85) {
            tips.push("Focus on reducing typing mistakes.");
        }

        if (errors > 15) {
            tips.push("Try to improve finger accuracy.");
        }

        if (wpm < 40) {
            tips.push("Practice daily to increase speed.");
        }

        if (wpm >= 40 && wpm < 80) {
            tips.push("Good speed. Work on consistency.");
        }

        if (wpm >= 80) {
            tips.push("Excellent speed. Focus on maintaining accuracy.");
        }

        if (accuracy >= 95) {
            tips.push("Amazing accuracy. Keep it up!");
        }

        return tips;
    };


    const chartData = wpmHistory;

    const saveScore = async () => {
        if (!user) return;

        try {


            const finalWpm = Math.round(
                wpm * (accuracy / 100)
            );

            // Normal Score History Save



            // Best Score System

            const bestRef = doc(db, "bestScores", user.uid);

            const bestSnap = await getDoc(bestRef);

            if (!bestSnap.exists()) {

                await setDoc(bestRef, {
                    uid: user.uid,
                    name: user.displayName,
                    photo: user.photoURL,
                    wpm: finalWpm,
                    rawWpm: wpm,
                    accuracy,
                    errors,
                    chars,
                    rating,
                    createdAt: new Date(),
                });

            } else {

                const oldData = bestSnap.data();

                if (finalWpm > oldData.wpm) {

                    await setDoc(bestRef, {
                        uid: user.uid,
                        name: user.displayName,
                        photo: user.photoURL,
                        wpm: finalWpm,
                        rawWpm: wpm,
                        accuracy,
                        errors,
                        chars,
                        rating,
                        createdAt: new Date(),
                    });

                }

            }

            console.log("Score Saved");

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        saveScore();
    }, []);

    return (
        <div
            className="
                  min-h-screen
                  bg-black
                  text-white
                  flex
                  justify-center
                  items-center
                  px-4
                  md:px-6
                  py-6
                  "
        >
            <div className="max-w-3xl w-full">

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10">
                    Test Results
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h2 className="text-cyan-400 text-3xl font-bold">
                            {wpm}
                        </h2>
                        <p>WPM</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h2 className="text-pink-400 text-3xl font-bold">
                            {accuracy}%
                        </h2>
                        <p>Accuracy</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h2 className="text-red-400 text-3xl font-bold">
                            {errors}
                        </h2>
                        <p>Errors</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h2 className="text-green-400 text-3xl font-bold">
                            {chars}
                        </h2>
                        <p>Characters Typed</p>
                    </div>

                </div>

                <div className="mt-8 bg-cyan-500/10 border border-cyan-500 rounded-xl p-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">
                        Rating: {rating}
                        <div className="grid
                                 grid-cols-1
                                  sm:grid-cols-2
                                   lg:grid-cols-3
                                   gap-4 mt-6">

                            <div className="bg-white/5 rounded-xl p-4 text-center">
                                <h3 className="text-cyan-400 text-2xl font-bold">
                                    {getAccuracyGrade()}
                                </h3>
                                <p>Accuracy Grade</p>
                            </div>

                            <div className="bg-white/5 rounded-xl p-4 text-center">
                                <h3 className="text-purple-400 text-2xl font-bold">
                                    {getSpeedGrade()}
                                </h3>
                                <p>Speed Grade</p>
                            </div>

                            <div className="bg-white/5 rounded-xl p-4 text-center">
                                <h3 className="text-pink-400 text-2xl font-bold">
                                    {getPerformanceScore()}/100
                                </h3>
                                <p>Performance Score</p>
                            </div>

                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="
                             mt-8
                             bg-white/5
                             border
                             border-white/10
                             rounded-xl
                             p-6
                             "
                        >

                            <h2 className="text-2xl font-bold mb-4">
                                📈 Performance Graph
                            </h2>

                            <div className="h-64 md:h-96">

                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >

                                    <LineChart data={chartData}>

                                        <XAxis dataKey="second" />

                                        <YAxis />

                                        <Tooltip />

                                        <Line
                                            type="natural"
                                            dataKey="wpm"
                                            stroke="#22d3ee"
                                            strokeWidth={3}
                                        />

                                    </LineChart>

                                </ResponsiveContainer>

                            </div>

                        </motion.div>


                        <div className="mt-8 bg-purple-500/10 border border-purple-500 rounded-xl p-6">

                            <h2 className="text-2xl font-bold text-purple-400 mb-4">
                                🤖 AI Coach
                            </h2>

                            <div className="space-y-3">
                                {getAiFeedback().map((tip, index) => (
                                    <div
                                        key={index}
                                        className="
                                                 bg-white/5
                                                 rounded-lg
                                                 p-3
                                                 text-sm
                                                 md:text-base
                                                 "
                                    >
                                        • {tip}
                                    </div>
                                ))}
                            </div>

                        </div>
                    </h2>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">

                    <button
                        onClick={() => navigate("/typing")}
                        className="w-full sm:w-auto bg-cyan-500 px-6 py-3 rounded-xl font-bold"
                    >
                        Retry
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="w-full sm:w-auto bg-white/10 px-6 py-3 rounded-xl font-bold"
                    >
                        Home
                    </button>

                </div>

            </div>

        </div>
    );
};

export default Results;