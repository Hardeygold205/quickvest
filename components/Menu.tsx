import Link from "next/link";
import {
  FaWallet,
  FaHandHoldingUsd,
  FaBookOpen,
  FaUsers,
  FaGift,
  FaUserFriends,
  FaHandshake,
  FaCommentDots,
} from "react-icons/fa";

const iconData = [
  { label: "Recharge", icon: <FaWallet />, link: "/recharge" },
  { label: "Withdraw", icon: <FaHandHoldingUsd />, link: "/withdraw" },
  { label: "Help", icon: <FaBookOpen />, link: "/help" },
  { label: "Team", icon: <FaUsers />, link: "/team" },
  { label: "Activity", icon: <FaGift />, link: "/activity" },
  { label: "Invite Friends", icon: <FaUserFriends />, link: "/invites" },
  { label: "Agent Cooperation", icon: <FaHandshake />, link: "/cooperation" },
  { label: "News", icon: <FaCommentDots />, link: "/news" },
  { label: "More", icon: <FaCommentDots />, link: "/more" },
];

export default function Menu() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 py-6 rounded-xl gap-6">
      <div className="md:col-span-2 flex flex-col justify-between gap-4">
        <div className="rounded-xl border border-zinc-400 shadow-inner h-40 bg-gradient-to-br from-gray-700 to-green-900">
          <h1 className="text-2xl font-extrabold p-2">Total Asset</h1>
          <h1 className="text-4xl p-2 font-extrabold">$ 100.00 USDT</h1>
        </div>
        <div className="rounded-xl border border-zinc-400 shadow-inner h-40 bg-gradient-to-br from-gray-700 to-green-900"></div>
      </div>
      <div className="md:col-span-3 gap-4">
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-3 gap-10">
          {iconData.map(({ label, icon, link }, idx) => (
            <Link
              href={link}
              key={idx}
              className="flex flex-col items-center text-center gap-2">
              <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700 shadow-inner">
                <div className="text-lime-400 text-2xl">{icon}</div>
              </div>
              <span className="text-sm text-white">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
