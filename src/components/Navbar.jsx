import { useNavigate } from "react-router-dom";
import LoginButton from "../components/LoginButton";

const Navbar = () => {

    const navigate = useNavigate();

    return (
        <nav
            className="
            w-full
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-4
            px-4
            md:px-8
            py-5
        "
        >

            <h1
                className="
                text-xl
                md:text-2xl
                font-bold
                text-cyan-400
                text-center
            "
            >
                TYPEMASTER NEXUS
            </h1>

            <div
                className="
                flex
                flex-wrap
                justify-center
                gap-3
                items-center
            "
            >

                <button
                    onClick={() => navigate("/dashboard")}
                    className="
                    bg-white/10
                    px-4
                    py-2
                    rounded-lg
                    hover:bg-white/20
                    text-sm
                    md:text-base
                    "
                >
                    Dashboard
                </button>

                <button
                    onClick={() => navigate("/leaderboard")}
                    className="
                    bg-white/10
                    px-4
                    py-2
                    rounded-lg
                    hover:bg-white/20
                    text-sm
                    md:text-base
                    "
                >
                    Leaderboard
                </button>

                <button
                    onClick={() => navigate("/settings")}
                    className="
                    bg-white/10
                    px-4
                    py-2
                    rounded-lg
                    hover:bg-white/20
                    text-sm
                    md:text-base
                    "
                >
                    ⚙ Settings
                </button>

                <LoginButton />

            </div>

        </nav>
    );
};

export default Navbar;