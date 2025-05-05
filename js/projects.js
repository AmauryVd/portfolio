
document.addEventListener('DOMContentLoaded', () => {
    const projects = document.querySelectorAll('.project-card');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let currentIndex = 0;

    function showProject(index) {
        projects.forEach((project, i) => {
            project.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextProject() {
        currentIndex = (currentIndex + 1) % projects.length;
        showProject(currentIndex);
    }

    function prevProject() {
        currentIndex = (currentIndex - 1 + projects.length) % projects.length;
        showProject(currentIndex);
    }

    nextBtn.addEventListener('click', nextProject);
    prevBtn.addEventListener('click', prevProject);

    showProject(currentIndex);
});
