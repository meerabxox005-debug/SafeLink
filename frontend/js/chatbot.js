// Stores the conversation history
let history = JSON.parse(localStorage.getItem("chatHistory")) || [];

// Save history to localStorage
function saveHistory() {
    localStorage.setItem("chatHistory", JSON.stringify(history));
}

// Send message
async function sendMessage() {

    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    const message = input.value.trim();

    if (message === "") return;

    // Show user message
    chatBox.innerHTML += `
        <div class="user-message">
            ${message}
        </div>
    `;

    // Save user message
    history.push({
        role: "user",
        parts: [message]
    });

    saveHistory();

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Typing indicator
    chatBox.innerHTML += `
        <div class="bot-message" id="typing">
            🤖 SafeLink AI is typing...
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        const response = await fetch("https://safelink-1-vyfn.onrender.com/api/chatbot/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message,
                history: history
            })
        });

        const data = await response.json();

        // Remove typing indicator
        const typing = document.getElementById("typing");
        if (typing) typing.remove();

        // Show AI reply
        chatBox.innerHTML += `
            <div class="bot-message">
                ${data.reply}
            </div>
        `;

        // Save AI reply
        history.push({
            role: "model",
            parts: [data.reply]
        });

        saveHistory();

        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {

        // Remove typing indicator
        const typing = document.getElementById("typing");
        if (typing) typing.remove();

        chatBox.innerHTML += `
            <div class="bot-message">
                ❌ Unable to connect to SafeLink AI.
            </div>
        `;

        chatBox.scrollTop = chatBox.scrollHeight;

        console.error(error);
    }
}

// Press Enter to send
document.getElementById("userInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

// Load previous chat
window.onload = function () {

    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    input.focus();

    history.forEach(item => {

        if (item.role === "user") {

            chatBox.innerHTML += `
                <div class="user-message">
                    ${item.parts[0]}
                </div>
            `;

        } else {

            chatBox.innerHTML += `
                <div class="bot-message">
                    ${item.parts[0]}
                </div>
            `;
        }

    });

    chatBox.scrollTop = chatBox.scrollHeight;
};