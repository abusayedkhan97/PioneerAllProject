// alert 

const myalert = (msg, type="danger")=>{
    return `<p class="alert alert-${type} d-flex justify-content-between">${msg}<button class="btn-close" data-bs-dismiss="alert"></button></p>`;
  }
  
  // email validation
  const isEmail = (email)=>{
    const pattern = /^[a-z0-9\._]{2,}@[a-z0-9]{2,}\.[a-z]{2,5}$/;
    return pattern.test(email);
  }
  
  const isMobile = (mobile)=>{
    const pattern = /^(\+8801|8801|01)[0-9]{9}$/;
  
    return pattern.test(mobile);
  }
  // Data send LocalStorage
  const sendDataLS = (key, stdData)=>{
    const data = localStorage.getItem(key);
    let lsData;
    if (data) {
      lsData = JSON.parse(data);
    }else{
      lsData = [];
    }
  
    lsData.push(stdData);
  
    localStorage.setItem(key, JSON.stringify(lsData));
  }
  
  
  // Data Get LocalStorage
  
  const getDataLS = (key)=>{
    const data = localStorage.getItem(key);
    
    if (data) {
      return JSON.parse(data);
    }else{
      false
    }
  }
  
  // add result id pass

  function idPass(id) {
    resultForm.querySelector('input[name="id"]').value = id;
  }


  // Edit all subject data pass

  function dataPass(id) {
    // local storage data
    const getStudents = getDataLS("studentData");
  
    document.querySelector('#updatestudent input[name="id"]').value = id;
  
    const form = document.getElementById("updatestudent");
    getStudents.forEach((item) => {
      if (item.id == id) {
        form.querySelector('input[name="Bangla"]').value = item.results.Bangla;
        form.querySelector('input[name="English"]').value = item.results.English;
        form.querySelector('input[name="Math"]').value = item.results.Math;
        form.querySelector('input[name="Science"]').value = item.results.Science;
        form.querySelector('input[name="Social"]').value = item.results.Social;
        form.querySelector('input[name="Religion"]').value = item.results.Religion;
      }
    });
  }

// rendom number
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 9) + 1;
  };

  const timeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - timestamp) / 1000);
  
    let interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) {
      return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  };


  // Result system pro
  const getGradeAndGPA = (mark) => {
    let grade;
    let gpa;
  
    if (mark >= 0 && mark < 33) {
      grade = "F";
      gpa = 0;
    } else if (mark >= 33 && mark < 40) {
      grade = "D";
      gpa = 1;
    } else if (mark >= 40 && mark < 50) {
      grade = "C";
      gpa = 2;
    } else if (mark >= 50 && mark < 60) {
      grade = "B";
      gpa = 3;
    } else if (mark >= 60 && mark < 70) {
      grade = "A-";
      gpa = 3.5;
    } else if (mark >= 70 && mark < 80) {
      grade = "A";
      gpa = 4;
    } else if (mark >= 80 && mark <= 100) {
      grade = "A+";
      gpa = 5;
    } else {
      grade = "invalid";
      gpa = "invalid";
    }
  
    return {
      gpa: gpa,
      grade: grade,
    };
  };



  const resultSystemPro = (marks) => {
    const { Bangla, English, Math, Science, Social, Religion } = marks;

    const totalGpaAvg = (
      (getGradeAndGPA(Bangla).gpa +
        getGradeAndGPA(English).gpa +
        getGradeAndGPA(Math).gpa +
        getGradeAndGPA(Science).gpa +
        getGradeAndGPA(Social).gpa +
        getGradeAndGPA(Religion).gpa) /
      6
    ).toFixed(2);
  
    if (
      Bangla >= 33 &&
      English >= 33 &&
      Math >= 33 &&
      Science >= 33 &&
      Social >= 33 &&
      Religion >= 33
    ) {
      if (totalGpaAvg >= 0 && totalGpaAvg < 1) {
        return {
          gpa: totalGpaAvg,
          grade: "F",
        };
      } else if (totalGpaAvg >= 1 && totalGpaAvg < 2) {
        return {
          gpa: totalGpaAvg,
          grade: "D",
        };
      } else if (totalGpaAvg >= 2 && totalGpaAvg < 3) {
        return {
          gpa: totalGpaAvg,
          grade: "C",
        };
      } else if (totalGpaAvg >= 3 && totalGpaAvg < 3.5) {
        return {
          gpa: totalGpaAvg,
          grade: "B",
        };
      } else if (totalGpaAvg >= 3.5 && totalGpaAvg < 4) {
        return {
          gpa: totalGpaAvg,
          grade: "A-",
        };
      } else if (totalGpaAvg >= 4 && totalGpaAvg < 5) {
        return {
          gpa: totalGpaAvg,
          grade: "A",
        };
      } else if (totalGpaAvg >= 5) {
        return {
          gpa: totalGpaAvg,
          grade: "A+",
        };
      }
    } else {
      return {
        gpa: 0,
        grade: "F",
      };
    }
  };
