const pwdBtn = document.getElementById("pwd-btn")
const passwordEl =document.getElementById("password-el")
const pwdI= document.getElementById("pwd-i")
const lenEl=document.getElementById("len-el")
const pwd= document.getElementById("pwd")
const saveBtn=document.getElementById("save-btn")
pwdI.value=12
pwdI.addEventListener('input', () => {
    const selectedValue = pwdI.value
    lenEl.textContent = `Password lenght: ${selectedValue}`
    return pwdI.value
  })

pwdBtn.addEventListener('click', function(){
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
  let password = ''
  console.log()
  for (let i = 0; i < pwdI.value; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars.charAt(randomIndex)
  }
  pwd.textContent=password
  
})
saveBtn.addEventListener('click',()=>{
  const pwdList = localStorage.getItem("Password")
  const storedList = JSON.parse(pwdList)
  let test=["sample"]
  test.push(storedList)
  let x=[]
  if(pwd.textContent!==""){
  if ( pwdList == null) {
    x.push(pwd.textContent)
    const myListJSON = JSON.stringify(x);
    localStorage.setItem("Password", myListJSON)
   }
  else {
    x.push(storedList)
    x.push(pwd.textContent)
    const myListJSON = JSON.stringify(x);
    localStorage.setItem("Password", myListJSON)
  }}}) 