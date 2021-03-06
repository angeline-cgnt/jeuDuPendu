let animals = ['vache', 'chien', 'poisson', 'lion', 'koala', 'hippopotame', 'zebre', 'poule', 'dauphin', 'tortue', 'singe', 'cerf'];
let wordString = '';
let wordToFind = '';
let lifes = 8;


let myCanvas = document.getElementById('test')
let graph = myCanvas.getContext('2d');

//Dessiner une partie du pendu à chaque erreur
function drawHanged(lifes) {
    graph.strokeStyle = '#A44A3F';
    graph.lineWidth = 2.5;
    graph.beginPath();
    switch (lifes) {
        case 7:
            graph.moveTo(50, 125);
            graph.lineTo(100, 125);
            break;
        case 6:
            graph.moveTo(75, 125);
            graph.lineTo(75, 25);
            break;
        case 5:
            graph.moveTo(75, 25);
            graph.lineTo(150, 25);
            graph.moveTo(92, 25);
            graph.lineTo(75, 45);
            break;
        case 4:
            graph.moveTo(150, 25);
            graph.lineTo(150, 37);
            break;
        case 3:
            graph.moveTo(162, 50);
            graph.arc(150, 50, 13, 0, 2 * Math.PI);
            break;
        case 2:
            graph.moveTo(150, 62);
            graph.lineTo(150, 87);
            break;
        case 1:
            graph.moveTo(130, 75);
            graph.lineTo(170, 75);
            break;
        case 0:
            graph.moveTo(162, 100);
            graph.lineTo(150, 87);
            graph.lineTo(137, 100);
            graph.moveTo(148, 43);
            graph.lineTo(145, 52);
            graph.moveTo(145, 43);
            graph.lineTo(148, 52);
            graph.moveTo(155, 43);
            graph.lineTo(152, 52);
            graph.moveTo(152, 43);
            graph.lineTo(155, 52);
            break;
    }
    graph.stroke();
}

//Afficher un mot au hasard du tableau animals
function pickWord(list) {
    return list[Math.floor(Math.random() * list.length)];
}

//Créer un tableau des index correspondant à la lettre choisie
function searchIndex(word, letter) {
    let arrayIndex = [];
    let arrayLetterWord = word.split('');

    for (index = 0; index < arrayLetterWord.length; index++) {
        if (letter == arrayLetterWord[index]) {
            arrayIndex.push(index);
        }
    }
    return arrayIndex;
    // if (arrayIndex.length === 0) {
    //     return -1;
    // } else {
    //     return arrayIndex;
    // }
}

//Réinitialiser clavier
function resetKeyboard() {
    document.addEventListener('click', chooseLetter);
    let elts = document.getElementsByTagName('button')

    for (i = 0; i < elts.length; i++) {
        elts[i].disabled = false;
        elts[i].style.backgroundColor = '#7DAA92';
    }
}

//Afficher des underscores à la place du mot selon son nombre de caractères
function newPlay(word) {
    let wordChoosen = word.split('');
    wordString = '';
    lifes = 8;
    document.getElementById('lifeLeft').textContent = lifes;

    for (i = 0; i < wordChoosen.length; i++) {
        wordString += '_';
    }

    document.getElementById('answer').innerHTML = wordString;
    wordToFind = word.toUpperCase();
    resetKeyboard();
    document.getElementById('endPlay').textContent = '';
    graph.clearRect(0, 0, myCanvas.width, myCanvas.height);
}

document.getElementById('newWord').onclick = () => (newPlay(pickWord(animals)));


//Ajouter la lettre au mot cherché, désactiver la lettre cliquée, retirer une vie pour chaque erreur
function chooseLetter(element) {

    if (element.target.nodeName == 'BUTTON' && element.target.id != 'newWord') {
        let letterClick = element.target.textContent;
        let answerWord = searchIndex(wordToFind, letterClick);

        if (answerWord.length != 0) {
            document.getElementById('answer').textContent = replaceLetters(letterClick, answerWord);
            if (!wordString.includes('_') && lifes > 0) {
                document.getElementById('endPlay').textContent = `VICTOIRE !`;
                document.removeEventListener('click', chooseLetter); //Désactiver clavier en cas de victoire
            }

        } else {
            lifes--;
            drawHanged(lifes)
            if (lifes <= 0) {
                lifes = 0;
                document.getElementById('endPlay').textContent = 'PERDU...';
            }
            document.getElementById('lifeLeft').textContent = lifes;
        }

        console.log(answerWord);
        element.target.style.backgroundColor = '#D1C8E1';
        element.target.disabled = true;
    }

}


//Remplacer underscore par lettre cliquée
function replaceLetters(letter, arrayPosition) {
    let arrayWordString = wordString.split('');
    for (i = 0; i < arrayPosition.length; i++) {
        arrayWordString[arrayPosition[i]] = letter;
    }
    wordString = arrayWordString.join('');
    return wordString;
}





//Générer le clavier
// const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// for (i=0; i<alphabet.length; i++){
//     let myLetter = alphabet[i].toUpperCase();
//     let keyboardLetter = `<button id='myKey${myLetter}'>${myLetter}</button>`;
//     document.getElementById('myKeyboard').innerHTML += keyboardLetter;
// }
// ou
// alphabet.forEach(element => {
//     let myLetter = element.toUpperCase();
//     let keyboardLetter = `<button id='myKey${myLetter}'>${myLetter}</button>`;
//     document.getElementById('myKeyboard').innerHTML += keyboardLetter;
// });