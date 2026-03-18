import Header from "./components/Header";
import Hero from "./components/Hero";
import TrustBadges from "./components/TrustBadges";
import ProblemGrid from "./components/ProblemGrid";
import ServiceSelector from "./components/ServiceSelector";
import PricingTable from "./components/PricingTable";
import SampleCards from "./components/SampleCards";
import ReasonList from "./components/ReasonList";
import Scope from "./components/Scope";
import DiagBanner from "./components/DiagBanner";
import Flow from "./components/Flow";
import FAQ from "./components/FAQ";
import Fit from "./components/Fit";
import About from "./components/About";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import BottomBar from "./components/BottomBar";

export default function App() {
  return (
    <div
      style={{
        fontFamily: "'Noto Sans JP','Hiragino Sans','Yu Gothic',sans-serif",
        color: "#222",
        overflowX: "hidden",
      }}
    >
      <Header />
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
      <FinalCTA />
      <Footer />
      <BottomBar />
    </div>
  );
}
