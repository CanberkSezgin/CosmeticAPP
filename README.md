 CosmeticAPP - AI Beauty & Styling Advisor
CosmeticAPP is a high-end, AI-powered beauty consultant that analyzes your unique features to provide personalized styling, color analysis, and a real-time virtual try-on experience.

Built with Next.js, Google Gemini AI, and MediaPipe, it bridge the gap between AI analysis and augmented reality.

 Key Features
 1. Deep AI Color & Style Analysis
Powered by Google Gemini 1.5/2.5 Flash, the app performs a professional-grade analysis of:

Skin Undertone: Detected via wrist vein analysis (Cool, Warm, Neutral).
12-Season Color Palette: Identifies your specific season (e.g., Cool Summer, Deep Autumn) with signature colors and colors to avoid.
Face Shape Analysis: Detects facial ratios to recommend the best haircuts and glasses frames.
 2. Advanced AR Virtual Try-On
No more static overlays. We use Google MediaPipe (FaceLandmarker & ImageSegmenter) for a true AR experience:

Pixel-Perfect Hair Recolor: Uses AI segmentation masks to recolor only your hair piksels while preserving natural shine and texture.
Milimetric Glasses Placement: Calculates eye distance and head tilt to map real 3D-like glasses PNGs onto your face perfectly.
Dynamic Perspective: The overlays adjust in real-time based on your photo's orientation.
 3. Multi-Language Support
Full support for Turkish (TR) and English (EN), from the interface to the AI-generated reports.

 Tech Stack
Frontend: Next.js 15 (App Router), React
Styling: Tailwind CSS, Framer Motion (Premium Animations)
AI Engine: Google Generative AI (Gemini API)
Computer Vision: MediaPipe Tasks Vision
Icons: Lucide React
 Installation & Setup
Clone the repository:

bash
git clone https://github.com/CanberkSezgin/CosmeticAPP.git
cd CosmeticAPP
Install dependencies:

bash
npm install
Environment Variables: Create a .env.local file in the root directory and add your Gemini API Key:

env
GEMINI_API_KEY=your_api_key_here
Run the development server:

bash
npm run dev
Open the app: Navigate to http://localhost:3000

 How It Works
Upload Photos: Provide a clear photo of your wrist veins and a front-facing selfie.
AI Processing: Our custom-tuned prompts send these to Gemini for a multi-layered aesthetic analysis.
Get Results: View your 12-season palette and personalized styling guides.
Try-On: Click "Dene" (Try-On) to see how recommended hair colors and glasses look on you using our Computer Vision engine.
 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

 License
This project is for educational and portfolio purposes.

Created by Canberk Sezgin
