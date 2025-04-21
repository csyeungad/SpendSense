# Quick Start SpendSense Frontend

1. Install dependencies

   ```
   npm install
   ```

2. Modify the env.js for the Recipt scanning service api

   ```
   export const API_URL = http://HOST:8085/inference_re
   ```

3. Start the app

   ```
   npx expo start
   ```
   or
   ```
   npx expo start --tunnel
   ```

4. Connect to the app by scanning the QR code above with Expo Go (Android) or the Camera app (iOS)


## Database

For demo purposes, some mock transaction data is added in assets/SpendSense_w_data.db
