
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
      
      // More targeted configurations to get actual profile data
      const configurations = [
        // Configuration 1: Direct URL scraping for detailed profile data
        {
          search: `https://www.instagram.com/${cleanUsername}/`,
          searchType: "user",
          searchLimit: 3,
          resultsType: "details",
          resultsLimit: 3,
          addParentData: true,
          enhanceUserSearchWithFacebookPage: true,
          includeHasStories: true,
          includeHasHighlights: true,
          includeRecentPosts: true,
          extendOutputFunction: `async ({ data, item, page, request, customData }) => {
            return {
              ...data,
              directProfileData: true
            };
          }`,
          proxy: {
            useApifyProxy: true,
            apifyProxyGroups: ["RESIDENTIAL"]
          }
        },
        // Configuration 2: Username search with enhanced data extraction
        {
          search: cleanUsername,
          searchType: "user", 
          searchLimit: 5,
          resultsType: "details",
          resultsLimit: 5,
          addParentData: true,
          enhanceUserSearchWithFacebookPage: false,
          includeHasStories: true,
          includeHasHighlights: true,
          includeRecentPosts: true,
          extendOutputFunction: `async ({ data, item, page, request, customData }) => {
            // Try to extract profile data from various possible locations
            const profileData = data || item || {};
            return {
              ...profileData,
              searchBasedData: true
            };
          }`,
          proxy: {
            useApifyProxy: true,
            apifyProxyGroups: ["RESIDENTIAL"]
          }
        },
        // Configuration 3: Posts search to get profile owner data
        {
          search: cleanUsername,
          searchType: "user",
          searchLimit: 1,
          resultsType: "posts",
          resultsLimit: 1,
          addParentData: true,
          proxy: {
            useApifyProxy: true,
            apifyProxyGroups: ["DATACENTER"]
          }
        }
      ];

      for (let i = 0; i < configurations.length; i++) {
        console.log(`📡 Trying configuration ${i + 1}:`, configurations[i]);
        
        try {
          const response = await fetch(this.APIFY_API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(configurations[i])
          });

          if (!response.ok) {
            console.log(`❌ Configuration ${i + 1} failed with status:`, response.status);
            const errorText = await response.text();
            console.log(`❌ Error response:`, errorText);
            continue;
          }

          const responseJson = await response.json();
          console.log(`🔍 Configuration ${i + 1} Full Response:`, JSON.stringify(responseJson, null, 2));

          // Parse the response and extract profile data
          const profileData = this.parseApifyResponse(responseJson, cleanUsername);
          
          if (profileData && profileData.exists && profileData.profilePicUrlHD && !profileData.profilePicUrlHD.includes('ui-avatars.com')) {
            console.log('✅ Found detailed profile data with real image:', profileData);
            return profileData;
          } else if (profileData && profileData.exists) {
            console.log('⚠️ Found profile data but no real image, continuing to try other configurations');
          }
        } catch (configError) {
          console.log(`❌ Configuration ${i + 1} threw error:`, configError);
          continue;
        }
      }

      // If no configuration worked with detailed data, return basic profile
      console.log('⚠️ No detailed profile data found, returning basic profile');
      return {
        username: cleanUsername,
        fullName: cleanUsername,
        profilePicUrlHD: `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanUsername)}&size=400&background=fb923c&color=ffffff&bold=true`,
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
    console.log('🔧 Response type:', typeof responseJson);
    console.log('🔧 Response keys:', Object.keys(responseJson || {}));
    
    // Function to extract profile data from an object
    const extractProfileData = (obj: any): Partial<InstagramProfile> | null => {
      if (!obj) return null;
      
      console.log('🔍 Extracting from object:', obj);
      
      // Direct properties
      if (obj.username || obj.profilePicUrlHD || obj.fullName) {
        return {
          username: obj.username,
          fullName: obj.fullName,
          profilePicUrlHD: obj.profilePicUrlHD || obj.profilePicUrl
        };
      }
      
      // Check owner property (common in Instagram API responses)
      if (obj.owner) {
        console.log('🔍 Found owner data:', obj.owner);
        return {
          username: obj.owner.username,
          fullName: obj.owner.full_name || obj.owner.fullName,
          profilePicUrlHD: obj.owner.profile_pic_url_hd || obj.owner.profilePicUrlHD || obj.owner.profile_pic_url
        };
      }
      
      // Check graphql structure (another common Instagram structure)
      if (obj.graphql && obj.graphql.user) {
        console.log('🔍 Found graphql user data:', obj.graphql.user);
        const user = obj.graphql.user;
        return {
          username: user.username,
          fullName: user.full_name || user.fullName,
          profilePicUrlHD: user.profile_pic_url_hd || user.profilePicUrlHD || user.profile_pic_url
        };
      }
      
      // Check user property
      if (obj.user) {
        console.log('🔍 Found user data:', obj.user);
        return {
          username: obj.user.username,
          fullName: obj.user.full_name || obj.user.fullName,
          profilePicUrlHD: obj.user.profile_pic_url_hd || obj.user.profilePicUrlHD || obj.user.profile_pic_url
        };
      }
      
      return null;
    };

    // Handle array response
    if (Array.isArray(responseJson) && responseJson.length > 0) {
      console.log('📋 Processing array response with', responseJson.length, 'items');
      
      for (let i = 0; i < responseJson.length; i++) {
        const item = responseJson[i];
        console.log(`📋 Processing item ${i}:`, item);
        
        const extracted = extractProfileData(item);
        if (extracted && (extracted.username || extracted.profilePicUrlHD)) {
          return {
            username: extracted.username || username,
            fullName: extracted.fullName || extracted.username || username,
            profilePicUrlHD: extracted.profilePicUrlHD || '',
            exists: true
          };
        }
      }
    }

    // Handle direct object response
    const extracted = extractProfileData(responseJson);
    if (extracted && (extracted.username || extracted.profilePicUrlHD)) {
      console.log('📋 Direct object extraction successful:', extracted);
      return {
        username: extracted.username || username,
        fullName: extracted.fullName || extracted.username || username,
        profilePicUrlHD: extracted.profilePicUrlHD || '',
        exists: true
      };
    }

    // Handle nested structures - check common nested keys
    const possibleKeys = ['data', 'results', 'profiles', 'users', 'items', 'posts'];
    for (const key of possibleKeys) {
      if (responseJson[key]) {
        console.log(`🔍 Checking nested key: ${key}`);
        const nestedData = Array.isArray(responseJson[key]) ? responseJson[key] : [responseJson[key]];
        
        for (const item of nestedData) {
          const extracted = extractProfileData(item);
          if (extracted && (extracted.username || extracted.profilePicUrlHD)) {
            console.log(`📋 Found data in ${key}:`, extracted);
            return {
              username: extracted.username || username,
              fullName: extracted.fullName || extracted.username || username,
              profilePicUrlHD: extracted.profilePicUrlHD || '',
              exists: true
            };
          }
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
