// Auto-check backend on page load
window.onload = () => {
  fetch("http://localhost:3000/health")
    .then(res => res.json())
    .then(data => {
      document.getElementById("status").innerText = data.status;
    })
    .catch(() => {
      document.getElementById("status").innerText = "Backend not connected ❌";
    });
};

// Manual test button
function testAPI() {
  fetch("http://localhost:3000/api/test")
    .then(res => res.json())
    .then(data => {
      alert(data.message + " v" + data.version);
    })
    .catch(() => {
      alert("API failed ❌");
    });
}