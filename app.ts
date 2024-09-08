document.addEventListener('DOMContentLoaded', () => {
  // Create and append custom cursor
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e: MouseEvent) => {
    if (cursor) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }
  });

  // Modal functionality
  const modal = document.getElementById('myModal') as HTMLElement | null;
  const btn = document.getElementById('openModal') as HTMLElement | null;
  const span = document.getElementsByClassName('close')[0] as HTMLElement | null;

  if (btn) {
    btn.onclick = () => {
      if (modal) {
        modal.style.display = 'block';
      }
    };
  }

  if (span) {
    span.onclick = () => {
      if (modal) {
        modal.style.display = 'none';
      }
    };
  }

  window.onclick = (event: MouseEvent) => {
    if (modal && event.target === modal) {
      modal.style.display = 'none';
    }
  };

  // Form submission
  const form = document.getElementById('resumeForm') as HTMLFormElement | null;

  if (form) {
    form.addEventListener('submit', async (e: Event) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data: { [key: string]: string } = {};
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });
      console.log(data);
      if (modal) {
        modal.style.display = 'none';
      }
      displayCV(data);
    });
  }

  function displayCV(data: { [key: string]: string }) {
    const cv = document.getElementById('resumeContainer') as HTMLElement | null;
    const downloadPdf = document.getElementById('downloadPdf') as HTMLElement | null;

    if (cv) {
      const cvName = document.getElementById('cvName') as HTMLElement | null;
      const cvLastname = document.getElementById('cvLastname') as HTMLElement | null;
      const cvEmail = document.getElementById('cvEmail') as HTMLElement | null;
      const cvEducation = document.getElementById('cvEducation') as HTMLElement | null;
      const cvWorkExperience = document.getElementById('cvWorkExperience') as HTMLElement | null;
      const cvSkills = document.getElementById('cvSkills') as HTMLElement | null;
      const mainSection = document.querySelector('main') as HTMLElement | null;

      const introuductions = document.querySelector('introuductions') as HTMLElement | null;
      if (cvName) {
        cvName.innerText = data.name || '';
      }
      if (cvLastname) {
        cvLastname.innerText = data.lastname || '';
      }
      if (cvEmail) {
        cvEmail.innerText = data.email || '';
      }
      if (cvEducation) {
        cvEducation.innerText = data.education || '';
      }
      if (cvWorkExperience) {
        cvWorkExperience.innerText = data.workExperience || '';
      }


      if (cvSkills) {
        cvSkills.innerText = data.skills || '';
        const skillsArray = data.skills ? data.skills.split(',').map(skill => skill.trim()) : [];
        cvSkills.innerHTML = skillsArray.join('<br>');
      }
      if (mainSection) {
        mainSection.style.display = 'none';
      }
      if (cv) {
        cv.style.display = 'block';
        downloadBtn.style.display = 'block';
      }
      if (downloadPdf) {
        downloadPdf.style.display = 'block';
      }
    }
  }
});
const downloadBtn = document.getElementById('downloadPdf') as HTMLElement;
downloadBtn.onclick = function () {
  const element = document.getElementById('resumeContainer') as HTMLElement;
  // Ensure content is visible before downloading PDF
  html2pdf().from(element).save();
};

