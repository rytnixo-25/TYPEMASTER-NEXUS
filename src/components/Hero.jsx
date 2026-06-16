import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();

    return (
        <motion.section
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="
            min-h-screen
            flex
            flex-col
            justify-center
            items-center
            text-center
            px-4 
            md:px-6
            "
        >

            {/* Brand */}

            <div className="mb-8">

                <h2
                    className="
                    text-3xl
                    sm:text-4xl
                    md:text-6xl
                    font-extrabold
                    bg-gradient-to-r
                    from-cyan-400
                    via-purple-500
                    to-pink-500
                    text-transparent
                    bg-clip-text
                    "
                >
                    TYPEMASTER NEXUS
                </h2>

                <p
                    className="
                    text-gray-600
                    dark:text-gray-400
                    mt-3
                    text-sm
                    sm:text-base
                    md:text-lg
                    "
                >
                    Crafted by Ranjan Pradhan
                </p>

            </div>

            {/* Hero Heading */}

            <h1
                className="
                text-4xl
                sm:text-5xl
                md:text-8xl
                font-bold
                bg-gradient-to-r
                from-cyan-400
                via-purple-500
                to-pink-500
                text-transparent
                bg-clip-text
                "
            >
                Type Faster.
            </h1>

            <h1
                className="
                text-3xl
                sm:text-4xl
                md:text-7xl
                font-bold
                text-black
                dark:text-white
                mt-4
                "
            >
                Think Smarter.
            </h1>

            <p
                className="
                text-gray-600
                dark:text-gray-400
                mt-8
                max-w-2xl
                text-base 
                md:text-lg
                "
            >
                Next-generation AI inspired typing platform with
                advanced analytics, coding practice, custom
                difficulty levels, performance tracking and
                competitive leaderboards.
            </p>

            {/* Buttons */}

            <div
                  className="
                  flex
                  flex-col
                  sm:flex-row
                  gap-4
                  mt-10
                  w-full
                  sm:w-auto
                  "
                    >                    

                <button
                    onClick={() => navigate("/modes")}
                    className="
                    bg-cyan-500
                    hover:scale-105
                    transition
                    w-full
                    sm:w-auto
                    px-8
                    py-4
                    rounded-xl
                    font-bold
                    text-white
                    "
                >
                    Start Typing
                </button>

                <button
                    onClick={() => navigate("/leaderboard")}
                    className="
                    border
                    border-cyan-400
                    hover:bg-cyan-400/10
                    transition
                    w-full
                    sm:w-auto
                    px-8
                    py-4
                    rounded-xl
                    "
                >
                    Leaderboard
                </button>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-4xl">

                <div className="backdrop-blur-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-5 md:p-6">

                    <h2 className="text-cyan-400 text-3xl font-bold">
                        100K+
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Tests Completed
                    </p>

                </div>

                <div className="backdrop-blur-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-5 md:p-6">

                    <h2 className="text-purple-400 text-3xl font-bold">
                        15K+
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Active Users
                    </p>

                </div>

                <div className="backdrop-blur-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-5 md:p-6">

                    <h2 className="text-pink-400 text-3xl font-bold">
                        98%
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Accuracy Rate
                    </p>

                </div>

            </div>

        </motion.section>
    );
};

export default Hero;