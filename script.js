document.addEventListener("DOMContentLoaded", () => {
    // 1. Dark Mode Toggle
    const toggleBtn = document.getElementById("dark-mode-toggle");
    if (toggleBtn) {
        // Check saved preference
        if (localStorage.getItem("theme") === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
            toggleBtn.textContent = "☀️";
        }

        toggleBtn.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            if (currentTheme === "dark") {
                document.documentElement.removeAttribute("data-theme");
                localStorage.setItem("theme", "light");
                toggleBtn.textContent = "🌙";
            } else {
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
                toggleBtn.textContent = "☀️";
            }
        });
    }

    // 2. Search Functionality
    const searchBar = document.getElementById("search-input");
    if (searchBar) {
        searchBar.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            const captions = document.querySelectorAll(".caption-box");
            captions.forEach(box => {
                const text = box.querySelector(".caption-text").textContent.toLowerCase();
                if (text.includes(query)) {
                    box.style.display = "flex";
                } else {
                    box.style.display = "none";
                }
            });
        });
    }

    // 3. Copy Functionality
    const copyBtns = document.querySelectorAll(".copy-btn");
    copyBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const box = e.target.closest(".caption-box");
            if (!box) return;
            const textToCopy = box.querySelector(".caption-text").textContent;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                const origIcon = btn.innerHTML;
                btn.innerHTML = "✅";
                setTimeout(() => {
                    btn.innerHTML = origIcon;
                }, 1500);
            }).catch(err => {
                console.error("Failed to copy text: ", err);
            });
        });
    });

    // 4. Share Functionality
    const shareBtns = document.querySelectorAll(".share-btn");
    shareBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const box = e.target.closest(".caption-box");
            if (!box) return;
            const textToShare = box.querySelector(".caption-text").textContent;
            
            if (navigator.share) {
                navigator.share({
                    title: 'Instagram Caption',
                    text: textToShare,
                    url: window.location.href,
                }).catch((error) => console.log('Error sharing', error));
            } else {
                alert("Share feature not supported in your browser. Just copy it!");
            }
        });
    });
});
