const pwdBtn = document.getElementById("pwd-btn")
const passwordEl =document.getElementById("password-el")
const pwdI= document.getElementById("pwd-i")
const lenEl=document.getElementById("len-el")
const pwd= document.getElementById("pwd")
const saveBtn=document.getElementById("save-btn")
const displayBtn=document.getElementById("display-btn")
pwdI.value=12
checkpwds()
saveBtn.style.display="none"
pwdI.addEventListener('input', () => {
    const selectedValue = pwdI.value
    lenEl.textContent = `Password lenght: ${selectedValue}`
    return pwdI.value
  })

pwdBtn.addEventListener('click', function(){
  checkpwds()
  saveBtn.style.display="block"
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
  checkpwds()
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    let url =tabs[0].url
  const pwdList = localStorage.getItem(url)
  const storedList = JSON.parse(pwdList)
  let x=[]

  if(pwd.textContent!==""){
  if ( pwdList === null) {
    x.push(pwd.textContent)
    const myListJSON = JSON.stringify(x);
    localStorage.setItem(url, myListJSON)
   }

  else if (pwd.textContent!==storedList[storedList.length-1]){
    x.push(storedList)
    x.push(pwd.textContent)
    const myListJSON = JSON.stringify(x);
    localStorage.setItem(url, myListJSON)
  }}})}) 


function checkpwds(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    let url =tabs[0].url
  const pwdList = localStorage.getItem(url)
  if ( pwdList !== null) {
    displayBtn.style.display="block"
   }
  else{
    displayBtn.style.display="none"
  }
})}

 

//.addEventListener('click',()=>{