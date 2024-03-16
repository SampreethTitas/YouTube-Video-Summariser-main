const btn1 = document.getElementById("summarise");
btn1.addEventListener("click", function() {
    btn1.disabled = true;
    btn1.innerHTML = "Summarising...";
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        var url = tabs[0].url;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://127.0.0.1:5000/summary?url=" + url, true);
        xhr.onload = function() {
            var text = xhr.responseText;
            const p = document.getElementById("output");
            p.innerHTML = text;
            btn1.disabled = false;
            btn1.innerHTML = "Summarise";
        }
        xhr.send();
    });
});
const btn2 = document.getElementById("transcript");
btn2.addEventListener("click", function() {
    btn2.disabled = true;
    btn2.innerHTML = "Gathering...";
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        var url = tabs[0].url;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://127.0.0.1:5000/transcript?url=" + url, true);
        xhr.onload = function() {
            var text = xhr.responseText;
            const p = document.getElementById("output");
            p.innerHTML = text;
            btn2.disabled = false;
            btn2.innerHTML = "Transcript";
        }
        xhr.send();
    });
});
