
interface InstagramProfile {
  username: string;
  fullName?: string;
  profilePicUrlHD: string;
  exists: boolean;
}

interface ApifyResponse {
  username?: string;
  fullName?: string;
  profilePicUrlHD?: string;
  profilePicUrl?: string;
  biography?: string;
  followersCount?: number;
  followingCount?: number;
  postsCount?: number;
  isPrivate?: boolean;
  isVerified?: boolean;
  url?: string;
  urlsFromSearch?: string[];
}

export class InstagramService {
  private static APIFY_API_URL = 'https://api.apify.com/v2/actor-tasks/chatty_coaster~instagram-scraper-task/run-sync?token=apify_api_Tk435sUb2WnBllXsxxfNQaBLkHSZyz0HLRCO';

  static async getProfile(username: string): Promise<InstagramProfile> {
    try {
      console.log('🔍 Fetching Instagram profile for:', username);
      
      const cleanUsername = username.replace('@', '');
      
      // Try different configurations to get detailed data
      const configurations = [
        {
          search: cleanUsername,
          searchType: "user",
          searchLimit: 1,
          resultsType: "details",
          resultsLimit: 1,
          addParentData: true,
          enhanceUserSearchWithFacebookPage: true,
          isUserReelFeedURL: false,
          isUserTaggedFeedURL: false,
          extendOutputFunction: "",
          extendScraperFunction: "",
          customMapFunction: "",
          proxy: {
            useApifyProxy: true,
            apifyProxyGroups: ["RESIDENTIAL"]
          }
        },
        {
          search: `https://www.instagram.com/${cleanUsername}/`,
          searchType: "user",
          searchLimit: 1,
          resultsType: "details",
          resultsLimit: 1,
          addParentData: true,
          enhanceUserSearchWithFacebookPage: false,
          proxy: {
            useApifyProxy: true,
            apifyProxyGroups: ["RESIDENTIAL"]
          }
        }
      ];

      for (let i = 0; i < configurations.length; i++) {
        console.log(`📡 Trying configuration ${i + 1}:`, configurations[i]);
        
        const response = await fetch(this.APIFY_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(configurations[i])
        });

        if (!response.ok) {
          console.log(`❌ Configuration ${i + 1} failed with status:`, response.status);
          continue;
        }

        const responseJson = await response.json();
        console.log(`🔍 Configuration ${i + 1} Response:`, JSON.stringify(responseJson, null, 2));

        // Parse the response and extract profile data
        const profileData = this.parseApifyResponse(responseJson, cleanUsername);
        
        if (profileData && profileData.exists && (profileData.profilePicUrlHD || profileData.fullName !== cleanUsername)) {
          console.log('✅ Found detailed profile data:', profileData);
          return profileData;
        }
      }

      // If no configuration worked, return basic profile
      console.log('⚠️ No detailed data found, returning basic profile');
      return {
        username: cleanUsername,
        fullName: cleanUsername,
        profilePicUrlHD: '',
        exists: true
      };
      
    } catch (error) {
      console.error('💥 Error fetching Instagram profile:', error);
      return {
        username: username.replace('@', ''),
        fullName: undefined,
        profilePicUrlHD: '',
        exists: false
      };
    }
  }

  private static parseApifyResponse(responseJson: any, username: string): InstagramProfile | null {
    console.log('🔧 Parsing Apify response...');
    
    // Handle array response
    if (Array.isArray(responseJson) && responseJson.length > 0) {
      const data = responseJson[0] as ApifyResponse;
      console.log('📋 Array response data:', data);
      
      if (data.username || data.profilePicUrlHD || data.fullName) {
        return {
          username: data.username || username,
          fullName: data.fullName || data.username || username,
          profilePicUrlHD: data.profilePicUrlHD || data.profilePicUrl || '',
          exists: true
        };
      }
    }

    // Handle direct object response
    const data = responseJson as ApifyResponse;
    if (data.username || data.profilePicUrlHD || data.fullName) {
      console.log('📋 Object response data:', data);
      return {
        username: data.username || username,
        fullName: data.fullName || data.username || username,
        profilePicUrlHD: data.profilePicUrlHD || data.profilePicUrl || '',
        exists: true
      };
    }

    // Handle nested structures - sometimes data is nested deeper
    if (responseJson.items && Array.isArray(responseJson.items)) {
      for (const item of responseJson.items) {
        if (item.username || item.profilePicUrlHD || item.fullName) {
          console.log('📋 Nested items data:', item);
          return {
            username: item.username || username,
            fullName: item.fullName || item.username || username,
            profilePicUrlHD: item.profilePicUrlHD || item.profilePicUrl || '',
            exists: true
          };
        }
      }
    }

    // Check for other possible nested structures
    const possibleKeys = ['data', 'results', 'profiles', 'users'];
    for (const key of possibleKeys) {
      if (responseJson[key]) {
        const nestedData = Array.isArray(responseJson[key]) ? responseJson[key][0] : responseJson[key];
        if (nestedData && (nestedData.username || nestedData.profilePicUrlHD || nestedData.fullName)) {
          console.log(`📋 Found data in ${key}:`, nestedData);
          return {
            username: nestedData.username || username,
            fullName: nestedData.fullName || nestedData.username || username,
            profilePicUrlHD: nestedData.profilePicUrlHD || nestedData.profilePicUrl || '',
            exists: true
          };
        }
      }
    }

    // If we have urlsFromSearch, profile exists but no detailed data
    if (responseJson.urlsFromSearch && responseJson.urlsFromSearch.length > 0) {
      console.log('🔗 Found urlsFromSearch but no detailed data');
      return {
        username: username,
        fullName: username,
        profilePicUrlHD: '',
        exists: true
      };
    }

    console.log('❌ No profile data found in response');
    return null;
  }
}
