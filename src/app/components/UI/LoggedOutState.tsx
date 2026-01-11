import { useAuthModal } from '@/app/context/AuthModalContext';
import Image from 'next/image'

export default function LoggedOutState({pageTitle}:{pageTitle: string}) {
      const { openModal } = useAuthModal();
  return (
            <div className="flex flex-col mx-auto justify-center items-center max-w-115 gap-6">
              <Image
                src={"/login.png"}
                width={460}
                height={460}
                alt="login image"
              />
              <h2 className="text-[#032b41] text-2xl font-bold tracking-tight text-center">
                Log in to your account to see your {`${pageTitle}`}
              </h2>
              <button
                onClick={() => openModal("login")}
                className="max-w-50 w-full bg-[#2bd97c] h-10 rounded-sm text-base hover:bg-[#20ba68] transition duration-200 cursor-pointer"
              >
                Login
              </button>
            </div>
  )
}
