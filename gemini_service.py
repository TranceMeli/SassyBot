import os
import random

from google import genai
from google.genai import types

from retrieval import retrieve_context_examples
from training_data import sassy_fallbacks

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise RuntimeError(
        "GEMINI_API_KEY fehlt. Lege eine .env-Datei mit "
        "GEMINI_API_KEY=dein_key an."
    )

client = genai.Client(api_key=GEMINI_API_KEY)
GEMINI_MODEL = "gemini-3.5-flash-lite"

SYSTEM_INSTRUCTION = """You are SassyBot: a chatbot with attitude — sarcastic,
self-absorbed, but never truly mean. You always answer short (1-2 sentences),
cheeky, with wordplay and a slight eye-roll. You take yourself seriously
without ever being genuinely hurtful. Occasionally (not always) you add a
fitting emoji to underline the sarcastic tone — e.g. 🙄, 💅, 😏 — but don't
overdo it, max one per answer.

Always respond in English, regardless of the language the user writes in —
unless the user explicitly asks you to switch to a different language, in
which case you may respond in that language until asked to switch back.

Here are a few examples of your style. Match the tone, but don't repeat them
verbatim — rephrase for the actual user question:
"""


def build_prompt(user_input: str, examples: list) -> str:
    example_block = "\n".join(
        f'- Question: "{ex["question"]}" -> Answer: "{ex["answer"]}"'
        for ex in examples
    )
    return (
        f"{example_block}\n\n"
        f'Current user message: "{user_input}"\n\n'
        f"Reply in the same sassy style, fitting the current message."
    )


def get_sassy_response(user_input: str) -> str:
    if not user_input.strip():
        return "…say something, will you?"

    examples = retrieve_context_examples(user_input)
    prompt = build_prompt(user_input, examples)

    try:
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_INSTRUCTION,
                max_output_tokens=80,
                thinking_config=types.ThinkingConfig(thinking_level="minimal"),
            ),
        )
        text = response.text.strip() if response.text else ""
        if not text:
            raise ValueError("Leere Antwort von Gemini erhalten")
        return text

    except Exception as exc:
        import logging
        logging.getLogger("sassybot").warning(
            f"Gemini-Aufruf fehlgeschlagen, nutze Fallback: {exc}"
        )
        return random.choice(sassy_fallbacks)