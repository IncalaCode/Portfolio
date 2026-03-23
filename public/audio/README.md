# Audio Setup Instructions

To add background music to your portfolio:

1. Download the audio from YouTube video: https://youtu.be/XoWuDjvhAAw
   - You can use online tools like: https://ytmp3.nu/ or https://y2mate.com/
   
2. Convert to MP3 format if needed

3. Rename the file to `background-music.mp3`

4. Place it in this folder: `public/audio/background-music.mp3`

5. The audio will automatically play when the hero section loads (with user interaction required by browser)

## Alternative: Use a Different Audio Source

If you want to use a different audio file, simply:
- Place your MP3 file in this folder
- Update the path in `src/components/HeroSection.tsx` line where it says:
  ```typescript
  const audio = new Audio('/audio/background-music.mp3');
  ```

## Audio Settings

Current settings:
- Loop: Enabled (music repeats)
- Volume: 30% (0.3)
- Autoplay: Attempts to play on load (may be blocked by browser)
