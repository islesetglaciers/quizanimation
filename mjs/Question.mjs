import { Util } from "./Util.mjs";

export class Question {
    /**
     * Classe permettant de créer et d'afficher une fenêtre
     * et, d'appeler une fonction de l'application passée en paramètre
     * @param {Array} listeQuestions - le tableau des question
     * @param {HTMLElement} conteneurHtml -  La question et ses choix de réponses seront insérée dans le conteneurHtml
     * @param {String} classCss  - Classe css pour la question
     * @param {Function} fonction  - fonction référencée à appeler sur un mousedown
     * @param tempsDebut - temps de début du quiz
     */

    constructor(listeQuestions, conteneurHtml, classCss, finJeu, boutonSuivant, tempsDebut) {
        //Récupérer les valeurs passées en paramètre			
        this.listeQuestions = listeQuestions;
        this.conteneurHtml = conteneurHtml;
        this.classCss = classCss;
        this.finJeu = finJeu;
        this.boutonSuivant = boutonSuivant;
        this.noQuestionEnCours = 0; // le numéro de la question en cours
        this.noQuestionDéjàValidé = -1; // la question qui vient d'être validée
        this.nbClics = 0; // vérifier que l'utilisateur ne clique pas sur plus de deux réponses
        this.reference_afficherProchaineQuestion = this.afficherProchaineQuestion.bind(this);
        this.boutonSuivant.addEventListener("mousedown", this.reference_afficherProchaineQuestion, false);
        this.nombreDeBonneReponse = 0;
        this.tempsDebut = tempsDebut;
        this.tabNumQuestions = Util.genererTabQuestions((this.listeQuestions.length - 1));
        this.indexQuestions = Util.questionsAleatoires(this.tabNumQuestions);
    }

    /**
     * Méthode pour créer et afficher les instances de la classe Fenetre
     */
    creerQuestion() {
        // Créer le conteneur de Question
        // qui sera précédé par this (appartient à l'instance)
        this.elmQuestion = document.createElement('article');
        // Tous les éléments à l'intérieur de elmQuestion seront identifiés par des varaiables locales
        // on ajoute la class 'question' au nouvel élément
        this.elmQuestion.classList.add('question'); 
        Util.genererEtoiles(Util.aleatoireMinMax(100, 200), 2, this.elmQuestion);
        //Créer une balise h1 pour le titre
        let elmTitre = document.createElement('h1');
        // on ajoute l'animation animTitreQuestion
        elmTitre.style.animation = "animTitreQuestion 1s forwards";
        // On récupère le titre de la question
        elmTitre.innerHTML = this.listeQuestions[this.indexQuestions[this.noQuestionEnCours]].titre;
        // on ajoute elm titre à elmQuestion
        this.elmQuestion.appendChild(elmTitre);
        // On créé une liste de réponse
        let elmReponses = document.createElement('ul');
        let elmRep; // une réponse
        let k=0; // le numéro de la réponse
        let tabNumReponses = Util.genererTabQuestions((this.listeQuestions[this.indexQuestions[this.noQuestionEnCours]].reponses.length - 1));
        console.log(tabNumReponses);
        let indexReponses = Util.questionsAleatoires(tabNumReponses);
        // on parcourt l'ensemble des réponses de this.listeQuestions  
        for (let rep of this.listeQuestions[this.indexQuestions[this.noQuestionEnCours]].reponses)
        {
            // Création de chaque élément réponse de la liste des réponses
            elmRep = document.createElement('li');
            // on ajoute l'animation des réponses
            elmRep.style.animation = "animReponse .5s 1." + (k + 5) + "s both";
            elmRep.innerHTML = rep[0];
            elmRep.id = k++;
            elmReponses.appendChild(elmRep);
            elmRep.addEventListener('mousedown', this.valideLaReponse.bind(this));
        }
        this.elmQuestion.appendChild(elmReponses);
        this.conteneurHtml.appendChild(this.elmQuestion);
        this.boutonSuivant.removeEventListener("mousedown", this.reference_afficherProchaineQuestion, false);
    }

    valideLaReponse(evt){
    // on s'assure que la fonction ne s'exécute qu'une seule fois dès que l'utilisateur a cliqué sur un choix
        if (this.noQuestionEnCours != this.noQuestionDéjàValidé) {
            if (this.nbClics <= 1) {
                if (this.listeQuestions[this.indexQuestions[this.noQuestionEnCours - 1]].reponses[evt.target.id][1]) {
                    evt.target.style.backgroundColor = '#35DCA0';
                    evt.target.style.color = '#175E44';
                    evt.target.style.border = '1px solid #175E44';
                    evt.target.style.boxShadow = '0 0 5px #35DCA0';
                    evt.target.style.animation = 'animBonneReponse .8s ease-in-out both';
                    this.nombreDeBonneReponse += .5;
                } else {
                    evt.target.style.backgroundColor = '#F1849C';
                    evt.target.style.color = '#831830';
                    evt.target.style.border = '1px solid #831830';
                    evt.target.style.boxShadow = '0 0 5px #F1849C';
                    evt.target.style.animation = 'animMauvaiseReponse 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) both';
                }
            this.boutonSuivant.addEventListener("mousedown", this.reference_afficherProchaineQuestion, false);
            this.nbClics++;
            } else {
                this.noQuestionDéjàValidé = this.noQuestionEnCours;
            }
        }
    }
    detruireQuestion() {       
        Util.detruireTousLesNoeud(this.conteneurHtml, this.conteneurHtml);
    }

    afficherProchaineQuestion(evt) {
        this.elmQuestion.style.animation = "animChangeQuestion 1s forwards";
        this.elmQuestion.addEventListener("animationend", ()=>{
            // S'il reste une question on l'affiche, sinon c'est la fin du jeu ...
            this.detruireQuestion();
            this.nbClics = 0;
    	    if (this.noQuestionEnCours < this.listeQuestions.length) {
    	        // On affiche la question
                this.creerQuestion();
                //On incrémente le no de la prochaine question à afficher
                this.noQuestionEnCours++;
    	    } else {                    
                this.boutonSuivant.removeEventListener("mousedown", this.afficherProchaineQuestion, false);
    	        this.finJeu();
    	    }
        });    
    	   
    }; // afficherProchaineQuestion

} //Fin class Question