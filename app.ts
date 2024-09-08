document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  // Modal functionality
  const modal = document.getElementById('myModal') as HTMLElement;
  const btn = document.getElementById('openModal') as HTMLElement;
  const span = document.getElementsByClassName('close')[0] as HTMLElement;

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
  const form = document.getElementById('resumeForm') as HTMLFormElement;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    modal.style.display = 'none';
    displayCV(data);
  });

  function displayCV(data: { [key: string]: string }) {
    const cv = document.getElementById('resumeContainer') as HTMLElement;
    const downloadBtn = document.getElementById('downloadPdf') as HTMLElement;

    if (cv) {
      document.getElementById('cvName')!.innerText = data.name || '';
      document.getElementById('cvLastname')!.innerText = data.lastname || '';
      document.getElementById('cvEmail')!.innerText = data.email || '';
      document.getElementById('cvIntroduction')!.innerText = data.introduction || '';
      document.getElementById('cvEducation')!.innerText = data.education || '';
      document.getElementById('cvWorkExperience')!.innerText = data.workExperience || '';

      const skillsArray = data.skills ? data.skills.split(',').map(skill => skill.trim()) : [];
      document.getElementById('cvSkills')!.innerHTML = skillsArray.join('<br>');

      cv.style.display = 'block';
      downloadBtn.style.display = 'block';
    }
  }

  // PDF download
  const downloadBtn = document.getElementById('downloadPdf') as HTMLElement;
  downloadBtn.onclick = function () {
    const element = document.getElementById('resumeContainer') as HTMLElement;
    html2pdf().from(element).save();
  };
});
