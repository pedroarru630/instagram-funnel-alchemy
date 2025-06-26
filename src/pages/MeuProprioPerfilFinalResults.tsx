
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProfileData {
  username: string;
  fullName?: string;
  profilePicUrlHD: string;
}

const MeuProprioPerfilFinalResults = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const storedProfile = sessionStorage.getItem('instagram_profile');
    console.log('Stored profile data:', storedProfile);
    if (storedProfile) {
      const parsed = JSON.parse(storedProfile);
      console.log('Parsed profile data:', parsed);
      setProfileData(parsed);
    } else {
      navigate('/meu-proprio-perfil-input');
    }
  }, [navigate]);

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const displayName = profileData.fullName || profileData.username;
  const profileImage = profileData.profilePicUrlHD;

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      {/* Progress bar at top */}
      <div className="w-full px-4 pt-4">
        <Progress value={100} className="h-2" />
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 py-8 space-y-8">
        {/* Analysis completed section */}
        <div className="bg-white rounded-3xl p-8 max-w-md mx-auto shadow-lg">
          <div className="flex justify-center mb-6">
            <Avatar className="w-24 h-24">
              {profileImage && (
                <AvatarImage 
                  src={profileImage} 
                  alt={displayName}
                  onError={(e) => {
                    console.log('Profile image failed to load, using fallback');
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <AvatarFallback className="text-2xl bg-orange-100 text-orange-600">
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Análise Concluída
          </h1>
          
          <p className="text-center text-orange-500 mb-8 font-medium">
            @{profileData.username}
          </p>

          {/* Alert blocks */}
          <div className="space-y-4 mb-8">
            <div className="bg-red-100 border border-red-300 rounded-lg p-4 flex items-center">
              <span className="text-red-600 text-lg mr-3">⚠️</span>
              <div>
                <div className="text-red-800 font-semibold text-sm">ATENÇÃO</div>
                <div className="text-red-700 text-xs">Informações sensíveis encontradas</div>
              </div>
            </div>
            
            <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 flex items-center">
              <span className="text-orange-600 text-lg mr-3">🔍</span>
              <div>
                <div className="text-orange-800 font-semibold text-sm">STALKERS</div>
                <div className="text-orange-700 text-xs">11 perfis te observando constantemente</div>
              </div>
            </div>
          </div>

          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-4 text-lg rounded-xl mb-4">
            Ver Relatório Completo
          </Button>
        </div>

        {/* Stories activity section */}
        <div className="bg-white rounded-3xl p-8 max-w-md mx-auto shadow-lg">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
            Atividade em Stories
          </h2>
          
          <div className="space-y-4">
            <Card className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-gray-800">@marcosilva23</div>
                  <div className="text-gray-500 text-sm">Visualizou 8 stories</div>
                </div>
                <div className="text-orange-500 font-bold text-lg">8x</div>
              </div>
            </Card>
            
            <Card className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-gray-800">@juliana_costa</div>
                  <div className="text-gray-500 text-sm">Visualizou 12 stories</div>
                </div>
                <div className="text-orange-500 font-bold text-lg">12x</div>
              </div>
            </Card>
            
            <Card className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-gray-800">@pedroalmeida</div>
                  <div className="text-gray-500 text-sm">Sempre entre os primeiros</div>
                </div>
                <div className="text-red-500 font-bold text-lg">⚡</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Numbers section */}
        <div className="bg-white rounded-3xl p-8 max-w-md mx-auto shadow-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-500">24</div>
              <div className="text-gray-600 text-sm">Prints</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-500">9</div>
              <div className="text-gray-600 text-sm">Menções</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-500">11</div>
              <div className="text-gray-600 text-sm">Stalkers</div>
            </div>
          </div>
        </div>

        {/* Prints section */}
        <div className="bg-white rounded-3xl p-8 max-w-md mx-auto shadow-lg">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
            Prints Recuperados
          </h2>
          
          <div className="space-y-4 mb-6">
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>

          <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-xl">
            Desbloquear Prints
          </Button>
        </div>

        {/* Main stalkers section */}
        <div className="bg-white rounded-3xl p-8 max-w-md mx-auto shadow-lg">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
            Principais Stalkers
          </h2>
          
          <div className="space-y-4 mb-6">
            <Card className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">@marcosilva23</div>
                  <div className="text-gray-500 text-sm">11 dias consecutivos</div>
                  <div className="text-red-500 text-xs">3 prints recuperados</div>
                </div>
                <div className="text-red-500 font-bold">🔥</div>
              </div>
            </Card>
            
            <Card className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>J</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">@juliana_costa</div>
                  <div className="text-gray-500 text-sm">Te bloqueou mas ainda vê</div>
                  <div className="text-orange-500 text-xs">Perfil oculto</div>
                </div>
                <div className="text-orange-500 font-bold">👁️</div>
              </div>
            </Card>
            
            <Card className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">@pedroalmeida</div>
                  <div className="text-gray-500 text-sm">Sempre primeiro a ver stories</div>
                  <div className="text-purple-500 text-xs">Ex-relacionamento detectado</div>
                </div>
                <div className="text-purple-500 font-bold">💔</div>
              </div>
            </Card>
          </div>

          <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 rounded-xl">
            Revelar Perseguidores
          </Button>
        </div>

        {/* Close Friends section */}
        <div className="bg-white rounded-3xl p-8 max-w-md mx-auto shadow-lg">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
            Close Friends
          </h2>
          
          <p className="text-center text-gray-600 mb-6 text-sm">
            3 perfis que não seguem {displayName} adicionaram aos melhores amigos
          </p>
          
          <div className="flex justify-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-white text-xs">Story</span>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-white text-xs">Story</span>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-white text-xs">Story</span>
            </div>
          </div>

          <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-xl">
            Ver Stories Completos
          </Button>
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

export default MeuProprioPerfilFinalResults;
