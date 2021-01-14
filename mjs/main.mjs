/* on importe les modules */
import {quiz} from "./quiz.mjs";
import {Fenetre} from "./Fenetre.mjs";
import {Question} from "./Question.mjs";
import {animation_intro} from "./animation_intro.mjs";
import {Util} from "./Util.mjs";

	// Variables de l'application
	// Objet littéral pour les questions du quiz
animation_intro(lancerQuiz);

	// Console.log("Les questions du Quiz:", questionsQuiz);
function lancerQuiz()
{
	// Afficher header et footer
	let leHeader = document.querySelector("header");
	let leFooter = document.querySelector("footer");

	leHeader.style.animation = 'changerOpacite 2s ease-in forwards';
	leFooter.style.animation = 'changerOpacite 2s ease-in forwards';
	let noQuestionEnCours, //no de la question en cours
		conteneurHtml, // qui contiendra une question
		etatQuiz, //Indications sur l'évolution du Quiz
		boutonSuivant, //Bouton pour afficher les questions suivantes
		tempsDebut; // temps début du quiz

		//Quand la page est chargée...

		//On récupère les balises où seront affichées les infos ou autres

		conteneurHtml = document.querySelector('section');
		etatQuiz = document.querySelector("footer > p");
		boutonSuivant = document.querySelector("footer > div");

 		// Les questions à afficher
		const	leQuestionnaire = new Question(
					quiz.listeQuestions,
					conteneurHtml,
					'animQuestion',
					finJeu,
					boutonSuivant,
					tempsDebut
			);

		//On initialise les valeurs du quiz pour commencer à jouer
		onCommenceJouer();

	function onCommenceJouer(evt) {
		// Commencer le compteur de temps
			leQuestionnaire.tempsDebut = new Date().getTime();
		//Initialiser les variables
			leQuestionnaire.noQuestionEnCours = 0;
			leQuestionnaire.nombreDeBonneReponse = 0;
			leQuestionnaire.creerQuestion();
			leQuestionnaire.afficherProchaineQuestion();
	}; // onCommenceJouer

	
	function finJeu() {
		// on récupère le temps de fin du quiz
		var tempsFin = new Date().getTime();
		// on calcule combien de temps s'est écoulé entre le début et la fin du quiz
		let tempsEcoule = tempsFin - leQuestionnaire.tempsDebut;
		// Transformer les millisecondes en minutes et secondes
		let tempsMinSecs = Util.conversionMinSecs(tempsEcoule);
		// on récupère le meilleur score sauvegardé dans localStorage
		let meilleurScore = localStorage.getItem("meilleurScore") === null ? 0 : localStorage.getItem("meilleurScore");
		// le maximum entre meilleurScore et leQuestionnaire.nombreDeBonneReponse
		meilleurScore = Math.max(meilleurScore, leQuestionnaire.nombreDeBonneReponse);
		// on enregistre ce meilleur score dans localStorage
		localStorage.setItem('meilleurScore', meilleurScore);
		// on configure les éléments de la fenêtre
		let laPage = document.querySelector("body"),
			largeur = laPage.offsetWidth,
			hauteur = laPage.offsetHeight,
			texte = "<h1>Le quiz est terminé!</h1>"  
					+ `Vous avez obtenu ${leQuestionnaire.nombreDeBonneReponse} / ${leQuestionnaire.listeQuestions.length}<br>`
					+ `Votre temps: ${tempsMinSecs}<br>`
					+ `Le meilleur pointage à date est ${meilleurScore}<br>` 
					+ '<br>Cliquer pour fermer la fenêtre et rejouer!';
		// Voir constructeur de la classe fenêtre...

			let uneFenetre = new Fenetre(0, 0, largeur, hauteur, "fenetre", texte, laPage, onCommenceJouer);

	} // Fin afficherFenetre
}


