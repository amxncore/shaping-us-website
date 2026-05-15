import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import About from "./pages/About";
import Speakers from "./pages/Speakers";
import Venue from "./pages/Venue";
import Team from "./pages/Team";
import Sponsors from "./pages/Sponsors";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/theme-provider";
import AIChatWidget from "./components/AIChatWidget";

// Lazy loaded pages
const Gallery = lazy(() => import("./pages/Gallery"));

const queryClient = new QueryClient();

const basename = import.meta.env.BASE_URL;

const LoadingFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-muted-foreground text-sm font-body">Loading...</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Sonner />
        <AIChatWidget />
        <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/venue" element={<Venue />} />
          <Route
            path="/gallery"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Gallery />
              </Suspense>
            }
          />
          <Route path="/team" element={<Team />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
