import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import typingSound from "../assets/typing.mp3";
import { generateParagraph } from "../services/gemini";
import Footer from "../components/Footer";
import easyWords from "../data/easyWords";
import mediumWords from "../data/mediumWords";
import hardWords from "../data/hardWords";
import expertWords from "../data/expertWords";


const generateWords = () => {

    const difficulty =
        localStorage.getItem("difficulty") || "Easy";

    let words = easyWords;

    if (difficulty === "Medium")
        words = mediumWords;

    if (difficulty === "Hard")
        words = hardWords;

    if (difficulty === "Expert")
        words = expertWords;

    const result = [];

    let previousWord = "";

    let wordCount = 80;

    if (difficulty === "Easy")
        wordCount = 40;

    if (difficulty === "Medium")
        wordCount = 60;

    if (difficulty === "Hard")
        wordCount = 80;

    if (difficulty === "Expert")
        wordCount = 120;

    for (let i = 0; i < wordCount; i++) {

        let randomWord;

        do {

            randomWord =
                words[
                Math.floor(
                    Math.random() * words.length
                )
                ];

        } while (
            randomWord === previousWord
        );

        result.push(randomWord);

        previousWord = randomWord;

    }

    return result.join(" ");
};

const Typing = () => {
    const [loadingAI, setLoadingAI] = useState(false);
    const [sampleText, setSampleText] =
        useState(generateWords());
    const [selectedTime, setSelectedTime] = useState(30);

    const [input, setInput] = useState("");
    const [timeLeft, setTimeLeft] = useState(30);
    const [isStarted, setIsStarted] = useState(false);
    const highlightCurrent =
        localStorage.getItem("highlightCurrent") !== "false";
    const audio = new Audio(typingSound);
    const [wpmHistory, setWpmHistory] = useState([]);


    const inputRef = useRef(null);
    const navigate = useNavigate();
    const [cursorVisible, setCursorVisible] = useState(true);
    const [customTime, setCustomTime] = useState("");


    const difficulty =
        localStorage.getItem("difficulty") || "Easy";

    const cursorEnabled =
        localStorage.getItem("cursorEnabled") !== "false";



    const playSound = () => {
        const sound = new Audio(typingSound);
        sound.volume = 0.2;
        sound.play();
    };


    useEffect(() => {
        inputRef.current?.focus();
    }, []);


    useEffect(() => {
        let timer;

        if (isStarted && timeLeft > 0) {
            timer = setInterval(() => {

                setTimeLeft((prev) => {

                    const newTime = prev - 1;

                    const elapsed =
                        selectedTime - newTime;

                    if (
                        elapsed > 0 &&
                        elapsed % 5 === 0
                    ) {

                        setWpmHistory((prevHistory) => {

                            const alreadyExists =
                                prevHistory.some(
                                    (item) =>
                                        item.second === elapsed
                                );

                            if (alreadyExists)
                                return prevHistory;

                            return [
                                ...prevHistory,
                                {
                                    second: elapsed,
                                    wpm: wpm,
                                },
                            ];

                        });

                    }

                    return newTime;

                });

            }, 1000);
        }

        if (isStarted && timeLeft === 0) {
            navigate("/results", {
                state: {
                    wpm,
                    accuracy,
                    errors,
                    chars: input.length,
                    rating: getRating(),
                    wpmHistory,
                },
            });
        }

        return () => clearInterval(timer);
    }, [isStarted, timeLeft]);

    const handleChange = (e) => {
        if (!isStarted) setIsStarted(true);

        if (timeLeft > 0) {
            const value = e.target.value;

            if (localStorage.getItem("typingSound")
                !== "false") {
                playSound();
            }

            // Paragraph se zyada type nahi kar sakta
            if (value.length <= sampleText.length) {
                setInput(value);

                // Paragraph complete hote hi auto finish
                if (value.length === sampleText.length) {
                    navigate("/results", {
                        state: {
                            wpm,
                            accuracy,
                            errors,
                            chars: value.length,
                            rating: getRating(),
                        },
                    });
                }
            }
        }
    };

    let correctChars = 0;
    let errors = 0;

    for (let i = 0; i < input.length; i++) {
        if (input[i] === sampleText[i]) {
            correctChars++;
        } else {
            errors++;
        }
    }

    const accuracy =
        input.length === 0
            ? 100
            : Math.round((correctChars / input.length) * 100);

    const wordsTyped = input.trim()
        ? input.trim().split(/\s+/).length
        : 0;

    const elapsedTime = selectedTime - timeLeft || 1;

    const wpm = Math.round(
        wordsTyped / (elapsedTime / 60)
    );

    const progress = Math.min(
        Math.round((input.length / sampleText.length) * 100),
        100
    );

    const getRating = () => {
        if (wpm < 20) return "Beginner";
        if (wpm < 40) return "Average";
        if (wpm < 60) return "Good";
        if (wpm < 80) return "Fast";
        if (wpm < 120) return "Pro";
        return "Legend";
    };

    const changeTime = (time) => {
        setSelectedTime(time);
        setTimeLeft(time);
        setInput("");
        setIsStarted(false);

        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const restart = () => {
        setSampleText(generateWords());
        setInput("");
        setTimeLeft(selectedTime);
        setIsStarted(false);

        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    };

    const generateAIText = async () => {

        try {

            setLoadingAI(true);

            const text = await generateParagraph();

            setSampleText(text);

            setInput("");
            setIsStarted(false);

            setTimeLeft(selectedTime);

        } catch (error) {

            console.log(error);

        } finally {

            setLoadingAI(false);

        }

    };



    return (
        <div
            className="
        min-h-screen
        bg-white
        text-black
        dark:bg-black
        dark:text-white
        px-4
        md:px-6
        py-6
        md:py-10
        "
        >
            <div className="max-w-5xl mx-auto">

                <>
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
                        Classic Mode
                    </h1>

                    <div
                        className="
                    flex
                    justify-center
                    mb-6
                    px-2
                    "
                    >

                        <span
                            className={`
                        px-3
                        md:px-4
                        py-2
                        rounded-xl
                        font-bold
                        text-sm
                        md:text-base
                        text-white

                        ${difficulty === "Easy"
                                    ? "bg-green-500"
                                    : difficulty === "Medium"
                                        ? "bg-yellow-500"
                                        : difficulty === "Hard"
                                            ? "bg-red-500"
                                            : "bg-purple-500"
                                }
                        `}
                        >
                            Difficulty: {difficulty}
                        </span>

                    </div>
                </>

                <div
                    className="
    flex
    flex-wrap
    justify-center
    gap-2
    md:gap-3
    mb-8
    "
                >
                    {[15, 30, 60, 120].map((time) => (
                        <button
                            key={time}
                            onClick={() => changeTime(time)}
                            className={`px-4 md:px-5 py-2 rounded-xl font-bold ${selectedTime === time
                                    ? "bg-cyan-500"
                                    : "bg-white/10"
                                }`}
                        >
                            {time}s
                        </button>
                    ))}
                </div>

                <div
                    className="
    flex
    justify-center
    gap-3
    mb-8
    flex-wrap
    "
                >
                    <input
                        type="number"
                        placeholder="Custom"
                        value={customTime}
                        onChange={(e) => setCustomTime(e.target.value)}
                        className="
        px-4
        py-2
        rounded-xl
        bg-white/10
        border
        border-white/20
        w-24
        sm:w-28
        text-center
        "
                    />

                    <button
                        onClick={() => {
                            if (!customTime) return;
                            changeTime(Number(customTime));
                        }}
                        className="
        bg-cyan-500
        px-4
        py-2
        rounded-xl
        font-bold
        "
                    >
                        Set
                    </button>
                </div>

                <div
                    className="
    grid
    grid-cols-2
    sm:grid-cols-3
    lg:grid-cols-5
    gap-4
    mb-8
    "
                >
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                        <h2 className="text-cyan-400 text-xl md:text-2xl font-bold">
                            {timeLeft}
                        </h2>
                        <p>Time</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                        <h2 className="text-purple-400 text-xl md:text-2xl font-bold">
                            {wpm}
                        </h2>
                        <p>WPM</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                        <h2 className="text-pink-400 text-xl md:text-2xl font-bold">
                            {accuracy}%
                        </h2>
                        <p>Accuracy</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                        <h2 className="text-red-400 text-xl md:text-2xl font-bold">
                            {errors}
                        </h2>
                        <p>Errors</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                        <h2 className="text-green-400 text-xl md:text-2xl font-bold">
                            {input.length}
                        </h2>
                        <p>Chars</p>
                    </div>
                </div>

                <div className="mb-8">
                    <div className="flex justify-between mb-2 text-sm md:text-base">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>

                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-cyan-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div
                    onClick={() => inputRef.current?.focus()}
                    className="
                                  bg-white/5
                                  border
                                  border-white/10
                                  rounded-xl
                                  p-4
                                  md:p-6
                                  text-base
                                  sm:text-lg
                                  md:text-xl
                                  leading-8
                                  md:leading-10
                                  mb-6
                                  flex
                                  flex-wrap
                                  cursor-text
                                  whitespace-pre-wrap
                                  min-h-[120px]
                                  "
                >
                    {sampleText.split("").map((char, index) => {
                        let color = "text-gray-500";

                        if (index < input.length) {
                            color =
                                input[index] === char
                                    ? "text-green-400"
                                    : "text-red-400";
                        }

                        if (index === input.length) {
                            color = highlightCurrent
                                ? "text-white"
                                : "text-gray-500";
                        }

                        return (
                            <span key={index} className={color}>
                                {cursorEnabled &&
                                    index === input.length && (
                                        <span
                                            className="
                                                    text-cyan-300
                                                    font-bold
                                                    inline-block
                                                    transition-all
                                                    duration-75
                                                    "
                                        >
                                            |
                                        </span>
                                    )}

                                {char === " "
                                    ? "\u00A0"
                                    : char}
                            </span>
                        );
                    })}
                </div>

                <textarea
                    ref={inputRef}
                    value={input}
                    onChange={handleChange}
                    disabled={timeLeft === 0}
                    className="absolute opacity-0 pointer-events-none"
                />

                <button
                    onClick={restart}
                    className="
                             mt-6
                             w-full
                             sm:w-auto
                             bg-cyan-500
                             px-6
                             py-3
                             rounded-xl
                             font-bold
                             "
                    >
                    Restart
                </button>

            </div>

            <Footer />

        </div>
    );
};

export default Typing;