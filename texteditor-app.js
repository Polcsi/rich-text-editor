
document.getElementById("editor1").innerHTML = localStorage["text"] || "This text is automatically saved every second :) "; // default text
document.getElementById('fillbackground').value = localStorage['fill'] || "rgb(0,0,0)";
document.getElementById('myBackColor').value = localStorage['background'] || "rgb(0,0,0)";
document.getElementById('myColor').value = localStorage['color'] || "rgb(0,0,0)";
document.execCommand('enableObjectResizing', false, null);

/* setInterval(function() {
  // fuction that is saving the innerHTML of the div
  localStorage["text"] = document.getElementById("editor1").innerHTML; // content div
}, 1000); */

function saveText()
{
    localStorage["text"] = document.getElementById("editor1").innerHTML;
}
function chooseColor(){
    var mycolor = document.getElementById("myColor").value;
    document.execCommand('foreColor', false, mycolor);
    localStorage['color'] = mycolor;
}
function changeBackgroundColor()
{
    var mycolor = document.getElementById('myBackColor').value;
    document.execCommand('backColor', false, mycolor);
    localStorage['background'] = mycolor;
}
function changeFont(){
    var myFont = document.getElementById("input-font").value;
    document.execCommand('fontName', false, myFont);
}
function changeSize(){
    var mysize = document.getElementById("fontSize").value;
    document.execCommand('fontSize', false, mysize);
}
function checkDiv(){
    var editorText = document.getElementById("editor1").innerHTML;
    if(editorText === ''){
        document.getElementById("editor1").style.border = '5px solid red';
    }
}
function removeBorder(){
    document.getElementById("editor1").style.border = '1px solid transparent';
}
function Undo()
{
    document.execCommand( 'undo',false,null);
}
function Redo()
{
    document.execCommand('redo',false,null);
}
function torles()
{
    document.execCommand('delete', false, null)
}
function removeFormat()
{
    document.execCommand('removeFormat',false,null);
    document.execCommand('formatBlock', false, '<p>');
}
function insertImage()
{
    var imageUrl = document.getElementById('imagepath').value;
    if(imageUrl != "")
    {
        document.execCommand('insertImage', false, imageUrl)
    } else {}
}
function insertHeading()
{
    selection = document.getElementById('heading').value;
    document.execCommand('formatBlock', false, `${selection}`)
}

var pinned = true;
function pinNavbar()
{
    var fieldset = document.getElementById('fieldset');
    var thumback = document.getElementById('thumback');
    if(pinned)
    {
        fieldset.style.position = "relative";
        thumback.style.transform ="rotate(-40deg)"
        pinned = false;
    } else {
        fieldset.style.position = "sticky";
        thumback.style.transform ="rotate(0deg)"
        pinned = true;
    }
}

document.onkeydown = keydown; 

function keydown (evt) { 

    if (!evt) evt = event; 

    if(evt.ctrlKey && evt.KeyCode === 90) { Undo(); }
    if(evt.ctrlKey && evt.KeyCode === 89) { Redo(); }
    if(evt.KeyCode === 46) { torles(); }
    if (evt.keyCode === 9) { // tab key
        evt.preventDefault();  // this will prevent us from tabbing out of the editor

        // now insert four non-breaking spaces for the tab key
        var editor = document.getElementById("editor1");
        var doc = editor.ownerDocument.defaultView;
        var sel = doc.getSelection();
        var range = sel.getRangeAt(0);

        var tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
        range.insertNode(tabNode);

        range.setStartAfter(tabNode);
        range.setEndAfter(tabNode); 
        sel.removeAllRanges();
        sel.addRange(range);
    }
    /* if (evt.ctrlKey && evt.altKey && evt.keyCode === 115) {

        alert("CTRL+ALT+F4"); 

    } else if (evt.shiftKey && evt.keyCode === 9) { 

        alert("Shift+TAB");

    }  */
}

function codeExampleBack(param)
{
    if(param == "background")
    {
        document.execCommand('formatBlock', false, '<div>');
        var listId = window.getSelection().focusNode.parentNode;
        $(listId).addClass('codeexampleback');
    } else if(param == "code") {
        selection = window.getSelection().getRangeAt(0).cloneContents();
        span = document.createElement('span');
        span.appendChild(selection);
        wrappedselection = '<span class="code">'+span.innerHTML+'</span>';
        document.execCommand('insertHTML', false, wrappedselection);
    }

}

function fillDiv()
{
    var color = document.getElementById('fillbackground').value;
    selection = window.getSelection().getRangeAt(0).cloneContents();
    div = document.createElement('div');
    div.appendChild(selection);
    wrappedselection = `<div style='background-color: ${color}; padding: 8px;'>` + div.innerHTML+'</div>';
    document.execCommand('insertHTML', false, wrappedselection);
    localStorage['fill'] = color;
}

function insertLink()
{
    link = window.getSelection();
    document.execCommand('createLink', false, link);
}

function resizeImage(param)
{
    var iwidth = document.getElementById('objectwidth').value +"%";
    selection = window.getSelection().getRangeAt(0).cloneContents();
    div = document.createElement('div');
    div.appendChild(selection);
    if(param == "center") {
        wrappedselection = `<div style='display: grid; justify-content: center; grid-template-columns: ${iwidth};'>` + div.innerHTML+'</div>';
        document.execCommand('insertHTML', false, wrappedselection);
    } else if(param == "left") {
        wrappedselection = `<div style='display: grid; justify-content: left; grid-template-columns: ${iwidth};'>` + div.innerHTML+'</div>';
        document.execCommand('insertHTML', false, wrappedselection);
    } else if(param == "right") {
        wrappedselection = `<div style='display: grid; justify-content: right; grid-template-columns: ${iwidth};'>` + div.innerHTML+'</div>';
        document.execCommand('insertHTML', false, wrappedselection);
    }
    
}

function openFill()
{
    document.getElementById('fillbackground').click();
}
function openBorder()
{
    document.getElementById('border-color').click();
}

function addBorder()
{
    var color = document.getElementById('border-color').value;
    selection = window.getSelection().getRangeAt(0).cloneContents();
    div = document.createElement('div');
    div.appendChild(selection);
    wrappedselection = `<div style='border: 3px solid ${color}; padding: 10px; border-radius:5px; margin-bottom: 15px'>` + div.innerHTML+'</div>';
    document.execCommand('insertHTML', false, wrappedselection);
}

function addNote()
{
    document.execCommand('formatBlock', false, '<div>');
    var listId = window.getSelection().focusNode.parentNode;
    $(listId).addClass('note');
}

function addWarn()
{
    document.execCommand('formatBlock', false, '<div>');
    var selection = window.getSelection().focusNode.parentNode;
    $(selection).addClass('warn');
}