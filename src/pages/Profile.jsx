import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { signout } = useAuth();
  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <button
        className="px-4 py-2 mt-5 bg-yellow-600 text-black font-semibold rounded"
        onClick={signout}
      >
        Signout
      </button>
    </div>
  );
};

export default Profile;
