// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Modal functionality
    const modal = document.getElementById('myModal');
    const btn = document.getElementById('openModal');
    const span = document.getElementsByClassName('close')[0];

    btn.onclick = function () {
        modal.style.display = 'block';
    }

    span.onclick = function () {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Form submission
    const form = document.getElementById('resumeForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        console.log(data);
        modal.style.display = 'none';
        displayCV(data);
    });

    function displayCV(data) {
        const cv = document.createElement('div');
        cv.classList.add('cv');
        cv.innerHTML = `
            <h2>Resume</h2>
            <div class="cv-section">
                <h3>Personal Information</h3>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
            </div>
            <div class="cv-section">
                <h3>Education</h3>
                <p>${data.education}</p>
            </div>
            <div class="cv-section">
                <h3>Work Experience</h3>
                <p>${data.workExperience}</p>
            </div>
            <div class="cv-section">
                <h3>Skills</h3>
                <p>${data.skills}</p>
            </div>
        `;
        document.body.innerHTML = ''; // Clear the existing content
        document.body.appendChild(cv);
        cv.style.display = 'block';
    }
});
