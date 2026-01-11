'use client'

import Image from "next/image";
import { AiFillFileText, AiFillBulb, AiFillAudio } from "react-icons/ai";
import { BiCrown } from "react-icons/bi";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { RiLeafLine } from "react-icons/ri";
import Link from "next/link";
import HeadingList from "./components/layout/HeadingList";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect signed-in users
  useEffect(() => {
    if (!loading && user) {
      router.replace("/for-you");
    }
  }, [user, loading, router]);

  // --- Landing ---
  const Landing = () => (
    <section id="landing" className="py-10">
      <div className="max-w-267.5 w-full mx-auto px-6 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-[#032b41] font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
            Gain more knowledge <br className="hidden md:inline" /> in less time
          </h1>
          <p className="text-[#394547] font-light text-base sm:text-lg md:text-xl mb-6 leading-relaxed">
            Great summaries for busy people,
            <br className="hidden md:inline" />
            individuals who barely have time to read,
            <br className="hidden md:inline" />
            and even people who don’t like to read.
          </p>
          <Link
            className="cursor-pointer bg-[#2bd97c] text-[#032b41] w-full max-w-75 h-10 rounded text-base font-medium flex items-center justify-center hover:bg-[#20ba68] transition"
            href={"/for-you"}
          >
            Login
          </Link>
        </div>
        <figure className="w-full md:w-1/2 flex justify-end mt-6 md:mt-0">
          <Image
            src="/landing.png"
            alt="landing"
            width={400}
            height={300}
            className="w-full h-full max-w-100"
          />
        </figure>
      </div>
    </section>
  );

  // --- Features ---
  const Features = () => (
    <section id="features" className="py-10">
      <div className="max-w-267.5 w-full mx-auto px-6">
        <h2 className="text-[#032b41] text-2xl sm:text-3xl font-bold text-center mb-8">
          Understand books in few minutes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-24  text-center">
          <div className="flex flex-col items-center">
            <AiFillFileText className="text-[#032b41] w-12 h-12 sm:w-16 sm:h-16 mb-2" />
            <h3 className="text-lg sm:text-[24px] text-[#032b41] font-medium mb-4">
              Read or listen
            </h3>
            <p className="text-[#394547] font-light text-sm sm:text-[18px]">
              Save time by getting the core ideas from the best books.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <AiFillBulb className="text-[#032b41] w-12 h-12 sm:w-16 sm:h-16 mb-2" />
            <h3 className="text-lg sm:text-[24px] text-[#032b41] font-medium mb-4">
              Find your next read
            </h3>
            <p className="text-[#394547] font-light text-sm sm:text-[18px]">
              Explore book lists and personalized recommendations.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <AiFillAudio className="text-[#032b41] w-12 h-12 sm:w-16 sm:h-16 mb-2" />
            <h3 className="text-lg sm:text-[24px] text-[#032b41] font-medium mb-4">
              Briefcasts
            </h3>
            <p className="text-[#394547] font-light text-sm sm:text-[18px]">
              Gain valuable insights from briefcasts
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  // --- Statistics ---
  const Statistics = () => {
    const stats1 = [
      {
        number: "93%",
        text: "of Summarist members significantly increase reading frequency.",
      },
      { number: "96%", text: "of Summarist members establish better habits." },
      {
        number: "90%",
        text: "have made significant positive change to their lives.",
      },
    ];

    const stats2 = [
      {
        number: "91%",
        text: "of Summarist members report feeling more productive after incorporating the service into their daily routine.",
      },
      {
        number: "94%",
        text: "of Summarist members have noticed an improvement in their overall comprehension and retention of information.",
      },
      {
        number: "88%",
        text: "of Summarist members feel more informed about current events and industry trends since using the platform.",
      },
    ];

    const headings1 = [
      "Enhance your knowledge",
      "Achieve greater success",
      "Improve your health",
      "Develop better parenting skills",
      "Increase happiness",
      "Be the best version of yourself!",
    ];

    const headings2 = [
      "Expand your learning",
      "Accomplish your goals",
      "Strengthen your vitality",
      "Become a better caregiver",
      "Improve your mood",
      "Maximize your abilities",
    ];

    return (
      <section id="statistics" className="py-10">
        <div className="max-w-267.5 w-full mx-auto px-6 flex flex-col gap-16">
          <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-20">
            <div className="flex flex-col justify-center w-full">
              <HeadingList headings={headings1} />
            </div>
            <div className="flex flex-col justify-center w-full gap-6 bg-[#f1f6f4] p-6 sm:p-10">
              {stats1.map((stat, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="text-[#0365f2] font-semibold text-base sm:text-lg mt-1">
                    {stat.number}
                  </div>
                  <div className="text-[#394547] font-light text-sm sm:text-lg">
                    {stat.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-20">
            <div className="flex flex-col justify-center w-full gap-6 bg-[#f1f6f4] p-6 sm:p-10 order-1 md:order-0">
              {stats2.map((stat, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="text-[#0365f2] font-semibold text-base sm:text-lg mt-1">
                    {stat.number}
                  </div>
                  <div className="text-[#394547] font-light text-sm sm:text-lg">
                    {stat.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center w-full items-end md:items-start">
              <HeadingList headings={headings2} />
            </div>
          </div>
        </div>
      </section>
    );
  };

  // --- Reviews ---
  const Reviews = () => {
    const reviews = [
      {
        name: "Hanna M.",
        body: "This app has been a game-changer for me! It's saved me so much time and effort in reading and comprehending books. Highly recommend it to all book lovers.",
      },
      {
        name: "David B.",
        body: "I love this app! It provides concise and accurate summaries of books in a way that is easy to understand. It's also very user-friendly and intuitive.",
      },
      {
        name: "Nathan S.",
        body: "This app is a great way to get the main takeaways from a book without having to read the entire thing. The summaries are well-written and informative. Definitely worth downloading.",
      },
      {
        name: "Ryan R.",
        body: "If you're a busy person who loves reading but doesn't have the time to read every book in full, this app is for you! The summaries are thorough and provide a great overview of the book's content.",
      },
    ];

    return (
      <section id="reviews" className="py-10">
        <div className="max-w-267.5 w-full mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            What our members say
          </h2>
          <div className="flex flex-col gap-4 sm:gap-8 max-w-150 mx-auto">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-[#fff3d7] p-4 sm:p-6 rounded text-[#394547] font-light"
              >
                <div className="flex gap-2 mb-2 text-[#032b41] font-medium items-center">
                  <span>{review.name}</span>
                  <div className="flex text-[#0564f1] gap-0.5">
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarHalf />
                  </div>
                </div>
                <p className="leading-relaxed text-sm sm:text-base">
                  {review.body}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Link
              className="cursor-pointer bg-[#2bd97c] text-[#032b41] w-full max-w-75 h-10 rounded text-base font-medium flex items-center justify-center hover:bg-[#20ba68] transition"
              href={"/for-you"}
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    );
  };

  // --- Numbers ---
  const Numbers = () => {
    const numbers = [
      {
        icon: <BiCrown className="w-12 h-12 text-[#0365f2]" />,
        title: "3 Million",
        subtitle: "Downloads on all platforms",
      },
      {
        icon: (
          <div className="flex gap-1">
            <BsStarFill className="w-5 h-5 text-[#0365f2]" />
            <BsStarFill className="w-5 h-5 text-[#0365f2]" />
            <BsStarFill className="w-5 h-5 text-[#0365f2]" />
            <BsStarFill className="w-5 h-5 text-[#0365f2]" />
            <BsStarHalf className="w-5 h-5 text-[#0365f2]" />
          </div>
        ),
        title: "4.5 Stars",
        subtitle: "Average ratings on iOS and Google Play",
      },
      {
        icon: <RiLeafLine className="w-12 h-12 text-[#0365f2]" />,
        title: "97%",
        subtitle: "Of Summarist members create a better reading habit",
      },
    ];

    return (
      <section id="numbers" className="py-10">
        <div className="max-w-267.5 w-full mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            Start growing with Summarist now
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
            {numbers.map((num, idx) => (
              <div
                key={idx}
                className="bg-[#d7e9ff] flex flex-col items-center text-center p-6 sm:pb-10 rounded-xl"
              >
                <div className="flex items-center h-16 mb-2">{num.icon}</div>
                <h3 className="text-2xl sm:text-4xl font-bold text-[#032b41] mb-4">
                  {num.title}
                </h3>
                <p className="text-[#394547] font-light text-sm sm:text-base">
                  {num.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // --- Footer ---

  return (
    <div className="max-w-300 mx-auto">
      <Navbar />
      <Landing />
      <Features />
      <Statistics />
      <Reviews />
      <Numbers />
      <Footer />
    </div>
  );
}
