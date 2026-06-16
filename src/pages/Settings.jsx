import { useEffect, useState } from "react";
import Footer from "../components/Footer";

const Settings = () => {

    const [highlightCurrent, setHighlightCurrent] = useState(true);
    const [typingSoundEnabled, setTypingSoundEnabled] = useState(true);
    const [cursorEnabled, setCursorEnabled] = useState(true);

    useEffect(() => {

        // Default settings

        if (localStorage.getItem("highlightCurrent") === null) {
            localStorage.setItem("highlightCurrent", "true");
        }

        if (localStorage.getItem("typingSound") === null) {
            localStorage.setItem("typingSound", "true");
        }

        if (localStorage.getItem("cursorEnabled") === null) {
            localStorage.setItem("cursorEnabled", "true");
        }

        // Load settings

        setHighlightCurrent(
            localStorage.getItem("highlightCurrent") === "true"
        );

        setTypingSoundEnabled(
            localStorage.getItem("typingSound") === "true"
        );

        setCursorEnabled(
            localStorage.getItem("cursorEnabled") === "true"
        );

    }, []);

    const toggleHighlight = () => {

        const newValue = !highlightCurrent;

        setHighlightCurrent(newValue);

        localStorage.setItem(
            "highlightCurrent",
            String(newValue)
        );

    };

    const toggleSound = () => {

        const newValue = !typingSoundEnabled;

        setTypingSoundEnabled(newValue);

        localStorage.setItem(
            "typingSound",
            String(newValue)
        );

    };

    const toggleCursor = () => {

        const newValue = !cursorEnabled;

        setCursorEnabled(newValue);

        localStorage.setItem(
            "cursorEnabled",
            String(newValue)
        );

    };

    return (
        <div
            className="
            min-h-screen
            bg-white
            dark:bg-black
            text-black
            dark:text-white
            px-6
            py-10
        "
        >

            <h1
                className="
                text-5xl
                font-bold
                text-center
                mb-10
            "
            >
                ⚙ Settings
            </h1>

            <div
                className="
                max-w-3xl
                mx-auto
                bg-white
                dark:bg-white/5
                border
                border-gray-200
                dark:border-white/10
                rounded-xl
                p-6
            "
            >

                {/* Highlight */}

                <div
                    className="
                    flex
                    justify-between
                    items-center
                "
                >

                    <div>

                        <h2 className="text-2xl font-bold">
                            Current Letter Highlight
                        </h2>

                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            Highlight current character while typing
                        </p>

                    </div>

                    <button
                        onClick={toggleHighlight}
                        className="
                        bg-cyan-500
                        px-5
                        py-2
                        rounded-xl
                        font-bold
                        text-white
                        "
                    >
                        {highlightCurrent ? "ON" : "OFF"}
                    </button>

                </div>

                {/* Typing Sound */}

                <div
                    className="
                    flex
                    justify-between
                    items-center
                    mt-8
                "
                >

                    <div>

                        <h2 className="text-2xl font-bold">
                            Typing Sound
                        </h2>

                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            Play keyboard sound while typing
                        </p>

                    </div>

                    <button
                        onClick={toggleSound}
                        className="
                        bg-cyan-500
                        px-5
                        py-2
                        rounded-xl
                        font-bold
                        text-white
                        "
                    >
                        {typingSoundEnabled ? "ON" : "OFF"}
                    </button>

                </div>

                {/* Cursor */}

                <div
                    className="
                    flex
                    justify-between
                    items-center
                    mt-8
                "
                >

                    <div>

                        <h2 className="text-2xl font-bold">
                            Cursor
                        </h2>

                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            Show typing cursor while typing
                        </p>

                    </div>

                    <button
                        onClick={toggleCursor}
                        className="
                        bg-cyan-500
                        px-5
                        py-2
                        rounded-xl
                        font-bold
                        text-white
                        "
                    >
                        {cursorEnabled ? "ON" : "OFF"}
                    </button>

                </div>

            </div>

            <Footer />

        </div>
    );
};

export default Settings;