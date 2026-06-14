import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TranslationProvider } from "./context/TranslationContext";

import MainAppContent from "./MainAppContext";
import StadiumList from "./components/StadiumList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function TerrainsPage() {
  return (
    <>
      <Navbar
        onEnterAdmin={() => {}}
        onEnterOwner={() => {}}
      />
      <StadiumList />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <TranslationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainAppContent />} />
          <Route path="/terrains" element={<TerrainsPage />} />
        </Routes>
      </BrowserRouter>
    </TranslationProvider>
  );
}