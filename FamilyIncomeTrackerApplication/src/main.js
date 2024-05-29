const getIncome = document.getElementById("getIncome");

const allIncome = () => {
  const getincomeData = getDataLS("incomeData");

  let dataList = "";
  if (getincomeData) {
    let x = 0;

    getincomeData.sort((a, b) => new Date(a.time) - new Date(b.time));

    getincomeData.forEach((item, index) => {
      const GetdateLS = parseDateString(item.time);

      const { discription, mode, amount, id } = item;
      x++;
      dataList += `<tr>
            <td>${x < 10 ? "0" + x : "" + x}</td>
            <td>${discription}</td>
            <td>${GetdateLS.month}:${GetdateLS.day}:${GetdateLS.year}</td>
            <td>${mode}</td>
            <td>${amount}</td>
            <td>

            <button class="bg-warning" data-bs-toggle="modal" data-bs-target="#incomeEdite" onclick="incomeDataPass(${id})">
            <i class="fa-solid fa-edit"></i>
            </button>

            <button class="bg-danger" onclick="deleteIncome(${id})">
            <i class="fa-solid fa-trash"></i>
            </button>

            </td>
            </tr>
            
          `;
    });
  }

  getIncome.innerHTML = dataList;
};

document.addEventListener("DOMContentLoaded", function () {
  allIncome();
});

// Income Data delete LocalStorage
const deleteIncome = (id) => {
  const data = JSON.parse(localStorage.getItem("incomeData"));

  if (confirm("Are you sure that you want to delete this Item?")) {
    const deleteData = data.filter((item) => item.id != id);
    localStorage.setItem("incomeData", JSON.stringify(deleteData));

    allIncome();
  }
};


// Expense output------------------------------------------
const getExpense = document.getElementById("getExpense");

const allExpense = () => {
  const getExpenseData = getDataLS("expenseData");

  let dataList = "";
  if (getExpenseData) {
    let x = 0;
    getExpenseData.sort((a, b) => new Date(a.time) - new Date(b.time));
    getExpenseData.forEach((item, index) => {
      const GetdateLS = parseDateString(item.time);

      const { discription, mode, amount, id } = item;
      x++;
      dataList += `<tr>
            <td>${x < 10 ? "0" + x : "" + x}</td>
            <td>${discription}</td>
            <td>${GetdateLS.month}:${GetdateLS.day}:${GetdateLS.year}</td>
            <td>${mode}</td>
            <td>${amount}</td>
            <td>

            <button class="bg-warning" data-bs-toggle="modal" data-bs-target="#expenseEdite" onclick="expenseDataPass(${id})">
            <i class="fa-solid fa-edit"></i>
            </button>

            <button class="bg-danger" onclick="deleteExpense(${id})">
            <i class="fa-solid fa-trash"></i>
            </button>

            </td>
            </tr>
            
          `;
    });
  }

  getExpense.innerHTML = dataList;
};

document.addEventListener("DOMContentLoaded", function () {
  allExpense();
});

// Expense Data delete LocalStorage
const deleteExpense = (id) => {
  const data = JSON.parse(localStorage.getItem("expenseData"));

  if (confirm("Are you sure that you want to delete this Item?")) {
    const deleteData = data.filter((item) => item.id != id);
    localStorage.setItem("expenseData", JSON.stringify(deleteData));

    allExpense();
  }
};


// Dta filtering with Date------------------------------
const filterBtn = document.querySelector("#filterBtn");
filterBtn.onclick = () => {
  const getincomeData = getDataLS("incomeData");
  const getExpenseData = getDataLS("expenseData");

  // 
  const ftomSearchData = document.querySelector('.ftomSearchData').value;
  const toSearchData = document.querySelector('.toSearchData').value;

  // income html
  const totalIncomeAmountHtml = document.querySelector(".totalIncomeAmount");
  // Expernse html
  const totalExpenseAmountHtml = document.querySelector(".totalExpenseAmountHtml");
  // Cash html
  const cashhtml = document.querySelector(".cash");
  
  // filterTotalDays
  const filterTotalDays = document.getElementById('filterTotalDays');

  if (toSearchData > ftomSearchData) {
    
  const totalAmount = SearchAmount(ftomSearchData, toSearchData, getincomeData) - SearchAmount(ftomSearchData, toSearchData, getExpenseData);
  

  const getDaysFromFilter = calculateDateDifference(ftomSearchData, toSearchData);
  console.log(getDaysFromFilter);

  filterTotalDays.innerHTML = `${getDaysFromFilter.years > 0 ? getDaysFromFilter.years+" Years" : ""} ${getDaysFromFilter.months > 0 ? getDaysFromFilter.months+" Months" : ""} ${getDaysFromFilter.days > 0 ? getDaysFromFilter.days+" Days" : ""}`;

  getIncome.innerHTML = Search(ftomSearchData, toSearchData, getincomeData);
  getExpense.innerHTML = Search(ftomSearchData, toSearchData, getExpenseData);
  
  totalIncomeAmountHtml.innerHTML = `<h3><i class="fa-solid fa-bangladeshi-taka-sign fa-fw"></i> ${SearchAmount(ftomSearchData, toSearchData, getincomeData)}</h3>`;

  totalExpenseAmountHtml.innerHTML = `<h3><i class="fa-solid fa-bangladeshi-taka-sign fa-fw"></i> ${SearchAmount(ftomSearchData, toSearchData, getExpenseData)}</h3>`;

  
  cashhtml.innerHTML = `<h3><i class="fa-solid fa-bangladeshi-taka-sign fa-fw"></i> ${totalAmount}</h3>`;
  }else{
    filterTotalDays.innerHTML = "Data Not found! Please enter valid from-Date and to-date";
  }
};