
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface ProfileData {
  username: string;
  fullName?: string;
  profilePicUrlHD: string;
}

const MeuProprioPerfilInitialResults = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const storedProfile = sessionStorage.getItem('instagram_profile');
    if (storedProfile) {
      const parsed = JSON.parse(storedProfile);
      console.log('MeuProprioPerfilInitialResults - Loaded profile data:', parsed);
      console.log('MeuProprioPerfilInitialResults - profilePicUrlHD:', parsed.profilePicUrlHD);
      setProfileData(parsed);
    } else {
      navigate('/meu-proprio-perfil-input');
    }
  }, [navigate]);

  const handleContinue = () => {
    navigate('/meu-proprio-perfil-final-results');
  };

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const displayName = profileData.fullName || profileData.username;
  const profileImage = profileData.profilePicUrlHD;

  console.log('MeuProprioPerfilInitialResults - Using profileImage:', profileImage);

  const findings = [
    `Foram encontradas 9 menções a @${profileData.username} em mensagens no direct`,
    "Nossa IA conseguiu resgatar alguns prints de conversas falando de você",
    "11 novos stalker's foram identificados na última semana",
    "Você tem um fã! Um stalker está visitando seu perfil por 11 dias consecutivos",
    "3 perfis que não seguem você te adicionaram nos melhores amigos"
  ];

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      {/* Progress bar at top */}
      <div className="w-full px-4 pt-4">
        <Progress value={80} className="h-2" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-lg">
          {/* Profile picture */}
          <div className="flex justify-center mb-6">
            <Avatar className="w-24 h-24">
              {profileImage && (
                <AvatarImage 
                  src={profileImage}
                  alt={displayName}
                  onLoad={() => console.log('MeuProprioPerfilInitialResults - Profile image loaded successfully')}
                  onError={(e) => {
                    console.log('MeuProprioPerfilInitialResults - Profile image failed to load:', profileImage);
                    console.log('MeuProprioPerfilInitialResults - Error details:', e);
                  }}
                />
              )}
              <AvatarFallback className="text-2xl bg-orange-100 text-orange-600">
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Name */}
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Olá {displayName}
          </h1>

          {/* Handle */}
          <p className="text-center text-orange-500 mb-8 font-medium">
            @{profileData.username}
          </p>

          {/* Findings */}
          <div className="space-y-4 mb-8">
            {findings.map((finding, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 text-sm leading-relaxed">
                  {finding}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Button 
            onClick={handleContinue}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            Ver relatório completo
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

export default MeuProprioPerfilInitialResults;
