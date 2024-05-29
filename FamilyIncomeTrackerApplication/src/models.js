// Add Income listing with source
document.addEventListener("DOMContentLoaded", function () {
  const incomeForm = document.getElementById("incomeForm");
  const IncomeModalbtn = document.querySelector(".IncomeModalbtn");
  const incomeAlertText = document.getElementById("incomeAlertText");

  incomeForm.addEventListener("submit", function (e) {
    e.preventDefault();

    //get data
    const formData = new FormData(e.target);
    const { discription, time, mode, amount } = Object.fromEntries(formData);

    if (!discription || !time || !mode || !amount) {
      incomeAlertText.innerHTML = alert("All fild are requard");
    } else {
      sendDataLS("incomeData", {
        id: generateUniqueNumber(),
        discription,
        time,
        mode,
        amount,
      });

      // Show success message with animation
      const successMessage = document.getElementById("successMessage");
      successMessage.classList.remove("hidden");
      successMessage.classList.add("show");

      // Hide the success message after 3 seconds
      setTimeout(() => {
        successMessage.classList.remove("show");
        successMessage.classList.add("hidden");
      }, 3000);

      e.target.reset();
      IncomeModalbtn.click();
      allIncome();
      totalIncomeAmount();

      // total Expense Amount
      cash();
    }
  });
});

// total Income Amount
totalIncomeAmount();

// Add Expense listing with source
document.addEventListener("DOMContentLoaded", function () {
  const expenseForm = document.getElementById("expenseForm");
  const expenseModalbtn = document.querySelector(".expenseModalbtn");
  const expenseAlertText = document.getElementById("expenseAlertText");

  expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    //get data
    const formData = new FormData(e.target);
    const { discription, time, mode, amount } = Object.fromEntries(formData);

    if (!discription || !time || !mode || !amount) {
      expenseAlertText.innerHTML = alert("All fild are requard");
    } else {
      sendDataLS("expenseData", {
        id: generateUniqueNumber(),
        discription,
        time,
        mode,
        amount,
      });

      // Show success message with animation
      const expenseSuccessMessage = document.getElementById(
        "expenseSuccessMessage"
      );
      expenseSuccessMessage.classList.remove("hidden");
      expenseSuccessMessage.classList.add("show");

      // Hide the success message after 3 seconds
      setTimeout(() => {
        expenseSuccessMessage.classList.remove("show");
        expenseSuccessMessage.classList.add("hidden");
      }, 3000);

      e.target.reset();
      expenseModalbtn.click();
      allExpense();
      // total Expense Amount
      totalExpenseAmount();

      // total Expense Amount
      cash();
    }
  });
});

// total Expense Amount
totalExpenseAmount();

// total Expense Amount
cash();





  // Update income data
  const incomeUpdateForm = document.getElementById("incomeUpdateForm");
  incomeUpdateForm.onsubmit = (e) => {
    const btnClose = document.querySelector(".income-update-btn-close");
    e.preventDefault();

    const incomeUpdateFormData = new FormData(e.target);
    const { discription, time, mode, amount, id } =
      Object.fromEntries(incomeUpdateFormData);

    const getDataLS = JSON.parse(localStorage.getItem("incomeData"));

    // Update data
    const updateData = getDataLS.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          discription,
          time,
          mode,
          amount,
        };
      } else {
        return item;
      }
    });

    //Update data ls

    localStorage.setItem("incomeData", JSON.stringify(updateData));
    allIncome();
    btnClose.click();
  };


  // Update Expense data
  const expenseUpdateForm = document.getElementById("expenseUpdateForm");
  expenseUpdateForm.onsubmit = (e) => {
    const btnClose = document.querySelector(".expense-update-btn-close");
    e.preventDefault();

    const expenseFormData = new FormData(e.target);
    const { discription, time, mode, amount, id } =
      Object.fromEntries(expenseFormData);

    const getDataLS = JSON.parse(localStorage.getItem("expenseData"));

    // Update data
    const updateData = getDataLS.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          discription,
          time,
          mode,
          amount,
        };
      } else {
        return item;
      }
    });

    //Update data ls

    localStorage.setItem("expenseData", JSON.stringify(updateData));
    allExpense();
    btnClose.click();
  };