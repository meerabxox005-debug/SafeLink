let history = [];

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

    // Save user message to history
    history.push({
        role: "user",
        parts: [message]
    });

    input.value = "";

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

        // Show AI reply
        chatBox.innerHTML += `
            <div class="bot-message">
                ${data.reply}
            </div>
        `;

        // Save AI reply to history
        history.push({
            role: "model",
            parts: [data.reply]
        });

        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {

        chatBox.innerHTML += `
            <div class="bot-message">
                ❌ Unable to connect to SafeLink AI.
            </div>
        `;

        console.error(error);
    }
}

// Press Enter to send
document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

// Focus on input when page opens
window.onload = function () {
    document.getElementById("userInput").focus();
};