// Auto-check backend on page load
window.onload = () => {
  fetch("http://safelink-hbf7.onrender.com/health")
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
  fetch("http://safelink-hbf7.onrender.com/api/test")
    .then(res => res.json())
    .then(data => {
      alert(data.message + " v" + data.version);
    })
    .catch(() => {
      alert("API failed ❌");
    });
}