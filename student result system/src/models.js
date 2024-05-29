//-----------------------
const studentForm = document.getElementById("create-student-form");
const allFildRequired = document.getElementById("allFildRequired");
const createStudentbtnclose = document.querySelector('.createStudentbtn-close');



  studentForm.onsubmit = (e) => {
    e.preventDefault();
    //get data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
  
    if (!data.name || !data.father || !data.mother || !data.roll || !data.reg) {
      allFildRequired.innerHTML = myalert("All fild are requard");
    } else {
      sendDataLS("studentData", {
        ...data,
        id: generateUniqueNumber(),
        createdAt: Date.now(),
        updatedAt: null,
        results: null,
      });
  
      allFildRequired.innerHTML = myalert(
        "Student data create successfully!",
        "info"
      );
    }
  
    allStudents();
    createStudentbtnclose.click();
    studentForm.reset();
  };


// update DAta
const updatestudent = document.getElementById("updatestudent");

document.addEventListener("DOMContentLoaded", function () {
  updatestudent.onsubmit = (e) => {
    const studentBtnClose = document.querySelector(".student-btn-close");
    e.preventDefault();
  
    const updatestudent = new FormData(e.target);
    const {
      Bangla,
      English,
      Math,
      Science,
      Social,
      Religion,
      id,
    } = Object.fromEntries(updatestudent);
    const getDataLS = JSON.parse(localStorage.getItem("studentData"));
  
    // Update data
    const updateData = getDataLS.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          results: {
            Bangla,
            English,
            Math,
            Science,
            Social,
            Religion,
          },
        };
      } else {
        return item;
      }
    });
    
    //Update data ls
    localStorage.setItem("studentData", JSON.stringify(updateData));
    allStudents();
    studentBtnClose.click();
  };
});


