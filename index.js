let pwdBtn = document.getElementById("pwd-btn")
let passwordEl =document.getElementById("password-el")
let pwdI= document.getElementById("pwd-i")
let lenEl=document.getElementById("len-el")
pwdI.value=12
pwdI.addEventListener('input', () => {
    const selectedValue = pwdI.value;
    lenEl.textContent = `Password lenght: ${selectedValue}`;
    console.log(pwdI.value)
    return pwdI.value
  });
pwdBtn.addEventListener('click', function(){
    
})
