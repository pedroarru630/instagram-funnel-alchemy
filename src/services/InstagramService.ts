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
  // Additional possible nested structures
  owner?: any;
  graphql?: any;
  data?: any;
}

export class InstagramService {
  private static APIFY_API_URL = 'https://api.apify.com/v2/actor-tasks/chatty_coaster~instagram-scraper-task/run-sync?token=apify_api_Tk435sUb2WnBllXsxxfNQaBLkHSZyz0HLRCO';

  static async getProfile(username: string): Promise<InstagramProfile> {
    try {
      console.log('🔍 Fetching Instagram profile for:', username);
      
      const cleanUsername = username.replace('@', '');
      
      // Updated configuration with RESIDENTIAL proxy group
      const debugConfiguration = {
        search: cleanUsername,
        searchType: "user",
        searchLimit: 1,
        resultsType: "details",
        resultsLimit: 1,
        addParentData: true,
        proxy: {
          useApifyProxy: true,
          apifyProxyGroups: ["RESIDENTIAL"]
        }
      };

      console.log('🧪 DEBUGGING - Sending this configuration to Apify:', JSON.stringify(debugConfiguration, null, 2));
      
      const response = await fetch(this.APIFY_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(debugConfiguration)
      });

      if (!response.ok) {
        console.log('❌ Response not OK:', response.status, response.statusText);
        const errorText = await response.text();
        console.log('❌ Error response body:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const responseJson = await response.json();
      
      // 🔴 Debug Log #1: After fetching and before parsing
      console.log("🔴 Raw Apify JSON:", responseJson);
      console.log("🔴 Raw Apify JSON (stringified):", JSON.stringify(responseJson, null, 2));
      
      // Parse the response and extract profile data
      const profileData = this.parseApifyResponse(responseJson, cleanUsername);
      
      // 🟢 Debug Log #2: Immediately after parsing
      console.log("🟢 Parsed Profile Data:", profileData);
      console.log("🟢 Parsed Profile Data (stringified):", JSON.stringify(profileData, null, 2));
      
      if (profileData && profileData.exists) {
        console.log('✅ FINAL PARSED PROFILE DATA:', JSON.stringify(profileData, null, 2));
        return profileData;
      }

      // If no profile data found, return basic profile with placeholder
      console.log('⚠️ No profile data found, returning placeholder');
      const placeholderProfile = {
        username: cleanUsername,
        fullName: cleanUsername,
        profilePicUrlHD: `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanUsername)}&size=400&background=fb923c&color=ffffff&bold=true`,
        exists: true
      };
      
      // 🟢 Debug Log #2a: Placeholder profile data
      console.log("🟢 Placeholder Profile Data:", placeholderProfile);
      console.log("🟢 Placeholder Profile Data (stringified):", JSON.stringify(placeholderProfile, null, 2));
      
      return placeholderProfile;
      
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
    console.log('🔧 PARSING - Starting to parse response for username:', username);
    
    // Function to extract profile data from an object
    const extractProfileData = (obj: any, path: string = 'root'): Partial<InstagramProfile> | null => {
      if (!obj) {
        console.log(`🔧 PARSING - Object at ${path} is null/undefined`);
        return null;
      }
      
      console.log(`🔧 PARSING - Checking object at ${path}:`, JSON.stringify(obj, null, 2));
      
      // Look for direct profile fields
      const possibleFields = {
        username: obj.username || obj.user_name || obj.handle,
        fullName: obj.fullName || obj.full_name || obj.displayName || obj.display_name || obj.name,
        profilePicUrlHD: obj.profilePicUrlHD || obj.profile_pic_url_hd || obj.profilePicUrl || obj.profile_pic_url || obj.avatar || obj.picture
      };

      console.log(`🔧 PARSING - Extracted fields from ${path}:`, possibleFields);

      // If we found any profile data, return it
      if (possibleFields.username || possibleFields.profilePicUrlHD) {
        console.log(`✅ PARSING - Found profile data at ${path}`);
        return possibleFields;
      }
      
      // Check nested structures
      const nestedPaths = [
        { key: 'owner', path: `${path}.owner` },
        { key: 'user', path: `${path}.user` },
        { key: 'graphql.user', path: `${path}.graphql.user` },
        { key: 'data', path: `${path}.data` },
        { key: 'profile', path: `${path}.profile` },
        { key: 'userInfo', path: `${path}.userInfo` }
      ];

      for (const nested of nestedPaths) {
        const nestedObj = nested.key.includes('.') ? 
          nested.key.split('.').reduce((o, k) => o?.[k], obj) : 
          obj[nested.key];
          
        if (nestedObj) {
          console.log(`🔍 PARSING - Found nested object at ${nested.path}`);
          const result = extractProfileData(nestedObj, nested.path);
          if (result) return result;
        }
      }
      
      console.log(`❌ PARSING - No profile data found in ${path}`);
      return null;
    };

    // Handle array response
    if (Array.isArray(responseJson)) {
      console.log('🔧 PARSING - Processing array response');
      
      for (let i = 0; i < responseJson.length; i++) {
        const item = responseJson[i];
        const extracted = extractProfileData(item, `array[${i}]`);
        if (extracted && (extracted.username || extracted.profilePicUrlHD)) {
          return {
            username: extracted.username || username,
            fullName: extracted.fullName || extracted.username || username,
            profilePicUrlHD: extracted.profilePicUrlHD || '',
            exists: true
          };
        }
      }
    } else {
      // Handle direct object response
      const extracted = extractProfileData(responseJson, 'direct');
      if (extracted && (extracted.username || extracted.profilePicUrlHD)) {
        return {
          username: extracted.username || username,
          fullName: extracted.fullName || extracted.username || username,
          profilePicUrlHD: extracted.profilePicUrlHD || '',
          exists: true
        };
      }
    }

    // If we have urlsFromSearch, profile exists but no detailed data
    if (responseJson.urlsFromSearch && responseJson.urlsFromSearch.length > 0) {
      console.log('🔗 PARSING - Found urlsFromSearch but no detailed profile data');
      console.log('🔗 PARSING - URLs found:', responseJson.urlsFromSearch);
      return {
        username: username,
        fullName: username,
        profilePicUrlHD: '',
        exists: true
      };
    }

    console.log('❌ PARSING - No profile data found anywhere in response');
    return null;
  }
}
