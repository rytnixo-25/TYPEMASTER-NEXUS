import {
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth, provider } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

const LoginButton = () => {
  const { user } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
  return (
    <div className="flex items-center gap-3">

      <img
        src={user.photoURL}
        alt="profile"
        className="
        w-10
        h-10
        rounded-full
        border-2
        border-cyan-400
        "
      />

      <span className="hidden md:block text-white font-medium">
        {user.displayName}
      </span>

      <button
        onClick={handleLogout}
        className="
        bg-red-500
        hover:bg-red-600
        px-4
        py-2
        rounded-xl
        font-bold
        text-white
        "
      >
        Logout
      </button>

    </div>
  );
}

  return (
    <button
      onClick={handleGoogleLogin}
      className="
      bg-gradient-to-r
      from-cyan-500
      to-purple-500
      px-5
      py-2
      rounded-xl
      font-bold
      text-white
      "
    >
      Login with Google
    </button>
  );
};

export default LoginButton;