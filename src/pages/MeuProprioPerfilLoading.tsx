import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { InstagramService } from "@/services/InstagramService";

const MeuProprioPerfilLoading = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const username = sessionStorage.getItem('instagram_username');
      
      console.log('=== MY OWN PROFILE FLOW START ===');
      console.log('Username from sessionStorage:', username);
      
      if (!username) {
        console.log('No username found, redirecting to input page');
        navigate('/meu-proprio-perfil-input');
        return;
      }

      try {
        console.log('Starting Instagram profile fetch for:', username);
        const profileData = await InstagramService.getProfile(username);
        
        console.log('=== PROFILE DATA RECEIVED FROM SERVICE ===');
        console.log('Full profileData object:', JSON.stringify(profileData, null, 2));
        console.log('profileData.exists:', profileData.exists);
        console.log('profileData.username:', profileData.username);
        console.log('profileData.fullName:', profileData.fullName);
        console.log('profileData.profilePicUrlHD:', profileData.profilePicUrlHD);
        console.log('profilePicUrlHD type:', typeof profileData.profilePicUrlHD);
        
        if (profileData.exists) {
          console.log('Profile exists, storing in sessionStorage');
          sessionStorage.setItem('instagram_profile', JSON.stringify(profileData));
          
          // Verify what was stored
          const stored = sessionStorage.getItem('instagram_profile');
          console.log('=== STORED IN SESSION STORAGE ===');
          console.log('Stored data:', stored);
          console.log('Parsed stored data:', JSON.parse(stored || '{}'));
          
          console.log('Profile found, redirecting to confirmation');
          navigate('/meu-proprio-perfil-confirmation');
        } else {
          console.log('Profile not found, redirecting back to input');
          setError('Perfil não encontrado. Tente novamente.');
          setTimeout(() => {
            navigate('/meu-proprio-perfil-input');
          }, 3000);
        }
      } catch (error) {
        console.error('=== ERROR IN MY OWN PROFILE FETCH ===');
        console.error('Error details:', error);
        setError('Erro ao buscar perfil. Tente novamente.');
        setTimeout(() => {
          navigate('/meu-proprio-perfil-input');
        }, 3000);
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      {/* Progress bar at top */}
      <div className="w-full px-4 pt-4">
        <Progress value={40} className="h-2" />
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

          {/* Loading spinner */}
          {!error && (
            <div className="flex justify-center mb-6">
              <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="flex justify-center mb-6">
              <div className="text-red-500 text-2xl">❌</div>
            </div>
          )}

          {/* Main title */}
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
            {error ? 'Erro' : 'Procurando...'}
          </h1>

          {/* Subtitle */}
          <p className="text-center text-gray-600 leading-relaxed">
            {error || 'Nossos robôs estão procurando informações sobre esse perfil, aguarde um momento'}
          </p>
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

export default MeuProprioPerfilLoading;
