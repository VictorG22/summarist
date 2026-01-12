import { useAuthModal } from "@/app/context/AuthModalContext";

export default function Login() {
  const { openModal } = useAuthModal();
  return (
    <button
      onClick={() => openModal("login")}
      className="cursor-pointer bg-[#2bd97c] text-[#032b41] w-full max-w-75 h-10 rounded text-base font-medium flex items-center justify-center hover:bg-[#20ba68] transition"
    >
      Login
    </button>
  );
}
