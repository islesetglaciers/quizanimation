export class Util {

    /* Détruit tous les noeuds du noeud parent racine */
    /* Racine est le conteneur initiale qui contient tous les noeuds */
    /* Racine n'est pas déruit à la fin du processus, il ne reste que le noeud racine vide */
    static detruireTousLesNoeud(noeud, racine) {
        while (noeud.hasChildNodes()) {
            this.detruireTousLesNoeud(noeud.firstChild, racine);
        }
        if (noeud != racine) {
            noeud.parentNode.removeChild(noeud);
            noeud = null;
        }
    }
    // Retourne un nombre aléatoire entre deux valeurs maximales
    static aleatoireMinMax(min,max)
    {
        let valMin = Math.min(min,max);
        let valMax = Math.max(min, max);
        return valMin + Math.random() * (valMax-valMin)+1;
    }
    // Convertit le temps écoulé en ms en minutes et secondes
    static conversionMinSecs(tempsMillis) {
        let minutes = Math.floor(tempsMillis / 60000);
        let secondes = ((tempsMillis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (secondes < 10 ? '0' : '') + secondes;
    }

    // Générer des étoiles en bg
    static genererEtoiles(nbEtoiles, duree, parent) {
		let counter = 0;
		while (counter <= nbEtoiles) {
			let elmDivEtoiles = document.createElement("div");
			elmDivEtoiles.classList.add("lesEtoiles");
			elmDivEtoiles.style.left = Math.floor(Util.aleatoireMinMax(0, 98)) + "vw";
			elmDivEtoiles.style.top = Math.floor(Util.aleatoireMinMax(0, 98)) + "vh";
			elmDivEtoiles.style.animation = "changerOpacite " + duree +"s " + Util.aleatoireMinMax(0, 8) + "s infinite alternate-reverse";
			parent.appendChild(elmDivEtoiles);
			counter++;
		}
    }
    
    // Générer tableau de numéros
    static genererTabQuestions(nbMax) {
        let tabIndex = [];
        while (nbMax > -1) {
            tabIndex.push(nbMax);
            nbMax--;
        }
        console.log(tabIndex);
        return tabIndex;
    }

    // sélection aléatoire de l'ordre des questions
    static questionsAleatoires(indexQuestions) {
        var currentIndex = indexQuestions.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = indexQuestions[currentIndex];
            indexQuestions[currentIndex] = indexQuestions[randomIndex];
            indexQuestions[randomIndex] = temporaryValue;
        }
        console.log(indexQuestions);
        return indexQuestions;
    }
}