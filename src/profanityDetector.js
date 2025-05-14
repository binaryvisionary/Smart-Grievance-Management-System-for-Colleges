const checkForProfanity = async (text) => {
    try {
      if (!text || text.trim() === '') {
        return { containsProfanity: false };
      }
  
      const response = await fetch(
        "https://profanitycheck-llq4uy2eba-uc.a.run.app",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }), // match how your Firebase function expects input
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Firebase Function API error:", response.status, errorText);
        throw new Error(`API Error: ${response.status} ${errorText}`);
      }
  
      const result = await response.json();
      console.log("Firebase function output:", result);
  
      return result;
  
    } catch (error) {
      console.error("Error in profanity detection:", error);
      return {
        containsProfanity: false,
        error: error.message,
        errorType: 'api_failure',
      };
    }
  };
  
  export default checkForProfanity;
  