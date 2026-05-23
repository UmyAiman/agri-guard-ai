AgriGuard AI Farming Assistant

AgriGuard AI is a full-stack AI-powered web application designed to assist farmers in detecting plant diseases using image analysis and intelligent AI systems. The platform combines computer vision APIs and large language models to provide disease identification, verified agricultural knowledge, and treatment recommendations in real time.
The system is designed as a smart agricultural assistant that works as a 24/7 AI plant doctor.

Problem Statement

Farmers face major challenges such as:

Difficulty in early disease detection
Lack of access to agricultural experts in rural areas
Delayed diagnosis and treatment guidance

AgriGuard AI solves this by providing instant AI-based plant disease detection and expert-level recommendations.

Key Features
1. AI-Based Disease Detection
Upload plant leaf images
Detect disease using Roboflow Computer Vision API
Returns disease name and confidence score
2. Hybrid Intelligence System
First checks MongoDB for verified disease records
If not found, uses Gemini / Llama AI models
Ensures accuracy and reliability
3. Dual Input System
Image upload support
Text-based symptom input (chat system)
4. AI Disease Explanation
Simple explanation of disease
Organic and chemical treatments
Prevention methods
5. User Authentication System
JWT-based authentication
Secure login and signup system
Protected routes
6. History Tracking
Stores all past disease detections
Helps users track crop health over time
System Architecture

User → React Frontend → Node.js/Express Backend → AI + MongoDB → Response → Frontend Display

Full Workflow
1. Authentication
User logs in using email and password
Password is hashed using Argon2
JWT token is generated for session management
2. Image Upload
Frontend sends image using FormData
Backend receives it using Multer middleware
3. Disease Detection
Image is sent to Roboflow API
API returns disease name and confidence score
4. Smart Analysis (Hybrid AI)
Backend checks MongoDB for verified disease data
If found → uses expert data
If not found → uses Gemini/Llama AI fallback
5. AI Response Generation
Provides:
Disease explanation
Treatment options
Prevention tips
6. Save History
Stores results in MongoDB (user-based history tracking)
Tech Stack
Frontend
React.js
TypeScript
Tailwind CSS
TanStack Query (State Management)
Backend
Node.js
Express.js
TypeScript
Database
MongoDB Atlas
Mongoose ODM
AI & APIs
Roboflow (Image Detection)
Gemini / OpenRouter (AI Explanation)
Authentication & Security
JWT Authentication
Argon2 Password Hashing
Middleware Protection
File Handling
Multer (Image Uploads)
Backend Architecture
Routes → API endpoints
Models → Database structure (User, Disease, History)
Services → Core AI logic (analysisService)
Middleware → Authentication (JWT validation)
Key Concepts Used
RESTful APIs
Middleware architecture
Modular backend design
Client-server communication
Asynchronous programming
State management (React Query)
AI integration pipeline
Document-based database (MongoDB)
Security Features
Password hashing using Argon2
JWT authentication system
Protected API routes
Environment variables for API keys
No sensitive data exposed in frontend
