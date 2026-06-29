# SassyBot

![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.x-000000?style=for-the-badge&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![ChatterBot](https://img.shields.io/badge/ChatterBot-1.0.4-8B5CF6?style=for-the-badge&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

A sassy chatbot with attitude, built with a Flask API backend and a React frontend. SassyBot responds to your messages with confidence, sass, and the occasional eye-roll. It learns from training data and falls back to handcrafted sassy responses when it does not know what to say.


## Preview

<img width="400" alt="Bildschirmfoto_29-6-2026_211342_localhost" src="https://github.com/user-attachments/assets/e339b5a0-f983-495b-8389-f64ae3a65894" />


## Getting Started

### Prerequisites

Python 3.x, Node.js 18+, npm

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/TranceMeli/SassyBot.git
cd SassyBot
```

**2. Install Python dependencies**

```bash
pip install flask chatterbot chatterbot-corpus
```

**3. Install frontend dependencies**

```bash
cd frontend
npm install
```

## Running the App

### Development mode

Run Flask and React in parallel:

```bash
# Terminal 1: Flask backend
python main.py

# Terminal 2: React dev server
cd frontend
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.
Vite automatically proxies `/api` requests to Flask on port 5000.

### Production mode

Build the React frontend into Flask's static folder:

```bash
cd frontend
npm run build
```

Then run Flask only:

```bash
python main.py
```

Open [http://localhost:5000](http://localhost:5000).

## Project Structure

```
SassyBot/
├── main.py                  # Flask API + ChatterBot setup
├── database.sqlite3         # Auto-generated training database
├── static/                  # React production build (auto-generated)
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── App.css
        └── components/
            ├── Header.jsx
            ├── ChatWindow.jsx
            ├── Message.jsx
            └── InputBar.jsx
```

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/chat` | Send a message, receive a sassy response |

**Request body:**
```json
{ "message": "Hello!" }
```

**Response:**
```json
{ "response": "Wow, a greeting. So original." }
```

## How It Works

SassyBot uses [ChatterBot](https://chatterbot.readthedocs.io/) with a `BestMatch` logic adapter and a SQLite storage backend. On startup, it trains on a set of curated question and answer pairs covering greetings, emotions, small talk, and more.

If the confidence score of a matched response falls below `0.4`, SassyBot ignores the match and returns a random handcrafted fallback response instead, keeping the sass consistent even for unknown inputs.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python, Flask |
| Chatbot | ChatterBot, SQLite |
| Frontend | React 18, Vite 5 |
| Styling | CSS (no framework) |
