async function sendMessage() {

    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    const message = input.value.trim();

    if (message === "") return;

    chatBox.innerHTML += `
        <div class="user-message">
            ${message}
        </div>
    `;

    input.value = "";

    try {

        const response = await fetch("https://safelink-1-vyfn.onrender.com/api/chatbot/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        chatBox.innerHTML += `
            <div class="bot-message">
                ${data.reply}
            </div>
        `;

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

document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

window.onload = function () {
    document.getElementById("userInput").focus();
};