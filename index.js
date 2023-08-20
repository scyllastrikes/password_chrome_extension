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
initDOM('x','x')
initDOM('genBtn','generator-btn')
initDOM('generateSelect','generate-select')
initDOM('GSLabel','generator-select-label')
check()
pwdI.value=12
x.style.display="none"
saveBtn.style.display="none"
domainSelect.style.display="none"
selectedDomain.style.display="none"
DSLabel.style.display="none"
generateSelect.style.display="none"
GSLabel.style.display="none"
pwdI.addEventListener('input', () => {
    const selectedValue = pwdI.value
    lenEl.textContent = `Password lenght: ${selectedValue}`
    return pwdI.value
  })
  
pwdBtn.addEventListener('click', function(){
  saveBtn.style.display="block"
  let chars=""
  const genID = localStorage.getItem("genarg")
  switch (genID) {
    case "c":
      chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        break;
    case "n":
      chars="0123456789"
        break;
    case "cn":
      chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        break;
    case "cns":
      chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?'
        break;
    /*case"custom":
      chars ='custominput'
    */
    default:
      chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?'
      break;
    }
  let password = ''
  for (let i = 0; i < pwdI.value; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars.charAt(randomIndex)}
  pwd.textContent=password
})
saveBtn.addEventListener('click',()=>{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    let urlA =tabs[0].url
    let url = extractMainPart(urlA)
  const pwdList = localStorage.getItem(url)
  if ( pwdList === null || pwd.textContent===pwdList) {localStorage.setItem(url, pwd.textContent)}
  else{
    const userChoice = confirm("The current password will be overwritten if you proceed.");
if (userChoice) {localStorage.setItem(url, pwd.textContent)}

  }})
  saveBtn.style.display="none"
  check()
  }) 


function extractMainPart(url) {
  let parsedURL = new URL(url)
  let mainPart = parsedURL.origin
  return mainPart
}

displayBtn.addEventListener('click',()=>{
  [pwdBtn,pwd, passwordEl, saveBtn, lenEl, lenInfo, pwdI, displayBtn, genBtn].forEach(el => el.style.display = "none")
  domainSelect.style.display="block"
  selectedDomain.style.display="block"
  DSLabel.style.display="block"
  x.style.display="block"
  //if the value of chararg is not null display that value by knowing what key is stored under it 
  while (domainSelect.options.length > 1) { 
    domainSelect.remove(1)
  }
// Populate the select element with localStorage keys
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i)
  const option = document.createElement("option")
  option.value = key
  option.text = key
  if (option.text!=="genarg"){domainSelect.appendChild(option)}
}

// Update the selected value display when an option is selected
domainSelect.addEventListener("change", function() {
  const selectedKey = domainSelect.value
  const selectedStoredValue = localStorage.getItem(selectedKey)
  if (selectedStoredValue ===null){ 
    selectedDomain.textContent ="Selected value will appear here."
  }
  else{ 
  selectedDomain.textContent = `the password for ${selectedKey} is :
  
                                      ${selectedStoredValue}`}
})
 })
function initDOM(varName, elementId) {
  window[varName] = document.getElementById(elementId);
}
x.addEventListener('click',()=>{
  [pwdBtn,pwd, genBtn, passwordEl, saveBtn, lenEl, lenInfo, pwdI, displayBtn].forEach(el => el.style.display = "block")
  domainSelect.style.display="none"
  selectedDomain.style.display="none"
  DSLabel.style.display="none"
  x.style.display="none"
  generateSelect.style.display="none"
})

function check(){
  if(localStorage.length===0){displayBtn.style.display="none"}
  else{displayBtn.style.display="block"}
}
genBtn.addEventListener('click',()=>{
  [pwdBtn,pwd, passwordEl, genBtn, saveBtn, lenEl, lenInfo, pwdI, displayBtn].forEach(el => el.style.display = "none")
  x.style.display="block"
  generateSelect.style.display="block"
})
generateSelect.addEventListener('change',()=>{
    localStorage.setItem("genarg",generateSelect.value)
    if (generateSelect.value==="custom"){
      // make a input elem appear to get the customised charlist      
    }
})
