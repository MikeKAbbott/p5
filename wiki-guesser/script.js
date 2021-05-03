// Michael Abbott

let searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
let contentUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=';
let url = searchUrl;

var experpt = document.getElementById("wiki-excerpt");
var guesses = document.getElementById("guesses");
var submit = document.getElementById("user-input-button");
let answer = null;
let wikis = new Array();

function setup() {
    noCanvas();
    submit.addEventListener("click", function(){
        let search = document.getElementById("user-input").value;
        if(search != ""){
            search = search.replace(/\s+/g, '_');
            url = url + search;
            document.getElementById("wrapper").style.display = 'none';
            document.querySelectorAll("div").forEach(function(e){
                e.style.display = "block";
            })
            loadWiki();
        }
        
    })
}

function loadWiki(){
    reset();
    loadJSON(url, getSearch, "jsonp");
}

function getSearch(data){
    let query = Math.floor(random(0, 9));
    let title = data[1][query];
    answer = title;
    for(let i = 0; i < 5; i++){
        if (data[1][i] != title && data[1][i])
            wikis.push(data[1][i]);
    }
    let randomIndex = Math.floor(random(4));
    wikis[randomIndex] = title;
    wikis.forEach(function(e){
        guesses.innerHTML += "<div class='row'><button id='"+ e + "' >" + e + "</button></div>";
    })

    title = title.replace(/\s+/g, '_');
    let url = contentUrl + title;
    loadJSON(url, getContent, 'jsonp');
}

function getContent(data){
    let page = data.query.pages;
    let pageId = Object.keys(data.query.pages)[0];
    let content = page[pageId].revisions[0]['*'];
    let wordRegex = /\b\w{4,}\b/g;
    let words = content.match(wordRegex);
    let word = random(words);
    url = searchUrl + word;
    content = clean(content);
    experpt.innerHTML = "<p>" + content + "</p>";
    
    document.querySelectorAll("button").forEach(function(button){
        button.addEventListener("click", function(){
            if(this.id == answer){
                updateScore(true);
                
            }else{
                updateScore(false)
            }
            loadWiki();
        })
    })
}

function updateScore(verdict){
    let score = document.getElementById("score").innerText;
    score = parseInt(score);
    score = verdict ? score + 1 : score - 1;
    document.getElementById("score").innerText = score;
}

function reset(){
    wikis = new Array();
    while (guesses.firstChild) {
        guesses.removeChild(guesses.firstChild);
    }
}

function clean(content){
    content = content.match(/\w+/g);
    content = content.join(" ");
    content = content.replace(/Redirect|REDIRECT|redirect/, "")
    content = content.replace(/short description|Short description/, "")
    content = "... " + content.slice(0, 500) + " ...";
    return content;
}


