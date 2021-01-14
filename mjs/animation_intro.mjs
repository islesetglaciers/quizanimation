/*
 *Gérer les événements des animations pour les synchroniser
 */
import {Util} from "./Util.mjs"
export function animation_intro(lancerQuiz)
{
	//Récupérer les mots
	let lesMots = document.querySelectorAll(".lesMots");
	let laSection = document.querySelector('section');

	Util.genererEtoiles(150, 2, laSection);

	lesMots[0].classList.add('descenteMot');
	lesMots[0].addEventListener("animationend", rebondPremierMot, false);

	function rebondPremierMot(evt) {
		//On enlève l'écouteur
		lesMots[0].removeEventListener("animationend", rebondPremierMot, false);

		//On affecte au premier mot la classe .bondEnHaut
		lesMots[0].style.animation = 'rebondMot .9s both';
			
		//Quand le mot est monté, on place le deuxième mot avec son animation
		lesMots[0].addEventListener("animationend", placerDeuxiemeMot, false);
	}


	function placerDeuxiemeMot(evt) {
		//On enlève l'écouteur
		evt.target.removeEventListener("animationend", placerDeuxiemeMot, false);

		//On récupère le deuxième mot pour lui affecter une animation : .versLeCentre
		lesMots[1].classList.add("lightSpeed");
		
		//Quand l'animation du 2e mot est terminée, on place le troisième mot avec son animation
		lesMots[1].addEventListener("animationend", placerTroisiemeMot, false);
	}

	function placerTroisiemeMot(evt) {
		//On enlève l'écouteur
		evt.target.removeEventListener("animationend", placerTroisiemeMot, false);
		//On récupère le troisième mot pour lui affecter une animation : .etirerMot 
		lesMots[2].classList.add("wobbleMot");
		lesMots[2].addEventListener("animationend", placerQuatriemeMot, false);
	}

	function placerQuatriemeMot(evt) {
		//On enlève l'écouteur
		evt.target.removeEventListener("animationend", placerQuatriemeMot, false);
		lesMots[3].classList.add("apparitionScale");
		lesMots[3].style.cursor = "pointer";
		lesMots[3].addEventListener("animationend", attenteClic, false);
	}

	function attenteClic(evt) {
		evt.target.removeEventListener("animationend", attenteClic, false);
		evt.target.style.animation = "attentionClic 1.5s ease-in-out infinite forwards";
		evt.target.addEventListener("mousedown", finIntro);
	}
	
	function finIntro(evt){
		evt.target.removeEventListener("animationend", finIntro);
		// on détruit tous les mots de l'animation d'intro
		// Ces mots se trouvent dans laSection
		// On peut utiliser la fonction Util.detruireTousLesNoeud()
		Util.detruireTousLesNoeud(laSection, laSection);
		// On lance le Quiz
		lancerQuiz();
	}
}  // fin animation_intro 
