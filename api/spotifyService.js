import axios from "axios"

const clientId = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID
const clientSecret = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET
console.log("id: ", clientId)
console.log("client secret: ", clientSecret)

// Function to get an access token from Spotify
const fetchAccessToken = async () => {
    const credentials = `${clientId}:${clientSecret}`;
    const encodedCredentials = btoa(credentials); // base64 encode client_id:client_secret
  
    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', 
        'grant_type=client_credentials', 
        {
          headers: {
            'Authorization': `Basic ${encodedCredentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
      );
  
      return response.data.access_token;
    } catch (error) {
      console.error('Error fetching access token:', error);
      throw error;
    }
  };
  
  // Function to fetch farming-related podcasts
  export const fetchFarmingPodcasts = async () => {
    const accessToken = await fetchAccessToken(); 
    const query = 'farming'; 
  
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${query}&type=show`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        }
      );
      return response.data.shows.items; // Return list of podcasts
    } catch (error) {
      console.error('Error fetching podcasts:', error);
      throw error;
    }
  };