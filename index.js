initDOM('pwdBtn','pwd-btn')
initDOM('passwordEl','password-el')
initDOM('pwdI','pwd-i')
initDOM('lenEl','len-el')
initDOM('pwd','pwd')
initDOM('saveBtn','save-btn')
initDOM('displayBtn','display-btn')
initDOM('lenInfo', 'len-info')
initDOM('domainSelect','domain-select')
initDOM('selectedDomain','selected-domain')
initDOM('DSLabel','domain-select-label')

pwdI.value=12
checkpwds()
saveBtn.style.display="none"
domainSelect.style.display="none"
selectedDomain.style.display="none"
DSLabel.style.display="none"
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
    password += chars.charAt(randomIndex)}
  pwd.textContent=password
})
saveBtn.addEventListener('click',()=>{
  checkpwds()
  let x =[]
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    let urlA =tabs[0].url
    let url = extractMainPart(urlA)
  const pwdList = localStorage.getItem(url)


  if(pwd.textContent!==""){
  if ( pwdList === null) {
    x.push(pwd.textContent)
    const myListJSON = JSON.stringify(x)
    localStorage.setItem(url, myListJSON)
   }

  else if (pwd.textContent!==storedList[storedList.length-1]){
    x.push(storedList)
    x.push(pwd.textContent)
    const myListJSON = JSON.stringify(x)
    localStorage.setItem(url, myListJSON)
  }}})}) 


function checkpwds(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    let urlA =tabs[0].url
    let url = extractMainPart(urlA)
  const pwdList = localStorage.getItem(url)
  if ( pwdList !== null) {displayBtn.style.display="block"}
  else{displayBtn.style.display="none"}
})}


function extractMainPart(url) {
  let parsedURL = new URL(url)
  let mainPart = parsedURL.origin
  return mainPart
}

displayBtn.addEventListener('click',()=>{
  [pwdBtn,pwd, passwordEl, saveBtn, lenEl, lenInfo, pwdI, displayBtn].forEach(el => el.style.display = "none")
  domainSelect.style.display="block"
 selectedDomain.style.display="block"
 DSLabel.style.display="block"
// Populate the select element with localStorage keys
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i)
  const option = document.createElement("option")
  option.value = key
  option.text = key
  domainSelect.appendChild(option)
}

// Update the selected value display when an option is selected
domainSelect.addEventListener("change", function() {
  const selectedKey = domainSelect.value
  const selectedStoredValue = localStorage.getItem(selectedKey);
  selectedDomain.textContent = `the password for ${selectedKey} is :
  
                                      ${selectedStoredValue}`
})
 })
function initDOM(varName, elementId) {
  window[varName] = document.getElementById(elementId);
}


