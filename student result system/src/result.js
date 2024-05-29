const markSheet = document.getElementById("mark-sheet");

// get search result
const searchData = JSON.parse(localStorage.getItem("searchData"));

if (!searchData) {
  window.location.href = "./index.html";
}
markSheet.innerHTML = `
<div class="result-sheet">
<h2 class="text-center fs-4">${searchData.exam.toUpperCase()} Result ${searchData.year}</h2>
<div class="edu-student-info result">
  <table>
    <tr>
      <td>Roll No</td>
      <td>${searchData.roll}</td>
      <td>Name</td>
      <td>${searchData.name}</td>
    </tr>
    <tr></tr>
    <tr>
      <td>Board</td>
      <td>${searchData.board}</td>
      <td>Father's Name</td>
      <td>${searchData.father}</td>
    </tr>
    <tr>
      <td>Group</td>
      <td>${searchData.group}</td>
      <td>Mother's Name</td>
      <td>${searchData.mother}</td>
    </tr>
    <tr>
      <td>Type</td>
      <td>${searchData.type}</td>
      <td>Date of Birth</td>
      <td>${searchData.dob}</td>
    </tr>
    <tr>
      <td>Result</td>
      <td>${
        resultSystemPro({
            Bangla: searchData.results.Bangla,
            English: searchData.results.English,
            Math: searchData.results.Math,
          Science: searchData.results.Science,
          Social: searchData.results.Social,
          Religion: searchData.results.Religion,
        }).grade
      }</td>
      <td>Institute</td>
      <td>${searchData.inst}</td>
    </tr>
    <tr>
      <td>GPA</td>
      <td colspan="3">${
        resultSystemPro({
            Bangla: searchData.results.Bangla,
            English: searchData.results.English,
            Math: searchData.results.Math,
          Science: searchData.results.Science,
          Social: searchData.results.Social,
          Religion: searchData.results.Religion,
        }).gpa
      }</td>
    </tr>
  </table>
</div>

<h2 class="text-center fs-4">Grade Sheet</h2>
<div class="edu-student-grade-sheet result">
  <table>
    <thead>
      <tr>
        <th>Code</th>
        <th>Subject</th>
        <th>Grade</th>
        <th>GPA</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>101</td>
        <td>BANGLA</td>
        <td>${getGradeAndGPA(searchData.results.Bangla).grade}</td>
        <td>${getGradeAndGPA(searchData.results.Bangla).gpa}</td>
      </tr>
      <tr>
        <td>102</td>
        <td>ENGLISH</td>
        <td>${getGradeAndGPA(searchData.results.English).grade}</td>
        <td>${getGradeAndGPA(searchData.results.English).gpa}</td>
      </tr>
      <tr>
        <td>103</td>
        <td>MATHEMATICS</td>
        <td>${getGradeAndGPA(searchData.results.Math).grade}</td>
        <td>${getGradeAndGPA(searchData.results.Math).gpa}</td>
      </tr>
      <tr>
        <td>104</td>
        <td>SCIENCE</td>
        <td>${getGradeAndGPA(searchData.results.Science).grade}</td>
        <td>${getGradeAndGPA(searchData.results.Science).gpa}</td>
      </tr>
      <tr>
        <td>105</td>
        <td>SOCIAL SCIENCE</td>
        <td>${getGradeAndGPA(searchData.results.Social).grade}</td>
        <td>${getGradeAndGPA(searchData.results.Social).gpa}</td>
      </tr>
      <tr>
        <td>106</td>
        <td>RELIGION</td>
        <td>${getGradeAndGPA(searchData.results.Religion).grade}</td>
        <td>${getGradeAndGPA(searchData.results.Religion).gpa}</td>
      </tr>
    </tbody>
  </table>
  <a href="#" onclick="goToSearchPage()">Search Again</a>
</div>
</div>

`;

const goToSearchPage = () => {
  localStorage.removeItem("searchData");
  window.location.href = "index.html";
};
