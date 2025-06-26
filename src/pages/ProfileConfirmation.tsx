
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

interface ProfileData {
  username: string;
  fullName?: string;
  profilePicUrlHD: string;
  exists: boolean;
}

const ProfileConfirmation = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    console.log('=== PROFILE CONFIRMATION PAGE - OTHER PEOPLE ===');
    const storedProfile = sessionStorage.getItem('other_instagram_profile');
    console.log('Raw stored profile from sessionStorage:', storedProfile);
    
    if (storedProfile) {
      const parsed = JSON.parse(storedProfile);
      console.log('Parsed profile data:', JSON.stringify(parsed, null, 2));
      console.log('parsed.profilePicUrlHD:', parsed.profilePicUrlHD);
      console.log('parsed.profilePicUrlHD type:', typeof parsed.profilePicUrlHD);
      console.log('parsed.username:', parsed.username);
      console.log('parsed.fullName:', parsed.fullName);
      console.log('parsed.exists:', parsed.exists);
      setProfileData(parsed);
    } else {
      console.log('No profile data found in sessionStorage, redirecting to input');
      navigate('/perfil-outras-pessoas');
    }
  }, [navigate]);

  const handleContinue = () => {
    navigate('/results');
  };

  const handleCorrect = () => {
    // Clear stored data and go back to input
    sessionStorage.removeItem('other_instagram_username');
    sessionStorage.removeItem('other_instagram_profile');
    navigate('/perfil-outras-pessoas');
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

  console.log('=== PROFILE CONFIRMATION RENDER DATA ===');
  console.log('displayName:', displayName);
  console.log('profileImage:', profileImage);
  console.log('profileImage type:', typeof profileImage);

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
                  onLoad={() => console.log('ProfileConfirmation - Profile image loaded successfully:', profileImage)}
                  onError={(e) => {
                    console.log('ProfileConfirmation - Profile image failed to load:', profileImage);
                    console.log('ProfileConfirmation - Error details:', e);
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
            {displayName}
          </h1>

          {/* Handle */}
          <p className="text-center text-orange-500 mb-8 font-medium">
            @{profileData.username}
          </p>

          {/* Question */}
          <p className="text-center text-gray-700 mb-8 font-medium">
            O instagram está correto?
          </p>

          {/* Continue button */}
          <Button 
            onClick={handleContinue}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-4 text-lg rounded-xl mb-4"
          >
            Continuar, está correto!
          </Button>

          {/* Correct option */}
          <div className="flex justify-center">
            <button 
              onClick={handleCorrect}
              className="text-gray-600 hover:text-gray-800 font-medium flex items-center"
            >
              ← Corrigir
            </button>
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

export default ProfileConfirmation;
