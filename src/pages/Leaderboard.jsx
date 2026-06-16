import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import {
  collection,
  getDocs,
  orderBy,
  query,
  limit,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const q = query(
        collection(db, "bestScores"),
        orderBy("wpm", "desc"),
        limit(20)
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setScores(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      <h1 className="text-5xl font-bold text-center mb-10">
        🏆 Leaderboard
      </h1>

      <div className="max-w-4xl mx-auto">

        {scores.map((player, index) => (
          <div
            key={player.id}
            className="
            flex
            items-center
            justify-between
            bg-white
            dark:bg-white/5
            border
            border-gray-200
            dark:border-white/10
            rounded-xl
            p-4
            mb-4
            shadow-sm
            "
          >
            <div className="flex items-center gap-4">

              <div className="text-2xl font-bold text-cyan-400">
                #{index + 1}
              </div>

              <img
                src={player.photo}
                alt={player.name}
                className="
                w-12
                h-12
                rounded-full
                "
              />

              <div>
                <h2 className="font-bold">
                  {player.name}
                </h2>

                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {player.rating}
                </p>
              </div>

            </div>

            <div className="text-2xl font-bold text-purple-400">
              {player.wpm} WPM
            </div>

          </div>
        ))}

      </div>

        <Footer />

    </div>
  );
};

export default Leaderboard;