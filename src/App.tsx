
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MeuProprioPerfil from "./pages/MeuProprioPerfil";
import MeuProprioPerfilInput from "./pages/MeuProprioPerfilInput";
import MeuProprioPerfilLoading from "./pages/MeuProprioPerfilLoading";
import MeuProprioPerfilConfirmation from "./pages/MeuProprioPerfilConfirmation";
import MeuProprioPerfilInitialResults from "./pages/MeuProprioPerfilInitialResults";
import MeuProprioPerfilFinalResults from "./pages/MeuProprioPerfilFinalResults";
import PerfilOutrasPessoas from "./pages/PerfilOutrasPessoas";
import Loading from "./pages/Loading";
import ProfileConfirmation from "./pages/ProfileConfirmation";
import Results from "./pages/Results";
import FinalResults from "./pages/FinalResults";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/meu-proprio-perfil" element={<MeuProprioPerfil />} />
          <Route path="/meu-proprio-perfil-input" element={<MeuProprioPerfilInput />} />
          <Route path="/meu-proprio-perfil-loading" element={<MeuProprioPerfilLoading />} />
          <Route path="/meu-proprio-perfil-confirmation" element={<MeuProprioPerfilConfirmation />} />
          <Route path="/meu-proprio-perfil-initial-results" element={<MeuProprioPerfilInitialResults />} />
          <Route path="/meu-proprio-perfil-final-results" element={<MeuProprioPerfilFinalResults />} />
          <Route path="/perfil-outras-pessoas" element={<PerfilOutrasPessoas />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/profile-confirmation" element={<ProfileConfirmation />} />
          <Route path="/results" element={<Results />} />
          <Route path="/final-results" element={<FinalResults />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
