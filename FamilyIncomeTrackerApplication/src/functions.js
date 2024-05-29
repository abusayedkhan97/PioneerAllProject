// alert

const alert = (msg, type = "danger") => {
  return `<p class="alert alert-${type} d-flex justify-content-between">${msg}<button class="btn-close" data-bs-dismiss="alert"></button></p>`;
};

// email validation
const isEmail = (email) => {
  const pattern = /^[a-z0-9\._]{2,}@[a-z0-9]{2,}\.[a-z]{2,5}$/;
  return pattern.test(email);
};

const isMobile = (mobile) => {
  const pattern = /^(\+8801|8801|01)[0-9]{9}$/;

  return pattern.test(mobile);
};

// Data send LocalStorage
const sendDataLS = (key, sendData) => {
  const data = localStorage.getItem(key);
  let lsData;
  if (data) {
    lsData = JSON.parse(data);
  } else {
    lsData = [];
  }

  lsData.push(sendData);

  localStorage.setItem(key, JSON.stringify(lsData));
};

// Data Get LocalStorage
const getDataLS = (key) => {
  const data = localStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  } else {
    false;
  }
};

// Word fixt
function truncateWord(word) {
  if (word.length > 17) {
    return word.slice(0, 17) + "...";
  } else {
    return word;
  }
}

// generateUniqueNumber
function generateUniqueNumber() {
  let numbers = []; // Array to store generated numbers
  let randomNumber;

  do {
    randomNumber = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit number
  } while (numbers.includes(randomNumber)); // Check if the number is already generated

  numbers.push(randomNumber); // Add the number to the array

  return randomNumber;
}

// idPass updateStock
function idPass(id) {
  updateStock.querySelector('input[name="id"]').value = id;
}

// Create a Date object from the date string
function parseDateString(dateString) {
  const date = new Date(dateString);

  // Extract the components of the date
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const day = date.getDate();
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM or PM suffix
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  // Return the components in an object
  return {
    year: year,
    month: month,
    day: day,
    hours: hours,
    minutes: minutes,
    period: ampm,
  };
}

// total income amount
const totalIncomeAmount = () => {
  const getincomeData = getDataLS("incomeData");
  let amount = 0;
  if (getincomeData) {
    getincomeData.forEach((item) => {
      amount += Number(item.amount);
    });
  }

  const totalIncomeAmountHtml = document.querySelector(".totalIncomeAmount");
  totalIncomeAmountHtml.innerHTML = `<h3><i class="fa-solid fa-bangladeshi-taka-sign fa-fw"></i> ${amount}</h3>`;
  return amount;
};

// total expense amount
const totalExpenseAmount = () => {
  const getexpenseData = getDataLS("expenseData");
  let amount = 0;
  if (getexpenseData) {
    getexpenseData.forEach((item) => {
      amount += Number(item.amount);
    });
  }

  const totalExpenseAmountHtml = document.querySelector(
    ".totalExpenseAmountHtml"
  );
  totalExpenseAmountHtml.innerHTML = `<h3><i class="fa-solid fa-bangladeshi-taka-sign fa-fw"></i> ${amount}</h3>`;

  return amount;
};

function cash() {
  const cashhtml = document.querySelector(".cash");
  cashhtml.innerHTML = `<h3><i class="fa-solid fa-bangladeshi-taka-sign fa-fw"></i> ${
    totalIncomeAmount() - totalExpenseAmount()
  }</h3>`;
}

// Data filtring with Date

const Search = (ftomSearchData, toSearchData, data) => {
  const getincomeData = data;

  let dataList = "";
  if (getincomeData) {
    let x = 0;

    // Define the start date and get the current date
    const startDate = new Date(ftomSearchData);
    const now = new Date(toSearchData);
    getincomeData.sort((a, b) => new Date(a.time) - new Date(b.time));
    getincomeData.forEach((item, index) => {
      const itemDate = new Date(item.time);
      const GetdateLS = parseDateString(item.time);

      // Filter for the specified date range
      if (itemDate >= startDate && itemDate <= now) {
        const { discription, mode, amount } = item;
        x++;
        dataList += `<tr>
            <td>${x < 10 ? "0" + x : "" + x}</td>
            <td>${discription}</td>
            <td>${GetdateLS.month}:${GetdateLS.day}:${GetdateLS.year}-${
          GetdateLS.hours
        }:${GetdateLS.minutes} ${GetdateLS.period}</td>
            <td>${mode}</td>
            <td>${amount}</td>
            <td>
            <button class="bg-warning">
            <i class="fa-solid fa-edit"></i>
            </button>

            <button class="bg-danger">
            <i class="fa-solid fa-trash"></i>
            </button>
            </td>
            </tr>`;
      }
    });
  }

  return dataList;
};

// Data filtring with Date SearchIncomeAmount
const SearchAmount = (ftomSearchData, toSearchData, data) => {
  const dateFilteringText = document.getElementById("dateFilteringText");

  const getData = data;
  if (getData) {
    // Define the start date and get the current date
    const startDate = new Date(ftomSearchData);
    
    const now = new Date(toSearchData);
    getData.sort((a, b) => new Date(a.time) - new Date(b.time));

    let amount = 0;
    getData.forEach((item) => {
      const itemDate = new Date(item.time);
      // Filter for the specified date range
      if (itemDate >= startDate && itemDate <= now) {
        amount += Number(item.amount);
      }
    });
    // "YYYY-MM-DD" to "MM-DD-YYYY"
    const originalDate = ftomSearchData;
    const parts = originalDate.split("-");
    const formattedDate = `${parts[1]}-${parts[2]}-${parts[0]}`;

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    dateFilteringText.innerHTML = `Accounts from ${formattedDate} TO ${month}-${day}-${year} = `;

    return amount;
  }
};



// get filter how month day year

function calculateDateDifference(startDate, endDate) {
  // Parse the input dates
  let start = new Date(startDate);
  let end = new Date(endDate);

  // Calculate the difference in milliseconds
  let diffMilliseconds = end - start;

  // Convert the difference to days
  // let diffDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));

  // Initialize years, months, and days difference
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  // Adjust months and years if needed
  if (months < 0) {
      years--;
      months += 12;
  }

  // Adjust days and months if needed
  if (days < 0) {
      months--;
      let previousMonth = (end.getMonth() - 1 + 12) % 12;
      let daysInPreviousMonth = new Date(end.getFullYear(), previousMonth + 1, 0).getDate();
      days += daysInPreviousMonth;
  }

  return {
      years: years,
      months: months,
      days: days,
  };
};




// Income Data pass
function incomeDataPass(id) {
  // local storage data
  const getIncome = getDataLS("incomeData");

  document.querySelector('#incomeUpdateForm input[name="id"]').value = id;

  const form = document.getElementById("incomeUpdateForm");
  getIncome.forEach((item) => {
    if (item.id == id) {
      form.querySelector('input[name="discription"]').value =
        item.discription;
      form.querySelector('input[name="time"]').value = item.time;
      form.querySelector('select[name="mode"]').value = item.mode;
      form.querySelector('input[name="amount"]').value = item.amount;
    }
  });
}


// expense Data pass
function expenseDataPass(id) {
  // local storage data
  const getExpense = getDataLS("expenseData");

  document.querySelector('#expenseUpdateForm input[name="id"]').value = id;

  const form = document.getElementById("expenseUpdateForm");
  getExpense.forEach((item) => {
    if (item.id == id) {
      form.querySelector('input[name="discription"]').value =
        item.discription;
      form.querySelector('input[name="time"]').value = item.time;
      form.querySelector('select[name="mode"]').value = item.mode;
      form.querySelector('input[name="amount"]').value = item.amount;
    }
  });
}
