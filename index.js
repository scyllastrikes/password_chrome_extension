let pwdBtn = document.getElementById("pwd-btn")
let passwordEl =document.getElementById("password-el")
let pwdI= document.getElementById("pwd-i")
let lenEl=document.getElementById("len-el")
let pwd= document.getElementById("pwd")
let password=""
pwdI.value=12
pwdI.addEventListener('input', () => {
    const selectedValue = pwdI.value;
    lenEl.textContent = `Password lenght: ${selectedValue}`;
    console.log(pwdI.value)
    return pwdI.value
  });
pwdBtn.addEventListener('click', function(){
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
  let password = '';
  for (let i = 0; i < pwdI.value; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars.charAt(randomIndex);
  }
  pwd.textContent=password
})
