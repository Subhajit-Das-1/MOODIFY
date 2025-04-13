# MOODIFY - Mood-Based Music Recommendation App

MOODIFY is a React web application that recommends songs based on your current mood. The app changes its theme and background color according to the selected mood, creating an immersive experience.

## Features

- Mood selection with 6 different moods (Happy, Sad, Angry, Chill, Energetic, Peaceful)
- Dynamic background color changes based on mood
- Mood-related inspirational quotes
- Spotify integration for music recommendations
- Responsive design with TailwindCSS
- Modern, clean UI with smooth transitions

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Spotify Developer Account

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a Spotify Developer Account and get your API credentials:
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new application
   - Copy your Client ID and Client Secret

4. Create a `.env` file in the root directory and add your Spotify credentials:
   ```
   REACT_APP_SPOTIFY_CLIENT_ID=your_client_id_here
   REACT_APP_SPOTIFY_CLIENT_SECRET=your_client_secret_here
   ```

5. Start the development server:
   ```bash
   npm start
   ```

## Technologies Used

- React
- TypeScript
- TailwindCSS
- Spotify Web API
- Axios

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is licensed under the MIT License. 