document.addEventListener("DOMContentLoaded", function () {

    const btn = document.getElementById("themeToggle");

    function applyTheme() {
        const theme = localStorage.getItem("theme");

        if (theme === "dark") {
            document.body.classList.add("dark");
            if (btn) btn.innerHTML = "☀️ Light Mode";
        } else {
            document.body.classList.remove("dark");
            if (btn) btn.innerHTML = "🌙 Dark Mode";
        }
    }

    applyTheme();

    if (btn) {
        btn.addEventListener("click", function () {

            if (document.body.classList.contains("dark")) {
                localStorage.setItem("theme", "light");
            } else {
                localStorage.setItem("theme", "dark");
            }

            applyTheme();
        });
    }

});