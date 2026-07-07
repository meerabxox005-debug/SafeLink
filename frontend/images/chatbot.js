async function sendMessage() {

    const input = document.getElementById("userInput");
    const chat = document.getElementById("chatBox");

    const message = input.value.trim();

    if (message === "") return;

    chat.innerHTML += `
        <div class="user-message">
            ${message}
        </div>
    `;

    input.value = "";

    chat.scrollTop = chat.scrollHeight;

    try {

        const response = await fetch("http://safelink-hbf7.onrender.com/api/chatbot", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        // Show typing message
chat.innerHTML += `
    <div class="bot-message" id="typing">
        🤖 SafeLink AI is typing...
    </div>
`;

chat.scrollTop = chat.scrollHeight;

const data = await response.json();

// Simulate AI thinking
setTimeout(() => {

    document.getElementById("typing").remove();

    chat.innerHTML += `
        <div class="bot-message">
            ${data.reply}
        </div>
    `;

    chat.scrollTop = chat.scrollHeight;

}, 1000);

        chat.scrollTop = chat.scrollHeight;

    } catch (error) {

        chat.innerHTML += `
    <div class="bot-message">
        ${data.reply}

        <hr>

        <small style="color:gray;">
            SafeLink AI may make mistakes. For medical, legal, or life-threatening emergencies, always contact the appropriate emergency services.
        </small>
    </div>
`;
    }
}
document.getElementById("userInput").addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});