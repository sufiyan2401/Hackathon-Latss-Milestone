// // script.ts
// document.addEventListener('DOMContentLoaded', () => {
//   const cursor = document.createElement('div');
//   cursor.classList.add('custom-cursor');
//   document.body.appendChild(cursor);

//   document.addEventListener('mousemove', (e) => {
//     cursor.style.left = `${e.clientX}px`;
//     cursor.style.top = `${e.clientY}px`;
//   });

//   // Modal functionality
//   const modal = document.getElementById('myModal') as HTMLElement;
//   const btn = document.getElementById('openModal') as HTMLElement;
//   const span = document.getElementsByClassName('close')[0] as HTMLElement;

//   btn.onclick = function () {
//     modal.style.display = 'block';
//   }

//   span.onclick = function () {
//     modal.style.display = 'none';
//   }

//   window.onclick = function (event) {
//     if (event.target == modal) {
//       modal.style.display = 'none';
//     }
//   }

//   // Form submission
//   const form = document.getElementById('resumeForm') as HTMLFormElement;
//   form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const formData = new FormData(form);
//     const data: { [key: string]: string } = {};
//     formData.forEach((value, key) => {
//       data[key] = value.toString();
//     });
//     console.log(data);
//     modal.style.display = 'none';
//     displayCV(data);
//   });

//   function displayCV(data: { [key: string]: string }) {
//     const cv = document.createElement('div');
//     cv.classList.add('cv');
//     cv.innerHTML = `
//           <h2>Resume</h2>
//           <div class="cv-section" contenteditable="true">
//               <h3>Personal Information</h3>
//               <p><strong>Name:</strong> <span contenteditable="true">${data.name}</span></p>
//               <p><strong>Email:</strong> <span contenteditable="true">${data.email}</span></p>
//           </div>
//           <div class="cv-section" contenteditable="true">
//               <h3>Education</h3>
//               <p contenteditable="true">${data.education}</p>
//           </div>
//           <div class="cv-section" contenteditable="true">
//               <h3>Work Experience</h3>
//               <p contenteditable="true">${data.workExperience}</p>
//           </div>
//           <div class="cv-section" contenteditable="true">
//               <h3>Skills</h3>
//               <p contenteditable="true">${data.skills}</p>
//           </div>
//       `;
//     document.body.innerHTML = ''; // Clear the existing content
//     document.body.appendChild(cv);
//     cv.style.display = 'block';
//   }
// });
// script.ts
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
  const form = document.getElementById('resumeForm') as HTMLFormElement;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    console.log(data);
    modal.style.display = 'none';
    displayCV(data);
    await generateUniqueUrl(data.name);
  });

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
      }
      if (downloadPdf) {
        downloadPdf.style.display = 'block';
      }
    }
  }



}



  // PDF download
  const downloadBtn = document.getElementById('downloadPdf') as HTMLElement;
downloadBtn.onclick = function () {
  const element = document.getElementById('resumeContainer') as HTMLElement;
  html2pdf().from(element).save();
}

