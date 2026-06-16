import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const ComingSoon = () => {

    const navigate = useNavigate();

    return (
        <div
            className="
            min-h-screen
            bg-black
            text-white
            flex
            flex-col
            justify-center
            items-center
            px-6
            text-center
            "
        >

            <h1 className="text-6xl mb-6">
                🚧
            </h1>

            <h2 className="text-4xl font-bold mb-4">
                Coming Soon
            </h2>

            <p className="text-gray-400 max-w-xl mb-8">
                This mode is currently under development
                and will be available in a future update
                of TYPEMASTER NEXUS.
            </p>

            <button
                onClick={() => navigate("/modes")}
                className="
                bg-cyan-500
                px-6
                py-3
                rounded-xl
                font-bold
                "
            >
                Back to Modes
            </button>

             <Footer />

        </div>
    );
};

export default ComingSoon;