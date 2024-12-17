// Variables principales
const topicsContainer = document.querySelector(".topics");
const discussionTitle = document.getElementById("discussion-title");
const discussionContent = document.getElementById("discussion-content");
const inputText = document.getElementById("input-text");
const submitButton = document.getElementById("submit-button");
const newTopicButton = document.getElementById("new-topic-button");

// Dictionnaire pour stocker l'historique des discussions par sujet
const topicsData = {
  1: {
    title: "Sujet 1",
    messages: ["Bienvenue sur la discussion du Sujet 1."],
  },
  2: {
    title: "Sujet 2",
    messages: ["Bienvenue sur la discussion du Sujet 2."],
  },
  3: {
    title: "Sujet 3",
    messages: ["Bienvenue sur la discussion du Sujet 3."],
  },
};

let currentTopicId = null; // Identifiant du sujet en cours

// Gestion des sujets existants
document.querySelectorAll(".topic-item").forEach((topic) => {
  topic.addEventListener("click", () => {
    const topicId = topic.getAttribute("data-id");
    openTopic(topicId);
  });
});

// Fonction pour ouvrir un sujet
function openTopic(topicId) {
  currentTopicId = topicId;
  const topicData = topicsData[topicId];

  discussionTitle.textContent = topicData.title;
  discussionContent.innerHTML = topicData.messages
    .map((msg) => `<p>${msg}</p>`)
    .join("");
}

// Gestion du bouton "Nouveau Sujet"
newTopicButton.addEventListener("click", () => {
  currentTopicId = null; // Aucun sujet en cours
  discussionTitle.textContent = "Nouveau Sujet";
  discussionContent.innerHTML =
    "<p>Commencez à écrire pour créer un sujet.</p>";
  inputText.value = ""; // Réinitialise le champ d'entrée
});

// Gestion du formulaire
submitButton.addEventListener("click", () => {
  const newMessage = inputText.value.trim();

  if (!newMessage) {
    alert("Veuillez écrire un message.");
    return;
  }

  if (currentTopicId) {
    // Ajout d'une réponse au sujet actuel
    topicsData[currentTopicId].messages.push(newMessage);
    const paragraph = document.createElement("p");
    paragraph.textContent = newMessage;
    discussionContent.appendChild(paragraph);
  } else {
    // Création d'un nouveau sujet
    const newTopicId = Date.now(); // Identifiant unique basé sur l'heure actuelle
    const newTopicTitle = newMessage;

    // Ajoute un nouveau sujet au dictionnaire
    topicsData[newTopicId] = {
      title: newTopicTitle,
      messages: [`Discussion sur ${newMessage}`],
    };

    // Ajoute un nouveau sujet à la liste
    const newTopic = document.createElement("div");
    newTopic.className = "topic-item";
    newTopic.textContent = newTopicTitle;
    newTopic.setAttribute("data-id", newTopicId);
    topicsContainer.appendChild(newTopic);

    // Ajout du comportement au clic pour le nouveau sujet
    newTopic.addEventListener("click", () => openTopic(newTopicId));

    // Met à jour la zone centrale avec le nouveau sujet
    openTopic(newTopicId);
  }

  // Réinitialise le champ d'entrée
  inputText.value = "";
});
    