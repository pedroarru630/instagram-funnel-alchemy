import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Check, Lock, AlertTriangle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface ProfileData {
  username: string;
  full_name?: string;
  profile_pic_url: string;
}

const FinalResults = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const storedProfile = sessionStorage.getItem('instagram_profile');
    console.log('Stored profile data:', storedProfile);
    if (storedProfile) {
      const parsed = JSON.parse(storedProfile);
      console.log('Parsed profile data:', parsed);
      setProfileData(parsed);
    }
  }, []);

  // Fallback data if no profile is stored
  const displayName = profileData?.full_name || profileData?.username || "Fernanda";
  const username = profileData?.username || "afelopes";
  const hasValidImage = profileData?.profile_pic_url && profileData.profile_pic_url !== '/placeholder.svg';
  const profileImage = hasValidImage ? profileData.profile_pic_url : "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=200&h=200&fit=crop&crop=face";

  const mainActivities = [
    {
      handle: "@m*********",
      action: "Apagou as mensagens da DM",
      image: "photo-1618160702438-9b02ab6515c9"
    },
    {
      handle: "@f*********",
      action: "Colocou nos melhores amigos",
      image: "photo-1582562124811-c09040d0a901"
    },
    {
      handle: "@j*********",
      action: "Bloqueou e denunciou esse perfil",
      image: "photo-1466721591366-2d5fba72006d"
    },
    {
      handle: "@d*********",
      action: `Passou +52m em chamada de vídeo com ${displayName.toLowerCase()}`,
      image: "photo-1618160702438-9b02ab6515c9"
    }
  ];

  const storyPreviews = [
    {
      image: "photo-1721322800607-8c38375eef04",
      views: "5",
      text: "ram esse story"
    },
    {
      image: "photo-1500673922987-e212871fec22",
      views: "3",
      text: "pausaram por +13s"
    },
    {
      image: "photo-1466721591366-2d5fba72006d",
      views: "7",
      text: "repetiram"
    }
  ];

  const profileVisitors = [
    {
      name: "D*********",
      handle: "d*******",
      image: "photo-1618160702438-9b02ab6515c9"
    },
    {
      name: "J***",
      handle: "jp*******",
      image: "photo-1582562124811-c09040d0a901"
    },
    {
      name: "M***",
      handle: "m*******",
      image: "photo-1466721591366-2d5fba72006d"
    }
  ];

  const closeFriendsStories = [
    { image: "photo-1721322800607-8c38375eef04" },
    { image: "photo-1500673922987-e212871fec22" },
    { image: "photo-1466721591366-2d5fba72006d" }
  ];

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      {/* Progress bar at top */}
      <div className="w-full px-4 pt-4">
        <Progress value={100} className="h-2" />
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 py-6 space-y-8">
        
        {/* SECTION 1 - Principais atividades */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
            Principais atividades<br />detectadas essa semana
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {mainActivities.map((activity, index) => (
              <Card key={index} className="p-4 relative">
                <div className="absolute top-2 right-2">
                  <Lock className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage 
                        src={`https://images.unsplash.com/${activity.image}?w=100&h=100&fit=crop&crop=face`} 
                        alt="Profile" 
                        className="blur-sm"
                      />
                      <AvatarFallback className="text-xs blur-sm">U</AvatarFallback>
                    </Avatar>
                  </div>
                  <p className="text-xs font-medium text-gray-700">{activity.handle}</p>
                  <p className="text-xs text-gray-600 leading-tight">{activity.action}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* SECTION 2 - Prints recuperados */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
            <span className="text-orange-500">Prints</span> recuperados
          </h2>
          
          <p className="text-sm text-gray-600 text-center mb-4">
            Nossa inteligência artificial procurou por<br />
            todo o Instagram atrás de conversas<br />
            no Direct de @{username}
          </p>

          <div className="text-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">4 Prints extraídos</h3>
            <p className="text-sm text-orange-500 font-medium">na DM de @{username}</p>
            <p className="text-xs text-gray-600 mt-1">
              Detectamos várias mensagens com<br />
              cunho sexual e nudez explícita
            </p>
          </div>

          {/* Mock DM Screenshot */}
          <div className="relative mx-auto w-48 h-80 bg-gray-900 rounded-3xl mb-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900">
              <div className="p-4 space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
                  <span className="text-white text-sm">Enviou story de @{username}</span>
                </div>
                <div className="w-full h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg blur-sm"></div>
                <div className="bg-blue-600 text-white text-xs px-3 py-2 rounded-full self-end ml-auto w-fit">
                  Mensagem
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-600 text-center mb-2">...e mais 3 prints semelhantes</p>
          <p className="text-xs text-red-500 text-center mb-4">
            Veja tudo sem censura no<br />relatório completo
          </p>

          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            <Lock className="w-4 h-4 mr-2" />
            Desbloquear prints
          </Button>
        </div>

        {/* SECTION 3 - Dados extras */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">... e mais:</h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl font-bold text-gray-800">10</span>
              <p className="text-sm text-gray-700">
                Seguidores de <span className="font-medium">{displayName.toLowerCase()}</span> possuem<br />
                interesses sexual ❤️
              </p>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl font-bold text-gray-800">6</span>
              <p className="text-sm text-gray-700">
                Conversas de <span className="font-medium">{displayName.toLowerCase()}</span> no Direct<br />
                contêm Nudez 🔥
              </p>
            </div>

            <div className="flex items-start space-x-3 p-3 border-2 border-orange-200 bg-orange-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
              <p className="text-sm text-gray-700">
                Perfis foram <span className="font-medium">restringidos</span> nos<br />
                stories e posts de <span className="font-medium">{displayName.toLowerCase()}</span> 🚫
              </p>
            </div>
          </div>

          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            <Lock className="w-4 h-4 mr-2" />
            Descobrir stalkers
          </Button>
        </div>

        {/* SECTION 4 - Atividade nos Stories */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
            Atividade nos Stories<br />de @{username}
          </h2>

          {/* Stories carousel */}
          <div className="flex space-x-4 mb-4 justify-center">
            {storyPreviews.map((story, index) => (
              <div key={index} className="relative">
                <div className="w-20 h-32 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/${story.image}?w=200&h=300&fit=crop`}
                    alt="Story"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 rounded px-2 py-1">
                    <span className="text-white text-xs font-bold">{story.views}</span>
                  </div>
                </div>
                <p className="text-xs text-center mt-1 text-gray-600">{story.text}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-600 text-center mb-4">
            Veja tudo que acontece nos stories de<br />
            @{username} no relatório completo
          </p>

          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white mb-6">
            Revelar perseguidores
          </Button>

          <h3 className="text-sm font-bold text-center text-gray-800 mb-4">
            Visitaram esse perfil essa semana<br />de 2 à 7 vezes:
          </h3>

          <div className="flex space-x-4 justify-center">
            {profileVisitors.map((visitor, index) => (
              <div key={index} className="text-center">
                <Avatar className="w-16 h-16 mx-auto mb-2">
                  <AvatarImage 
                    src={`https://images.unsplash.com/${visitor.image}?w=100&h=100&fit=crop&crop=face`}
                    alt="Visitor"
                  />
                  <AvatarFallback>{visitor.name[0]}</AvatarFallback>
                </Avatar>
                <p className="text-xs font-medium text-gray-800">{visitor.name}</p>
                <p className="text-xs text-gray-600">{visitor.handle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5 - Análise Concluída */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          {/* Profile section */}
          <div className="flex justify-center mb-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profileImage} alt={displayName} />
              <AvatarFallback className="text-2xl">{displayName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>

          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">{displayName}</h1>
          <p className="text-center text-orange-500 mb-6 font-medium">@{username}</p>

          <h2 className="text-xl font-bold text-center text-gray-800 mb-6">Análise Concluída!</h2>

          {/* Status blocks */}
          <div className="space-y-4 mb-6">
            <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded">
              <p className="text-sm text-green-800">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                6 perfis de <span className="font-medium">São Paulo</span> estão<br />
                acessando esse perfil agora
              </p>
            </div>

            <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded">
              <p className="text-sm text-orange-800">
                <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                10 Stalker's identificados<br />
                na última semana
              </p>
            </div>

            <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
              <div className="flex items-start space-x-2">
                <span className="text-xl">🏆</span>
                <div>
                  <p className="text-sm text-red-800 font-medium mb-2">
                    1 Super Stalker, encontrado!<br />
                    @{username} tem um fã no perfil
                  </p>
                  <p className="text-xs text-red-600 mb-1">Isso não é só mais um stalker!</p>
                  
                  <div className="space-y-1 text-xs text-red-600">
                    <div className="flex items-center space-x-1">
                      <span className="text-red-500">⚠️</span>
                      <span>Esse Super Stalker visitou o perfil de {displayName.toLowerCase()} por 11 dias consecutivos</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-red-500">⚠️</span>
                      <span>3 conversas com chamada de vídeo foram apagadas do direct</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-red-500">⚠️</span>
                      <span>Algumas conversas possuem tom sexual dentro da que podemos mostrar aqui</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-red-500">⚠️</span>
                      <span>{displayName} adicionou esse super stalker</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-red-500">⚠️</span>
                      <span>A interação desse Stalker supera em 11 vezes a interação de seguidor colocado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <p className="text-sm text-red-700 font-medium">Não saia dessa página.</p>
            </div>
          </div>

          <p className="text-xs text-gray-600 text-center mb-2">
            Liberamos apenas UMA PRÉVIA por aparelho.
          </p>

          <div className="flex items-center justify-center space-x-2 text-xs text-gray-600">
            <span>⏰</span>
            <span>Última semana</span>
            <span className="font-medium">18/06 - 25/06</span>
          </div>
        </div>

        {/* SECTION 6 - Close Friends */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">★</span>
            </div>
            <h2 className="text-lg font-bold text-gray-800">Close Friends</h2>
          </div>

          <p className="text-sm text-gray-700 text-center mb-2">
            @f******* e outras 4 pessoas<br />
            adicionou esse perfil nos melhores amigos
          </p>

          <div className="text-center mb-4">
            <button className="text-orange-500 text-sm font-medium">Ver Pessoas &gt;</button>
          </div>

          {/* Close Friends Stories */}
          <div className="flex space-x-3 justify-center mb-4">
            {closeFriendsStories.map((story, index) => (
              <div key={index} className="relative">
                <div className="w-16 h-24 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/${story.image}?w=150&h=200&fit=crop`}
                    alt="Close Friends Story"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">★</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-600 text-center mb-4">
            ...e outras 2 pessoas que não seguem {displayName.toLowerCase()}
          </p>

          <p className="text-xs text-red-500 text-center mb-6">
            Tenha acesso a tudo isso sem<br />
            censuras no relatório completo<br />
            <span className="inline-block mt-1">💎</span>
          </p>

          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            <Eye className="w-4 h-4 mr-2" />
            Ver relatório completo
          </Button>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 mb-1 text-gray-400">📊</div>
            <span className="text-xs text-gray-400">Painel</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 mb-1 text-orange-500">🔍</div>
            <span className="text-xs text-orange-500 font-medium">Espionar</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 mb-1 text-gray-400">🖼️</div>
            <span className="text-xs text-gray-400">Prints</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalResults;
