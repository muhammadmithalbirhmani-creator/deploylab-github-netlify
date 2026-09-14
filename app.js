// Mobile navigation

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});


// Close mobile menu after clicking a link

document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});


// Copy buttons

const copyButtons = document.querySelectorAll(".copy-btn");
const toast = document.getElementById("toast");

copyButtons.forEach(button => {

    button.addEventListener("click", async () => {

        const text = button.getAttribute("data-copy");

        try {

            await navigator.clipboard.writeText(text);

            const originalText = button.textContent;

            button.textContent = "Copied!";

            toast.textContent = "Command copied to clipboard";
            toast.classList.add("show");

            setTimeout(() => {
                button.textContent = originalText;
                toast.classList.remove("show");
            }, 1500);

        } catch (error) {

            toast.textContent = "Copy failed";
            toast.classList.add("show");

            setTimeout(() => {
                toast.classList.remove("show");
            }, 1500);

        }

    });

});


// Small reveal effect

const cards = document.querySelectorAll(
    ".concept-card, .step-card, .command-card, .workflow-item"
);

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.08
    }
);


cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(15px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";

    observer.observe(card);

});
