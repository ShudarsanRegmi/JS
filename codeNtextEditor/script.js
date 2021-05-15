let codearea = document.getElementById("codearea");
let outputarea = document.getElementById("outputarea");
let submitBtn = document.getElementById("submitBtn");
let codeBoxes = document.getElementsByClassName("code");
codearea.addEventListener("keyup",event => {
  analyzeHTML(codearea.value);
})
function analyzeHTML(html) {
  let newhtml = html;
  newhtml = newhtml.replace(/</g,"&lt");
  newhtml = newhtml.replace(/>/g,"&gt");
  newhtml = newhtml.replace(/\[\[\[/g,`<div class="code">`);
  newhtml = newhtml.replace(/\]\]\]/g,`</div>`);
  // making highlighlight box with {{{ }}}
  newhtml = newhtml.replace(/\{\{\{/g,`<div class="highlight">`);
  newhtml = newhtml.replace(/\}\}\}/g,`</div>`);
  // making bold text feature with ((( )))
  newhtml = newhtml.replace(/\(\(\(/g,`<div class="boldText">`);
  newhtml = newhtml.replace(/\)\)\)/g,`</div>`);
  // inner html doesn't render line beaks. So replacing line breaks with html <br>
  newhtml=newhtml.replace(/\n/g, "<br>");
  outputarea.innerHTML = newhtml;
  codeBoxes = document.getElementsByClassName("code");
  Array.from(codeBoxes).forEach((item,index) => {
    console.log(item);
    item.innerHTML += `<button class="copyBtn" onclick="copyToClipboard(this.parentNode)">Copy!!</button>`;
  })


}
function copyToClipboard(text) {
  let newstr = "";
  console.log(text);
  console.log(text.childNodes);
  let childs = text.childNodes;
  let arr = Array.from(childs);
  // console.log(arr);
  arr.forEach(item => {
    if(item.nodeName == "#text") {
      newstr += item.nodeValue.trim() + "&";
    }
  })
  console.log(newstr);
  let newStr2 = newstr.replace(/&/g,"\n");
  console.log(newStr2);
  text = newStr2;
  console.log(text);
  // Creating temporary div
  let tempDiv = document.createElement("div")
    document.body.appendChild(tempDiv);
    tempDiv.innerText = newStr2;
    // Creating text area
    let tempTextarea = document.createElement("textarea");
    document.body.appendChild(tempTextarea);
    console.log(tempDiv.innerText)
    tempTextarea.innerHTML = tempDiv.innerText;
    tempTextarea.select();
    tempTextarea.setSelectionRange(0,99999);
    if(document.execCommand("copy")) {
        console.log("text copied to clipboard")
        tempDiv.remove();
        tempTextarea.remove();
        return true;
    }

}

submitBtn.addEventListener("click",event => {
  console.log(outputarea.innerHTML);

})
// codearea.value = `[[[code block 1]]] [[[code block 2]]]`;
codearea.value = `[[[
  this is
  multiline
  text
  node]]]`;
