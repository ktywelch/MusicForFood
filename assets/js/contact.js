const submit = document.querySelector(".submit");
const lastName = document.querySelector(".last-name");
const firstName = document.querySelector(".first-name");
const mail = document.querySelector(".email");
const output=[];

// If the value is nothing just return
$(document).ready(function(){

 $(".submit").click(function(event){
  event.preventDefault();


  if (firstName.value.length < 1) {
    $(".alert").html("first-Name field required");
  } else {
    localStorage.setItem("firstName", firstName.value);
  }

  if (lastName.value.length < 1) {
    $(".alert").html("last-Name field required");
  } else {
    localStorage.setItem("lastName", lastName.value);
  }
  if (mail.value.length < 1) {
    $(".alert").html("email field required");
  } else {
    localStorage.setItem("email", mail.value);
  }
  
  function storage(){
      const achive = [];
      for (let i = 0; i < localStorage.length; i++){
          achive[i] = localStorage.getItem(localStorage.key(i))
          console.log(achive)
      }
  }
  output.push(achive);
  output +=storage
    });
});
