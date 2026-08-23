from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from training_data import sassy_training

TOP_K = 3

training_questions = []
training_category = []

for category_id, entry in enumerate(sassy_training):
    for question in entry["questions"]:
        training_questions.append(question)
        training_category.append(category_id)

vectorizer = TfidfVectorizer(lowercase=True)
training_matrix = vectorizer.fit_transform(training_questions)


def retrieve_context_examples(user_input: str, top_k: int = TOP_K):
    """Findet die top_k ähnlichsten trainierten Kategorien und gibt
    Beispiel-Frage/Antwort-Paare draus zurück, als Kontext für Gemini."""
    user_vector = vectorizer.transform([user_input])
    similarities = cosine_similarity(user_vector, training_matrix)[0]

    ranked_indices = similarities.argsort()[::-1]

    seen_categories = set()
    examples = []
    for idx in ranked_indices:
        category_id = training_category[idx]
        if category_id in seen_categories:
            continue
        seen_categories.add(category_id)

        entry = sassy_training[category_id]
        examples.append({
            "question": entry["questions"][0],
            "answer": entry["answers"][0],
            "score": float(similarities[idx]),
        })
        if len(examples) >= top_k:
            break

    return examples