import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Swamiji from "./pages/Swamiji";
import Seva from "./pages/Seva";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Trust from "./pages/Trust";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";
import Quotes from "./pages/Quotes";
import Mangalarati from "./pages/Mangalarati";
import NotFound from "./pages/NotFound";
import CharitreIndex from "./pages/CharitreIndex";
import CharitreReader from "./pages/CharitreReader";

import { useImageProtection } from "./hooks/useImageProtection";

const queryClient = new QueryClient();

const App = () => {
  useImageProtection();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/swamiji" element={<Swamiji />} />
            <Route path="/swamiji/charitre/kannada" element={<CharitreIndex />} />
            <Route path="/swamiji/charitre/kannada/chapter/:id" element={<CharitreReader />} />
            <Route path="/seva" element={<Seva />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/trust" element={<Trust />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/quotes" element={<Quotes />} />
            <Route path="/mangalarati" element={<Mangalarati />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
