
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      {/* Progress bar at top */}
      <div className="w-full px-4 pt-4">
        <Progress value={20} className="h-2" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-lg">
          {/* Central icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center">
              <div className="text-white text-2xl">
                🕵️
              </div>
            </div>
          </div>

          {/* Main title */}
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Descubra em 1 minuto
          </h1>

          {/* Subtitle */}
          <p className="text-center text-gray-600 mb-2">
            Todas as informações que
          </p>
          <p className="text-center text-gray-600 mb-8">
            o instagram esconde de você.
          </p>

          {/* Question */}
          <p className="text-center text-gray-700 mb-6 font-medium">
            Qual perfil você quer investigar?
          </p>

          {/* Buttons */}
          <div className="space-y-4">
            <Button 
              onClick={() => navigate('/meu-proprio-perfil')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-4 text-lg rounded-xl"
            >
              <User className="mr-2" size={20} />
              Meu próprio perfil
            </Button>

            <Button 
              onClick={() => navigate('/perfil-outras-pessoas')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-4 text-lg rounded-xl"
            >
              <User className="mr-2" size={20} />
              Perfil de outras pessoas
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 mb-1 text-gray-400">
              📊
            </div>
            <span className="text-xs text-gray-400">Painel</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 mb-1 text-orange-500">
              🔍
            </div>
            <span className="text-xs text-orange-500 font-medium">Espionar</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 mb-1 text-gray-400">
              🖼️
            </div>
            <span className="text-xs text-gray-400">Prints</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
