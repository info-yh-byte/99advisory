import Hero from "@/components/home/Hero";
import TrustBadges from "@/components/home/TrustBadges";
import ProblemGrid from "@/components/home/ProblemGrid";
import ServiceSelector from "@/components/home/ServiceSelector";
import PricingTable from "@/components/home/PricingTable";
import SampleCards from "@/components/home/SampleCards";
import ReasonList from "@/components/home/ReasonList";
import Scope from "@/components/home/Scope";
import DiagBanner from "@/components/home/DiagBanner";
import Flow from "@/components/home/Flow";
import FAQ from "@/components/home/FAQ";
import Fit from "@/components/home/Fit";
import About from "@/components/home/About";
import LatestArticles from "@/components/home/LatestArticles";
import FinalCTA from "@/components/home/FinalCTA";
import BottomBar from "@/components/home/BottomBar";

export const metadata = {
  title: "九十九アドバイザリー | 中小企業向け 経営判断の伴走支援",
  description:
    "決算書や試算表を見ているのに、次の一手に自信が持てない。資金繰り・返済余力・広告費の回収など、経営判断の材料を見える形に整えます。初回30分無料。",
};

export default function HomePage() {
  return (
    <div style={{ color: "#222", overflowX: "hidden" }}>
      <Hero />
      <TrustBadges />
      <ProblemGrid />
      <ServiceSelector />
      <PricingTable />
      <SampleCards />
      <ReasonList />
      <Scope />
      <DiagBanner />
      <Flow />
      <FAQ />
      <Fit />
      <About />
      <LatestArticles />
      <FinalCTA />
      <BottomBar />
    </div>
  );
}
