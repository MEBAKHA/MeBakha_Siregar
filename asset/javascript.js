document.getElementById("about-PORTOFOLIO").onclick = function() {
    alert("Ini adalah portofolio ku yang berisi informasi tentang diriku, keterampilan, pengalaman, dan proyek-proyek yang telah aku kerjakan. Semoga portofolio ini dapat memberikan gambaran yang jelas tentang siapa aku dan apa yang bisa aku lakukan. Terima kasih telah mengunjungi portofolio ku! 😊 portofolio ini akan selalu di update setiap berjalannya waktu.");
};
const starButton = document.getElementById("star-button");
const canvas = document.getElementById("star");
const ctx = canvas.getContext("2d");

let stars = [];
let animationRunning = false;

// Selalu pastikan canvas menyesuaikan resolusi layar
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", () => {
    resizeCanvas();
    if (animationRunning) createStars(); // regen bintang saat layar berubah
});

// Buat bintang sesuai ukuran canvas yang baru
function createStars() {
    stars = [];
    for (let i = 0; i < 500; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speed: Math.random() * 0.6 + 0.2
        });
    }
}

function animateStars() {
    if (!animationRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.y += star.speed;

        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animateStars);
}

starButton.addEventListener("click", () => {
    document.body.classList.toggle("star-mode");

    if (document.body.classList.contains("star-mode")) {
        canvas.style.display = "block";
        resizeCanvas();   // PENTING!
        createStars();
        animationRunning = true;
        animateStars();
    } else {
        animationRunning = false;
        canvas.style.display = "none";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

const downloadButton = document.getElementById("download-button");
if (downloadButton) {
    downloadButton.addEventListener("click", () => {
        const link = document.createElement("a");
        link.href = "asset/img/my-cv.pdf"; // path benar ke file CV
        link.download = "Rakha-CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
} else {
    console.warn('Download button with id "download-button" not found.');
}

