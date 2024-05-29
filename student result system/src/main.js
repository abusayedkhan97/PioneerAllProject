// result set

const resultForm = document.getElementById("addResult");
const btnClose = document.querySelector(".resultBtn-close");

const student = document.querySelector(".seeStudent");
const getAllStudendData = document.getElementById("getAllStudendData");

const allStudents = () => {
  const getStudents = getDataLS("studentData");
  let dataList = "";
  if (getStudents) {
    let x = 0;
    getStudents.reverse().forEach((item) => {
      x++;
      dataList += `<tr>
            <td>${x < 10 ? "0" + x : "" + x}</td>
            <td>${item.name}</td>
            <td>${item.roll}</td>
            <td>${item.reg}</td>
            <td>${item.board}</td>
            <td>${timeAgo(item.createdAt)}</td>
            <td>
            ${
              item.results
                ? '<button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#edite" onclick="dataPass('+item.id+')">View Result</button>'
                : '<button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#result" onclick="idPass(' +
                  item.id +
                  ')">Add Result</button>'
            }
            </td>

            <td>
            <button class="bg-info" data-bs-toggle="modal" data-bs-target="#seeStudent" onclick="seeStudent(${
              item.id
            })">
            <i class="fa-solid fa-eye"></i>
            </button>
            
            <button class="bg-warning" data-bs-toggle="modal" data-bs-target="#edite" onclick="dataPass(${
              item.id
            })">
            <i class="fa-solid fa-edit"></i>
            </button>

            <button class="bg-danger" onclick="deleteStudent(${item.id})">
            <i class="fa-solid fa-trash"></i>
            </button>
            </td>
            </tr>
            
          `;
    });
  } else {
  }

  getAllStudendData.innerHTML = dataList;
};

allStudents();

// Data delete LocalStorage
const deleteStudent = (id) => {
  const data = JSON.parse(localStorage.getItem("studentData"));

  const deleteData = data.filter((item) => item.id != id);
  localStorage.setItem("studentData", JSON.stringify(deleteData));
  allStudents();
};

const seeStudent = (id) => {
  const data = JSON.parse(localStorage.getItem("studentData"));

  data.forEach((item) => {
    const {roll, name, father, mother, board} = item;
    if (item.id == id) {
      student.innerHTML = `
      <div class="singleContent">
      <h4>Roll No: ${roll}</h4>
      <h4>Name: ${name}</h4>
      <h5>Father Name: ${father}</h5>
      <h5>Mother Name: ${mother}</h5>
      <h5>Board: ${board}</h5>
      </div>`;
    }
  });
};

function generateUniqueNumber() {
  let numbers = []; // Array to store generated numbers
  let randomNumber;

  do {
    randomNumber = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit number
  } while (numbers.includes(randomNumber)); // Check if the number is already generated

  numbers.push(randomNumber); // Add the number to the array

  return randomNumber;
}

// result set

resultForm.onsubmit = (e) => {
  e.preventDefault();

  const resultFormData = new FormData(e.target);
  const { Bangla, English, Math, Science, Social, Religion, id } =
    Object.fromEntries(resultFormData);

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
  e.target.reset();
  btnClose.click();
};
