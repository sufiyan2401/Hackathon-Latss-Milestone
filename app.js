document.addEventListener('DOMContentLoaded', function () {
    var cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', function (e) {
        cursor.style.left = "".concat(e.clientX, "px");
        cursor.style.top = "".concat(e.clientY, "px");
    });
    // Modal functionality
    var modal = document.getElementById('myModal');
    var btn = document.getElementById('openModal');
    var span = document.getElementsByClassName('close')[0];
    btn.onclick = function () {
        modal.style.display = 'block';
    };
    span.onclick = function () {
        modal.style.display = 'none';
    };
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
    // Form submission
    var form = document.getElementById('resumeForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var formData = new FormData(form);
        var data = {};
        formData.forEach(function (value, key) {
            data[key] = value.toString();
        });
        modal.style.display = 'none';
        displayCV(data);
    });
    function displayCV(data) {
        var cv = document.getElementById('resumeContainer');
        var downloadBtn = document.getElementById('downloadPdf');
        if (cv) {
            document.getElementById('cvName').innerText = data.name || '';
            document.getElementById('cvLastname').innerText = data.lastname || '';
            document.getElementById('cvEmail').innerText = data.email || '';
            document.getElementById('cvIntroduction').innerText = data.introduction || '';
            document.getElementById('cvEducation').innerText = data.education || '';
            document.getElementById('cvWorkExperience').innerText = data.workExperience || '';
            var skillsArray = data.skills ? data.skills.split(',').map(function (skill) { return skill.trim(); }) : [];
            document.getElementById('cvSkills').innerHTML = skillsArray.join('<br>');
            cv.style.display = 'block';
            downloadBtn.style.display = 'block';
        }
    }
    // PDF download
    var downloadBtn = document.getElementById('downloadPdf');
    downloadBtn.onclick = function () {
        var element = document.getElementById('resumeContainer');
        html2pdf().from(element).save();
    };
});
