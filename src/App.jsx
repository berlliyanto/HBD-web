import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import celebration from "./assets/celebration.json";
import fullceleb from "./assets/fullceleb.json";
import hit from "./assets/hit.mp3";
import song from "./assets/Happy Song.mp3";
import getout from "./assets/getout.mp3";
import { Envelope, EnvelopeOpen } from "@phosphor-icons/react";

const kataPenyemangat = [
  "Aku percaya bahwa setiap langkah kecilmu membawa kita lebih dekat pada tujuan besar.",
  "Kita bisa mengatasi segala tantangan, karena kita kuat dan tidak akan menyerah.",
  "Usahamu tidak akan pernah sia-sia, setiap usaha akan berbuah manis pada waktunya.",
  "Carilah kesempatan di setiap tantangan, karena di balik kesulitan ada peluang untuk berkembang.",
  "Impianmu adalah petunjuk dari jalan yang akan membawa kebahagiaan sejati.",
  "Nikmati setiap proses dalam perjalanan hidup ini, karena di setiap detiknya ada pelajaran berharga.",
  "Tetaplah tegar meskipun menghadapi cobaan, karena kamu memiliki kemampuan untuk melewatinya.",
  "Apapun yang terjadi, jangan pernah berhenti berusaha dan berdoa, karena harapan selalu ada.",
  "Kita adalah pejuang, dan setiap hari adalah kesempatan untuk menjadi lebih baik dari sebelumnya.",
  "Aku akan selalu mendukungmu, karena kita bersama-sama bisa meraih segala impian.",
  "Masalah datang untuk menguji, tapi kamu lebih kuat dari yang kamu kira.",
  "Usahamu adalah langkah besar menuju masa depan yang lebih cerah, jadi teruslah maju.",
];

console.log(kataPenyemangat);

const listTextButton = [
  "Klik Disini",
  "Klik Lagi",
  "Klik Lagi Lagi",
  "Klik Teruss",
  "Terus Klikkk",
  "Ayo Jangan Nyerah",
  "Dikit Lagi",
  "Sebentar Lagi",
  "Hampir Selesai",
  "Terakhir Nih!",
  "Eaaaa!!",
  "Eaaaaa!!!",
  "Selamat Ulang Tahun Sofia! 🎉",
];

const celebCount = [
  "left-0",
  "left-50",
  "left-100",
  "left-150",
  "left-200",
  "left-250",
  "left-300",
  "left-350",
];

export default function BirthdayWish() {
  const [displayText, setDisplayText] = useState("");
  const [klikCount, setKlikCount] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bgGradient, setBgGradient] = useState("from-purple-400 to-pink-500");
  const [rolling, setRolling] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  const gradients = [
    "from-purple-300 to-pink-500",
    "from-purple-400 to-pink-600",
    "from-purple-500 to-pink-700",
    "from-purple-600 to-pink-800",
    "from-purple-700 to-pink-900",
    "from-purple-400 to-pink-500",
  ];

  const handleClick = () => {
    if (klikCount < listTextButton.length - 1) {
      new Audio(hit).play();
      setKlikCount(klikCount + 1);
      setPosition({
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
      });
      setBgGradient(gradients[klikCount % gradients.length]);
    } else {
      new Audio(getout).play();
    }
  };

  const startTypingAnimation = () => {
    const randomIndex = Math.floor(Math.random() * kataPenyemangat.length);
    const randomText = kataPenyemangat[randomIndex];
    let currentText = "";
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < randomText.length) {
        currentText += randomText[i];
        setDisplayText(currentText);
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
  };

  const showAllMessages = () => {
    // Delay and show each message one by one after "Selamat Ulang Tahun"
    kataPenyemangat.forEach((kata, index) => {
      setTimeout(() => {
        startTypingAnimation(kata);
      }, index * 15000); // Delay each message by 3 seconds
    });
  };

  useEffect(() => {
    if (klikCount === listTextButton.length - 1) {
      setTimeout(() => {
        setPosition({ x: 0, y: 125 });
        setRolling(true);
        showAllMessages();
        new Audio(song).play();
      }, 1000);
    }
  }, [klikCount]);

  return (
    <div
      className={`flex flex-row items-center justify-center min-h-screen bg-gradient-to-r ${bgGradient} relative`}
    >
      {rolling && (
        <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
          <Lottie animationData={fullceleb} loop={false} />
        </div>
      )}
      {rolling &&
        celebCount.map((item, index) => {
          return (
            <div
              key={index}
              className={`absolute -top-30 ${item} right-0 bottom-0 w-60 h-72`}
            >
              <Lottie animationData={celebration} loop={true} />
            </div>
          );
        })}
      {rolling && (
        <motion.div
          className="w-60 h-60 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 overflow-hidden shadow-2xl flex items-center justify-center absolute hover:scale-110 duration-300"
          initial={{ x: "-100vw", y: -50 }}
          animate={{ x: 0, rotate: 360, y: -50 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <img
            src="sofia.jpg"
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      <motion.button
        className="bg-pink-500 text-white py-2 px-4 rounded shadow-2xl cursor-pointer absolute hover:scale-110 duration-300"
        onClick={handleClick}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {listTextButton[klikCount]}
      </motion.button>

      {isEnvelopeOpen ? (
        <EnvelopeOpen  className={`mt-[350px] absolute text-4xl text-white cursor-pointer`} onClick={() =>  setIsMessageOpen(true)} />
      ) : (
        <Envelope
          className={`mt-[350px] absolute text-4xl text-white animate-pulse cursor-pointer ${rolling ? "block" : "hidden"}`}
          onClick={() => {
            setIsMessageOpen(true)
            setIsEnvelopeOpen(true)
          }}
        />
      )}
      
      {isMessageOpen && (
         <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-5">
         <div className="bg-white p-6 rounded-lg shadow-lg text-center w-1/2">
           <h2 className="text-xl font-bold mb-4">Pesan Gak Penting</h2>
           <p className="text-gray-700 mb-4">Terima kasih dan maaf.<span className="font-bold">Sofia Store (SoTo)</span>.
           </p>
           <button onClick={() => setIsMessageOpen(false)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Tutup</button>
         </div>
       </div>
      )}

      <div className="mt-[450px]">
        <motion.div
          className="text-white text-lg font-semibold"
          key={displayText}
        >
          {displayText}
        </motion.div>
      </div>
    </div>
  );
}
