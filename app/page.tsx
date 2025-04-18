import Backers from "@/components/Backers";
import CryptoData from "@/components/CryptoData";
import HeroSection from "@/components/HeroSection";
import Menu from "@/components/Menu";
import Tasks from "@/components/Tasks";
import VideoAdds from "@/components/VideoAdds";
import WithdrawRecords from "@/components/WithdrawRecords";

export default function Home() {
  return (
    <div className="w-full mx-auto max-w-7xl p-1 ">
      <HeroSection />
      <Menu />
      <Tasks />
      <VideoAdds />
      <WithdrawRecords />
      <CryptoData />
      <Backers />
    </div>
  );
}
