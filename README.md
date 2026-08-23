# SassyBot

![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.x-000000?style=for-the-badge&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Gemini API](https://img.shields.io/badge/Gemini_API-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)

A sassy chatbot with attitude, built with a Flask API backend and a React frontend. SassyBot retrieves the most relevant examples from a curated training set via TF-IDF, then has Google's Gemini API generate a fresh, on-style response grounded in those examples. If the Gemini call fails, it falls back to a pool of handcrafted sassy responses so the bot never goes silent.

## Preview

<img src="assets/sassybot_screen.png" alt="SassyBot preview" width="400">

## Getting Started

### Prerequisites

Python 3.9+, Node.js 18+, npm, a Gemini API key from [Google AI Studio](https://aistudio.google.com)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/TranceMeli/SassyBot.git
cd SassyBot
```

**2. Install Python dependencies**

```bash
pip install flask google-genai python-dotenv scikit-learn
```

**3. Set up your API key**

Create a `.env` file in the project root: