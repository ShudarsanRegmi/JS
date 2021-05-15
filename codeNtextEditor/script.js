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
    item.innerHTML += `<button class="copyBtn" title="Copy To Clipboard!!" onclick="copyToClipboard(this.parentNode,this)">Copy!!</button>`;
  })


}
function copyToClipboard(text,btn) {
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
        console.log("text copied to clipboard");
        // Changing the innerText temporarily
        btn.innerText = "Copied";
        btn.style.backgroundColor = "rgb(209, 231, 221)";
        btn.style.borderColor = "rgb(209, 231, 221)";
        btn.style.color = "rgb(0, 128, 0)";

        setTimeout(()=>{
          btn.innerText = "Copy!!";
          btn.style.backgroundColor = "#fff";
          btn.style.borderColor = "#fff";
          btn.style.color = "rgb(13, 100, 253)";
        },500)
        tempDiv.remove();
        tempTextarea.remove();
        return true;
    }

}

submitBtn.addEventListener("click",event => {
  console.log(outputarea.innerHTML);

})
codearea.value = `
[[[
#include<stdio.h> the quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dgo.
#include<conio.h>
int main() {
printf("hello world");
return 0;
}
]]]
Here is my another block of code:
[[[cls
input "Enter  your name";n$
print" Your name is ";;n$
end ]]]
{{{<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT" crossorigin="anonymous"></script>}}}
`;
