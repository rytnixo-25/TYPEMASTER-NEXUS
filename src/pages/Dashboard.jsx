import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { user } = useAuth();

    const [bestWpm, setBestWpm] = useState(0);
    const [avgAccuracy, setAvgAccuracy] = useState(0);
    const [totalTests, setTotalTests] = useState(0);
    const [latestRating, setLatestRating] = useState("-");
    const [highestAccuracy, setHighestAccuracy] = useState(0);
    const [averageWpm, setAverageWpm] = useState(0);
    const [totalChars, setTotalChars] = useState(0);
    const [performanceLevel, setPerformanceLevel] = useState("-");
  const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        if (user) {
            fetchStats();
        }
    }, [user]);

    const fetchStats = async () => {
        try {
            const q = query(
                collection(db, "scores"),
                where("uid", "==", user.uid)
            );

            const snapshot = await getDocs(q);

            const scores = snapshot.docs.map((doc) => doc.data());

            if (scores.length === 0) return;

            const best = Math.max(
                ...scores.map((score) => score.wpm)
            );

            const avg =
                scores.reduce(
                    (sum, score) => sum + score.accuracy,
                    0
                ) / scores.length;

            const latest =
                scores[scores.length - 1]?.rating || "-";
            const highestAcc = Math.max(
                ...scores.map((score) => score.accuracy)
            );

            const avgWpm =
                scores.reduce(
                    (sum, score) => sum + score.wpm,
                    0
                ) / scores.length;

            const charsTyped =
                scores.reduce(
                    (sum, score) => sum + score.chars,
                    0
                );

            let level = "Beginner";

            const badges = [];

            if (scores.length >= 1) {
                badges.push("🎯 First Test");
            }

            if (best >= 50) {
                badges.push("🚀 50 WPM Club");
            }

            if (best >= 80) {
                badges.push("🏆 Pro Typist");
            }

            if (best >= 100) {
                badges.push("👑 Speed Legend");
            }

            if (highestAcc >= 95) {
                badges.push("🎯 Accuracy Master");
            }

            if (best >= 80) level = "Pro";
            else if (best >= 60) level = "Advanced";
            else if (best >= 40) level = "Intermediate";

            setBestWpm(best);
            setAvgAccuracy(Math.round(avg));
            setTotalTests(scores.length);
            setLatestRating(latest);
            setHighestAccuracy(highestAcc);
            setAverageWpm(Math.round(avgWpm));
            setTotalChars(charsTyped);
            setPerformanceLevel(level);
            setAchievements(badges);


        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="
         min-h-screen
         bg-white
        text-black
         dark:bg-black
         dark:text-white
          px-6
          py-10
           ">

            <h1 className="text-5xl font-bold text-center mb-10">
                👤 Dashboard
            </h1>

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h2 className="text-cyan-400 text-4xl font-bold">
                        {bestWpm}
                    </h2>
                    <p className="mt-2">Best WPM</p>
                    {bestWpm >= 40 && bestWpm < 80 && (
                        <span className="inline-block mt-3 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold">
                            🚀 Rising Typist
                        </span>
                    )}
                    {bestWpm >= 80 && bestWpm < 120 && (
                        <span className="inline-block mt-3 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-bold">
                            🏆 Pro Typist
                        </span>
                    )}

                    {bestWpm >= 120 && (
                        <span className="inline-block mt-3 bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full text-sm font-bold">
                            👑 Legend
                        </span>
                    )}
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h2 className="text-pink-400 text-4xl font-bold">
                        {avgAccuracy}%
                    </h2>
                    <p className="mt-2">Average Accuracy</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h2 className="text-green-400 text-4xl font-bold">
                        {totalTests}
                    </h2>
                    <p className="mt-2">Total Tests</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h2 className="text-purple-400 text-4xl font-bold">
                        {latestRating}
                    </h2>
                    <p className="mt-2">Latest Rating</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h2 className="text-yellow-400 text-4xl font-bold">
                        {highestAccuracy}%
                    </h2>
                    <p className="mt-2">Highest Accuracy</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h2 className="text-cyan-400 text-4xl font-bold">
                        {averageWpm}
                    </h2>
                    <p className="mt-2">Average WPM</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h2 className="text-green-400 text-4xl font-bold">
                        {totalChars}
                    </h2>
                    <p className="mt-2">Characters Typed</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h2 className="text-pink-400 text-4xl font-bold">
                        {performanceLevel}
                    </h2>
                    <p className="mt-2">Performance Level</p>
                </div>

            </div>

            <div className="max-w-5xl mx-auto mt-8">

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">

                    <h2 className="text-3xl font-bold mb-6 text-center">
                        🏆 Achievements
                    </h2>

                    <div className="flex flex-wrap gap-4 justify-center">

                        {achievements.length === 0 ? (
                            <p className="text-gray-400">
                                No achievements unlocked yet.
                            </p>
                        ) : (
                            achievements.map((badge, index) => (
                                <div
                                    key={index}
                                    className="
                        bg-cyan-500/10
                        border
                        border-cyan-500/30
                        px-4
                        py-2
                        rounded-full
                        font-bold
                        "
                                >
                                    {badge}
                                </div>
                            ))
                        )}

                    </div>

                </div>

            </div>

            <Footer />

        </div>
    );
};

export default Dashboard;