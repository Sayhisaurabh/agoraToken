const express = require("express");
const app = express();
const cors = require('cors');
const port = 3000; // Change this to any port you prefer
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.get('/',function(req,res){
  res.json({
    msg:"hello"
  })
})
app.post('/generateToken',(req,res)=>{
    const {app_id,app_certificate,channel} = req.body
    const agoraAccessToken = require('agora-access-token');
   
    
    // Replace these values with your actual ones
    const APP_ID = app_id;
    const APP_CERTIFICATE = app_certificate;
    const CHANNEL_NAME = channel;
    
    // Function to generate the Agora token
    function generateAgoraToken() {
      // Set the expiration time for the token in seconds (e.g., 1 day = 86400 seconds)
      const expirationTimeInSeconds = 86400;
    
      // Get the current timestamp in seconds
      const currentTimestamp = Math.floor(Date.now() / 1000);
    
      // Create the token options
      const tokenOptions = {
        version: '1', // Agora token version
        appId: APP_ID,
        appCertificate: APP_CERTIFICATE,
        channelName: CHANNEL_NAME,
        uid: 0, // 0 if you don't want to set a specific UID
        role: agoraAccessToken.RtcRole.PUBLISHER, // Change role as needed
        expirationTime: currentTimestamp + expirationTimeInSeconds,
      };
    
      // Generate the Agora token using the agora-access-token library
      const token = agoraAccessToken.RtcTokenBuilder.buildTokenWithUid(
        tokenOptions.appId,
        tokenOptions.appCertificate,
        tokenOptions.channelName,
        tokenOptions.uid,
        tokenOptions.role,
        tokenOptions.expirationTime
      );
    
      return token;
    }
    
    // Main function to generate the token and log it
    function main() {
      const agoraToken = generateAgoraToken();
   
      res.status(200).json({
        success:true,
        message: "agora token",
        token:agoraToken
      });
    }
    
    // Call the main function to generate the token
    main();
    
    })

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
