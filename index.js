
//declarations and func calls
let variableNames = ['pwdBtn','passwordEl','pwdI','lenEl','pwd','saveBtn','displayBtn','lenInfo', 'domainSelect','selectedDomain','DSLabel','x','genBtn','generateSelect','GSLabel','moreBtn','lessBtn']
let elementIds = ['pwd-btn','password-el','pwd-i','len-el','pwd','save-btn','display-btn' ,'len-info','domain-select','selected-domain','domain-select-label','x','generator-btn','generate-select','generator-select-label','more-btn','less-btn']
initDOMList(variableNames, elementIds)
check()
pwdI.value=12
let items=[saveBtn,displayBtn,genBtn,lessBtn,lenEl,lenInfo,pwdI,x,domainSelect,selectedDomain,DSLabel,generateSelect,GSLabel]
items.forEach(el => el.style.display = "none")
state()
//eventlisteners

moreBtn.addEventListener('click', ()=>{
  [saveBtn, displayBtn , genBtn, lessBtn].forEach(el => el.style.display = "block")
  moreBtn.style.display="none"
  localStorage.setItem("optionarg","+")
})
lessBtn.addEventListener('click',()=>{
  [saveBtn, displayBtn , genBtn, lessBtn].forEach(el => el.style.display = "none")
  moreBtn.style.display="block"
  localStorage.setItem("optionarg","-")
})

pwdI.addEventListener('input', () => {
    const selectedValue = pwdI.value
    lenEl.textContent = `Password lenght: ${selectedValue}`
    return pwdI.value
  })
  
pwdBtn.addEventListener('click', function(){
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
  if (localStorage.getItem("passwordarg")===null){pwd.textContent=password}
  localStorage.setItem("passwordarg",password)
  pwd.dataset.value = password
  pwd.innerText = "XXXXXXXXxxx"
  const letters = chars
  let interval = null

  let iteration = 0
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    pwd.innerText = pwd.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return pwd.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    if(iteration >= pwd.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 30);
})
saveBtn.addEventListener('click',()=>{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    let urlA =tabs[0].url
    let url = extractMainPart(urlA)
  const pwdList = localStorage.getItem(url)
  if ( pwdList === null  ) {localStorage.setItem(url, pwd.textContent)}
  else if (pwd.textContent===pwdList){alert("The password is already saved.")}
  else{
    const userChoice = confirm("The current password will be overwritten if you proceed.");
if (userChoice) {localStorage.setItem(url, pwd.textContent)}

  }})
  }) 

  
displayBtn.addEventListener('click',()=>{
  [pwdBtn,pwd, passwordEl, saveBtn, lenEl, lenInfo, pwdI, displayBtn, genBtn,lessBtn,moreBtn].forEach(el => el.style.display = "none")
  let items=[domainSelect,selectedDomain,DSLabel,x]
  items.forEach(el => el.style.display = "block")
  while (domainSelect.options.length > 1) { 
    domainSelect.remove(1)
  }

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i)
  const option = document.createElement("option")
  option.value = key
  option.text = key
  if (option.text!=="genarg"&&option.text!=="optionarg"&&option.text!=="passwordarg"){domainSelect.appendChild(option)}
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

x.addEventListener('click',()=>{
  [pwdBtn,pwd, GSLabel,  passwordEl,  moreBtn].forEach(el => el.style.display = "block")
  let items=[displayBtn,genBtn,lessBtn,lenEl,lenInfo,pwdI,x,domainSelect,selectedDomain,DSLabel,generateSelect,GSLabel]
  items.forEach(el => el.style.display = "none")
  saveBtn.style.display="block"
  state()
})

genBtn.addEventListener('click',()=>{
  [pwdBtn,pwd, passwordEl, genBtn, saveBtn, lenEl, lenInfo, pwdI, displayBtn,moreBtn,lessBtn].forEach(el => el.style.display = "none")
  let items=[lenEl,lenInfo,pwdI,x,generateSelect,GSLabel]
  items.forEach(el => el.style.display = "block")
})
generateSelect.addEventListener('change',()=>{
    localStorage.setItem("genarg",generateSelect.value)
    if (generateSelect.value==="custom"){
      // make a input elem appear to get the customised charlist      
    }
})


//functions
function initDOMList(varNames, elementIds) {
  for (let i = 0; i < varNames.length; i++) {
    window[varNames[i]] = document.getElementById(elementIds[i]);
  }
}

function state(){
  let state = localStorage.getItem("optionarg")
  console.log(state)
  if (state===null || state==="-"){
    [saveBtn, displayBtn , genBtn, lessBtn].forEach(el => el.style.display = "none")
    moreBtn.style.display="block" 
  }
  else {
    [saveBtn, displayBtn , genBtn, lessBtn].forEach(el => el.style.display = "block")
    moreBtn.style.display="none"
  }
  let pwdd = localStorage.getItem("passwordarg")
  if (pwdd===null){pwd.textContent="click on the green button"}
  else{pwd.textContent=pwdd}
}


function extractMainPart(url) {
  let parsedURL = new URL(url)
  let mainPart = parsedURL.origin
  return mainPart
}


function check(){
  if(localStorage.length===0){displayBtn.style.display="none"}
  else{displayBtn.style.display="block"}
}
