const startButton = document.getElementById('start-btn');
const categoriesBtns = document.getElementsByClassName('category-btn');

let categories = Array.prototype.slice.call(categoriesBtns);
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreText = document.getElementById('score');

var score = 0;

let shuffledQuestions, currentQuestionIndex;
categories.forEach((btn) => {
    btn.addEventListener('click', function() {
        let kategoria = btn.innerText;
        switch (kategoria) {
            case "Šport":
                startGame(questionsSport);
                break;
            case "Kultúra":
                startGame(questionsCulture);
                break;
            case "Rôzne":
                startGame(questionsVarious);
                break;
            case "História":
                startGame(questionsHistory);
                break;
            case "Geografia":
                startGame(questionsGeography);
                break;
            case "Veda a technika":
                startGame(questionsScience);
                break;
        }
    });
});

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame(questions) {
    document.getElementsByClassName('controls')[0].style.display = 'none';
   // startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    scoreText.innerText = "Skóre: "+score;
    questionElement.innerText = question.question;
    let clicked = false;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
          button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', (e) => {
        if(!clicked) {
            selectAnswer(e);
            clicked = true;
        }          
        }, {once: true}
        );
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if(correct) {
        score=score+100;
    } else {
        score=score-100;
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
   // nextButton.classList.remove('hide')
    scoreText.innerText = "Skóre: "+score;
    document.getElementsByClassName('controls')[0].style.display = 'grid';
    } else {
        startButton.innerText = 'Reštart';
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}
 

const questionsCulture = [
    {
        question: 'Režíroval napríklad Jurský park, E. T. - Mimozemšťana či Čeluste a patrí ku komerčne najúspešnejším režisérom všetkým čias. O koho ide?',
        answers: [
            { text: 'o Roberta Zemeckisa', correct: false },
            { text: 'o Stevena Spielberga', correct: true },
            { text: 'o Olivera Stona', correct: false }
        ] 
    },
    {
        question: 'Na ktorej hore podľa Biblie pristál Noe so svojou archou po potope sveta?',
        answers: [
            { text: 'Sion', correct: false },
            { text: 'Sinaj', correct: false },
            { text: 'Ararat', correct: true } 
        ] 
    },
    {
        question: 'Nick Carraway, ktorý prichádza do New Yorku, aby si na burze zarobil, je hlavným hrdinom jedného z románov F. S. Fitzgeralda. Ktorého?',
        answers: [
            { text: 'Veľký Gatsby', correct: true },
            { text: 'Táto strana raja', correct: false },
            { text: 'Posledný magnát', correct: false }
        ] 
    },
    {
        question: 'Ktorý majster bojových umení sa vďaka svojim bojovým technikám dostal až na filmové plátno a zahral si napríklad po boku Chucka Norrisa vo filme Cesta draka?',
        answers: [
            { text: 'Bruce Lee', correct: false },
            { text: 'Brandon Lee', correct: false },
            { text: 'Jackie Chan', correct: true }
        ] 
    },
    {
        question: 'Ako sa volá newyorská 102-poschodová budova postavená v štýle art deco, dokončená v roku 1931, ktorá bola až do roku 1972 najvyššou budovou sveta?',
        answers: [
            { text: 'Metropolitan Tower', correct: false },
            { text: 'Empire State Building', correct: true },
            { text: 'Lincoln Building', correct: false }
        ] 
    },
    {
        question: 'Ako sa nazýva kresťanský kostol v Jeruzaleme, ktorý postavili na mieste, kde podľa Nového zákona ukrižovali Ježiša Krista?',
        answers: [
            { text: 'Bazilika Božieho hrobu', correct: true },
            { text: 'Kaplnka nanebovstúpenia Pána', correct: false },
            { text: 'Kostol Pán zaplakal', correct: false }
        ] 
    },
    {
        question: 'Ktorý chrám zo začiatku 12. storočia, vrcholná stavba kmérskej architektúry, je zobrazený na kambodžskej štátnej vlajke?',
        answers: [
            { text: 'Angkór Vat', correct: true },
            { text: 'Angkór Tham', correct: false },
            { text: 'Angkór Khmér', correct: false }
        ] 
    },
    {
        question: 'Ktorý americký spisovateľ je autorom obľúbených románov Dobrodružstvá Toma Sawyera (1876) a Dobrodružstvá Huckleberryho Finna (1884)?',
        answers: [
            { text: 'Jack London', correct: false },
            { text: 'Henry James', correct: false },
            { text: 'Mark Twain', correct: true }
        ] 
    }, 
    {
        question: 'Rámájana, Mahábhárata a Šakuntala patria k najstarším literárnym pamiatkam jednej ázijskej krajiny. Ktorej?',
        answers: [
            { text: 'Číny', correct: false },
            { text: 'Japonska', correct: false },
            { text: 'Indie', correct: true }
        ] 
    }, 
    {
        question: 'Kto je autorom niekoľkokrát strateného a opätovne nájdeného obrazu Salvator Mundi – Spasiteľ sveta?',
        answers: [
            { text: 'Raffaello Santi', correct: false },
            { text: 'Giorgione', correct: false },
            { text: 'Leonardo da Vinci', correct: true }
        ] 
    }, 
    {
        question: 'Ktorá francúzska módna návrhárka je autorkou nesmrteľného sukňového kostýmu, malých čiernych šiat a jedného z najpredávanejších parfumov na svete?',
        answers: [
            { text: 'Isabel Marant', correct: false },
            { text: 'Paloma Picasso', correct: false },
            { text: 'Coco Chanel', correct: true }
        ] 
    }, 
    {
        question: 'S ktorým známym módnym časopisom spojil svoje meno nemecký fotograf Helmut Newton, známy najmä erotickými fotografiami?',
        answers: [
            { text: 'Vogue', correct: true },
            { text: 'Elle', correct: false },
            { text: "Harper's Bazaar", correct: false }
        ] 
    }, 
    {
        question: 'Pre ktorého staroseverského boha je typické kladivo ako jeden z jeho hlavných atribútov?',
        answers: [
            { text: 'pre Odina', correct: false },
            { text: 'pre Thora', correct: true },
            { text: 'pre Freya', correct: false }
        ] 
    }, 
    {
        question: 'Ktorý filmový režisér, producent, majster napätia a kriminálnych príbehov sa preslávil filmom Psycho, Vtáky či Vertigo?',
        answers: [
            { text: 'Tim Burton', correct: false },
            { text: 'Alfred Hitchcock', correct: true },
            { text: 'Francis Ford Coppola', correct: false }
        ] 
    }, 
    {
        question: 'Ktoré miesto sa nazýva Kráľovstvom nebeským v rovnomennom filme režiséra sira Ridleyho Scotta z roku 2005?',
        answers: [
            { text: 'Jeruzalem', correct: true },
            { text: 'Babylon', correct: false },
            { text: 'Eldorádo', correct: false }
        ] 
    }, 
    {
        question: 'Ktorá britská herečka si zahrala krásku Belle v americkom romantickom muzikálovom fantasy filme z roku 2017 Kráska a zviera?',
        answers: [
            { text: 'Keira Knightley', correct: false },
            { text: 'Emma Watson', correct: true },
            { text: 'Emily Blunt', correct: false }
        ] 
    },
    {
        question: 'Čo je to minaret?',
        answers: [
            { text: 'delostrelecké opevnenie', correct: false },
            { text: 'súčasť mešity', correct: true },
            { text: 'oslavná pieseň', correct: false }
        ] 
    },
    {
        question: 'Ako sa nazýva svätá kniha islamského náboženstva?',
        answers: [
            { text: 'Korán', correct: true },
            { text: 'Súra', correct: false },
            { text: 'Tóra', correct: false }
        ] 
    },  
    {
        question: 'Ktorý spisovateľ je autorom série fantasy románov Pieseň ľadu a ohňa, podľa ktorých nakrútili v súčasnej dobe veľmi populárny seriál Hra o tróny?',
        answers: [
            { text: 'George R. R. Martin', correct: true },
            { text: 'John Flanagan', correct: false },
            { text: 'Harry Harrison', correct: false }
        ] 
    },  
    {
        question: 'Pri ktorom tanci sa používajú pomôcky ako šatka s mincami, závoj, vejár, krídla bohyne Isis, sviečky, šable, činely, tamburíny a prípadne hady?',
        answers: [
            { text: 'pri sambe', correct: false },
            { text: 'pri tangu', correct: false },
            { text: 'pri orientálnom (brušnom) tanci', correct: true }
        ] 
    }          
]

const questionsSport = [
    {
        question: 'Akú hodnotu má vnútorná časť býčieho oka v hre šípky?',
        answers: [
            { text: '25 bodov', correct: false },
            { text: '50 bodov', correct: true },
            { text: '100 bodov', correct: false }
        ] 
    },
    {
        question: 'Medzi dve základné vzpieračské disciplíny v súčasnosti nepatrí...?',
        answers: [
            { text: 'trh', correct: false },
            { text: 'vyhod', correct: true },
            { text: 'nadhod', correct: false } 
        ] 
    },
    {
        question: 'Ktoré mesto bolo v roku 2012 už tretíkrát hostiteľom letných olympijských hier?',
        answers: [
            { text: 'Peking', correct: false },
            { text: 'Atény', correct: false },
            { text: 'Londýn', correct: true } 
        ] 
    }, 
    {
        question: 'Stali sa niekedy hokejisti USA majstrami sveta v ľadovom hokeji?',
        answers: [
            { text: 'áno, dvakrát', correct: true },
            { text: 'áno, päťkrát', correct: false },
            { text: 'nie', correct: false } 
        ] 
    }, 
    {
        question: 'Ktorá krajina získala v 20. storočí ako jediná štyri tituly majstra sveta vo futbale?',
        answers: [
            { text: 'Argentína', correct: false },
            { text: 'Brazília', correct: true },
            { text: 'Taliansko', correct: false } 
        ] 
    }, 
    {
        question: '„Sedemstá Grand Prix pre Ferrari a môj siedmy titul, to sú tie správne čísla.“ Ktorý pretekár sa takto vyjadril po skončení Veľkej ceny Belgicka Formuly 1 v roku 2004?',
        answers: [
            { text: 'Michael Schumacher', correct: true },
            { text: 'Fernando Alonso', correct: false },
            { text: 'Sebastian Vettel', correct: false } 
        ] 
    }, 
    {
        question: 'Koľko kruhov sa nachádza na olympijskej vlajke?',
        answers: [
            { text: 'tri', correct: false },
            { text: 'štyri', correct: false },
            { text: 'päť', correct: true } 
        ] 
    }, 
    {
        question: 'Konali sa niekedy majstrovstvá sveta vo futbale na území Afriky?',
        answers: [
            { text: 'áno, v Kamerune', correct: false },
            { text: 'áno, v Juhoafrickej republike', correct: true },
            { text: 'nie', correct: false } 
        ] 
    }, 
    {
        question: 'Uveďte výraz v angličtine pre špeciálne vozidlo, ktoré vchádza na trať počas pretekov automobilov Formuly 1 v prípade, že došlo k nehode alebo hrozí iné nebezpečenstvo na okruhu.',
        answers: [
            { text: 'safety car', correct: true },
            { text: 'support car', correct: false },
            { text: 'entry car', correct: false } 
        ] 
    }, 
    {
        question: 'Nedovoleným zákrokom v hokeji je...',
        answers: [
            { text: 'krosčeking', correct: true },
            { text: 'forčeking', correct: false },
            { text: 'armčeking', correct: false } 
        ] 
    }, 
    {
        question: 'Ktorý známy motocyklový pretekár preslávil štartové číslo 46?',
        answers: [
            { text: 'Valentino Rossi', correct: true },
            { text: 'Giacomo Agostini', correct: false },
            { text: 'Jorge Lorenzo', correct: false } 
        ] 
    }, 
    {
        question: '18. 4. 1999 sledoval celý svet hokejový zápas v newyorskom štadióne Madison Square Garden, ktorý bol posledným zápasom v NHL pre tridsaťosemročného hokejového fenoména menom... Doplňte.',
        answers: [
            { text: 'Wayne Gretzky', correct: true },
            { text: 'Norm Ullman', correct: false },
            { text: 'Larry Murphy', correct: false } 
        ] 
    }, 
    {
        question: '18. novembra 1999 sa uskutočnilo slávnostné vyhlásenie výsledkov ankety časopisu World Soccer o futbalistu storočia. Kto sa ním stal?',
        answers: [
            { text: 'Diego Maradona', correct: false },
            { text: 'Pelé', correct: true },
            { text: 'Franz Beckenbauer', correct: false } 
        ] 
    }, 
    {
        question: 'Ktorý grandslamový turnaj sa ako prvý hral pod strechou?',
        answers: [
            { text: 'Australian Open', correct: true },
            { text: 'Wimbledon', correct: false },
            { text: 'US Open', correct: false } 
        ] 
    }, 
    {
        question: 'Ktorá dĺžka olympijských chodeckých tratí v súťaži mužov neexistuje?',
        answers: [
            { text: '10 km', correct: true },
            { text: '20 km', correct: false },
            { text: '50 km', correct: false } 
        ] 
    }, 
    {
        question: 'Uveďte výraz pre bod v džude.',
        answers: [
            { text: 'waza', correct: false },
            { text: 'goši', correct: false },
            { text: 'ipon', correct: true } 
        ] 
    }, 
    {
        question: 'Ako sa nazýva olympijský šport, v ktorom sa hráči súperiacich družstiev nerozlišujú podľa farby dresov, ale podľa farby čiapočiek?',
        answers: [
            { text: 'kriket', correct: false },
            { text: 'pólo', correct: false },
            { text: 'vodné pólo', correct: true } 
        ] 
    }, 
    {
        question: 'Koľkú štartovú pozíciu v pretekoch Formuly 1 si vydobyl pretekár, ktorý získal takzvanú pole-position?',
        answers: [
            { text: 'prvú', correct: true },
            { text: 'tretiu', correct: false },
            { text: 'poslednú', correct: false } 
        ] 
    }, 
    {
        question: 'V ktorej krajine sa v roku 2016 konali paralympijské hry?',
        answers: [
            { text: 'v Grécku', correct: false },
            { text: 'v Brazílii', correct: true },
            { text: 'v Spojenom kráľovstve', correct: false } 
        ] 
    }, 
    {
        question: 'Ktorý z uvedených športov nepatrí medzi pálkovacie?',
        answers: [
            { text: 'kriket', correct: false },
            { text: 'stolný tenis', correct: true },
            { text: 'bejzbal', correct: false } 
        ] 
    }  
]

const questionsHistory = [
    {
        question: 'Jeruzalemský chrám v roku 70 zničili Rimania. Ako sa nazýva jeho posledná zachovaná časť?',
        answers: [
            { text: 'Múr utrpenia', correct: false },
            { text: 'Múr mieru', correct: false },
            { text: 'Múr nárekov', correct: true }
        ] 
    },
    {
        question: 'Čo prelomové vynašiel okolo roku 1450 Johannes Gutenberg',
        answers: [
            { text: 'tkáčske krosná', correct: false },
            { text: 'ďalekohľad', correct: false },
            { text: 'kníhtlač', correct: true } 
        ] 
    },
    {
        question: 'Ako sa kedysi nazýval dnešný Istanbul?',
        answers: [
            { text: 'Konštantínopol', correct: true },
            { text: 'Nikopol', correct: false },
            { text: 'Sevastopol', correct: false } 
        ] 
    }, 
    {
        question: 'V roku 1973 došlo k zosadeniu a smrti Salvadora Allendeho a nástupu vojenskej junty s Augustom Pinachetom na čele. Kde sa to stalo?',
        answers: [
            { text: 'v Čile', correct: true },
            { text: 'v Guyane', correct: false },
            { text: 'v Kolumbii', correct: false } 
        ] 
    }, 
    {
        question: 'V ktorom meste vyčíňal vrah označovaný ako Jack Rozparovač?',
        answers: [
            { text: 'v New Yorku', correct: false },
            { text: 'v Londýne', correct: true },
            { text: 'v Paríži', correct: false } 
        ] 
    }, 
    {
        question: 'V reakcii na ktorú vojnu vznikla OSN?',
        answers: [
            { text: 'na 1. svetovú', correct: false },
            { text: 'na 2. svetovú', correct: true },
            { text: 'na kórejskú vojnu', correct: false } 
        ] 
    }, 
    {
        question: 'V roku 1871 sa víťazom prusko-francúzskej vojny stalo Prusko. K zjednoteniu ktorej krajiny vtedy došlo?',
        answers: [
            { text: 'Francúzska', correct: false },
            { text: 'Belgicka', correct: false },
            { text: 'Nemecka', correct: true } 
        ] 
    }, 
    {
        question: 'Čo označuje pojem anexia?',
        answers: [
            { text: 'zosadenie kráľa', correct: false },
            { text: 'voľbu pápeža', correct: false },
            { text: 'násilné zabratie cudzieho územia', correct: true } 
        ] 
    }, 
    {
        question: 'Kto bol prvým prezidentom USA?',
        answers: [
            { text: 'George Washington', correct: true },
            { text: 'Thomas Jefferson', correct: false },
            { text: 'Abraham Lincoln', correct: false } 
        ] 
    }, 
    {
        question: 'Ktorej starovekej civilizácii sa pripisujú vynálezy strelného prachu, hodvábu alebo papiera?',
        answers: [
            { text: 'babylonskej', correct: false },
            { text: 'egyptskej', correct: false },
            { text: 'čínskej', correct: true } 
        ] 
    }, 
    {
        question: 'Preslávil sa múdrosťou, a keď zomrel, ríša sa vinou bojov medzi jeho synmi rozpadla. Ako sa tento izraelský kráľ volal?',
        answers: [
            { text: 'Šalamún', correct: true },
            { text: 'Dávid', correct: false },
            { text: 'Saul', correct: false } 
        ] 
    }, 
    {
        question: 'Ako sa nazýva egyptské obrázkové písmo, ktoré rozlúštil v 19. storočí Jean-François Champollion?',
        answers: [
            { text: 'klinové písmo', correct: false },
            { text: 'runy', correct: false },
            { text: 'hieroglyfy', correct: true } 
        ] 
    }, 
    {
        question: 'Ako dnes nazývame vojnu, ktorá sa asi 20 rokov označovala ako veľká vojna?',
        answers: [
            { text: 'tridsaťročná vojna', correct: false },
            { text: '1. svetová vojna', correct: true },
            { text: 'prusko-rakúska vojna', correct: false } 
        ] 
    }, 
    {
        question: 'Ako sa volá egyptský boh Slnka? Dvojpísmenková odpoveď sa často objavuje v krížovkách.',
        answers: [
            { text: 'He', correct: false },
            { text: 'Re', correct: true },
            { text: 'Che', correct: false } 
        ] 
    }, 
    {
        question: 'Jeden z najkrutejších diktátorov bol Mao Ce-tung. V ktorej krajine vládol?',
        answers: [
            { text: 'v Kambodži', correct: false },
            { text: 'v Číne', correct: true },
            { text: 'vo Vietname', correct: false } 
        ] 
    }, 
    {
        question: 'Ktorý štát kapituloval v druhej svetovej vojne posledný?',
        answers: [
            { text: 'Nemecko', correct: false },
            { text: 'Taliansko', correct: false },
            { text: 'Japonsko', correct: true } 
        ] 
    }, 
    {
        question: 'Od ktorej krajiny vyhlásila v roku 1947 India nezávislosť?',
        answers: [
            { text: 'od Spojeného kráľovstva', correct: true },
            { text: 'od Holandska', correct: false },
            { text: 'od Francúzska', correct: false } 
        ] 
    }, 
    {
        question: 'V povodí ktorých dvoch významných riek sa nachádza Mezopotámia?',
        answers: [
            { text: 'Eufratu a Tigrisu', correct: true },
            { text: 'Eufratu a Jordánu', correct: false },
            { text: 'Eufratu a Samuru', correct: false } 
        ] 
    }, 
    {
        question: 'Ktorý zo siedmich divov sveta sa nám ako jediný zachoval?',
        answers: [
            { text: 'rodoský kolos', correct: false },
            { text: 'Artemidin chrám v Efeze', correct: false },
            { text: 'pyramídy v Gíze', correct: true } 
        ] 
    }, 
    {
        question: 'V ktorej bitke zomrel Napoleon Bonaparte?',
        answers: [
            { text: 'pri Waterloo', correct: false },
            { text: 'pri Lipsku', correct: false },
            { text: 'v žiadnej', correct: true } 
        ] 
    } 
]

const questionsScience = [
    {
        question: 'V ktorej vednej oblasti sa preslávil Brit Stephen Hawking (1942 - 2018)?',
        answers: [
            { text: 'v chémii', correct: false },
            { text: 'v teoretickej fyzike', correct: true },
            { text: 'vo fyziológii', correct: false }
        ] 
    },
    {
        question: 'Japonská Fukušima čelila v roku 2011 živelnej pohrome. Ktorá budova si ničivé následky zemetrasenia a potom vlny cunami odniesla najviac?',
        answers: [
            { text: 'univerzita', correct: false },
            { text: 'športový štadión', correct: false },
            { text: 'jadrová elektráreň', correct: true } 
        ] 
    }, 
    {
        question: 'Na ktorom kontinente žije hroch obojživelný?',
        answers: [
            { text: 'v Ázii', correct: false },
            { text: 'v Afrike', correct: true },
            { text: 'v Amerike', correct: false } 
        ] 
    },
    {
        question: 'Ako sa označuje požieranie príslušníkov vlastného, prípadne príbuzného druhu?',
        answers: [
            { text: 'symbióza', correct: false },
            { text: 'komenzalizmus', correct: false },
            { text: 'kanibalizmus', correct: true } 
        ] 
    }, 
    {
        question: 'Čím sa živí živočích nazývaný koprofág?',
        answers: [
            { text: 'výkalmi', correct: true },
            { text: 'zdochlinami', correct: false },
            { text: 'kôprom', correct: false } 
        ] 
    }, 
    {
        question: 'Ktorému u dnešných zvierat sú najviac podobné mamuty?',
        answers: [
            { text: 'nosorožcom', correct: false },
            { text: 'slonom', correct: true },
            { text: 'žirafám', correct: false } 
        ] 
    }, 
    {
        question: 'Ktorý kontinent je prirodzeným domovom tigra?',
        answers: [
            { text: 'Južná Amerika', correct: false },
            { text: 'Ázia', correct: true },
            { text: 'Afrika', correct: false } 
        ] 
    }, 
    {
        question: 'Čo majú spoločné tieto rastliny: rosička, tučnica a saracénia?',
        answers: [
            { text: 'sú suchomilné', correct: false },
            { text: 'sú parazitické', correct: false },
            { text: 'sú mäsožravé', correct: true } 
        ] 
    }, 
    {
        question: 'Ako sa označuje prístroj na meranie otrasov zemskej kôry?',
        answers: [
            { text: 'seizmometer', correct: true },
            { text: 'gravimeter', correct: false },
            { text: 'tektometer', correct: false } 
        ] 
    }, 
    {
        question: 'Ktorý minerál je na Mohsovej stupnici tvrdosti najmäkší?',
        answers: [
            { text: 'kamenná soľ', correct: false },
            { text: 'kalcit', correct: false },
            { text: 'mastenec', correct: true } 
        ] 
    }, 
    {
        question: 'Snovačka jedovatá je prudko jedovatý pavúk, ktorý žije v Austrálii a Severnej Amerike. Ak sa inak nazýva?',
        answers: [
            { text: 'čierna vdova', correct: true },
            { text: 'tarantula', correct: false },
            { text: 'pradiarka', correct: false } 
        ] 
    }, 
    {
        question: 'Anakondy sú juhoamerické hady. Akým spôsobom zabíjajú svoje obete?',
        answers: [
            { text: 'udusia ich', correct: true },
            { text: 'skočia na ne', correct: false },
            { text: 'pustia do nich jed', correct: false } 
        ] 
    }, 
    {
        question: 'V ktorej krajine bol v staroveku posvätný chrobák skarabeus nazývaný aj valihnoj?',
        answers: [
            { text: 'v Číne', correct: false },
            { text: 'v Mexiku', correct: false },
            { text: 'v Egypte', correct: true } 
        ] 
    }, 
    {
        question: 'Ako sa nazýva mucha (označovaná aj bodavka), ktorá v oblasti rovníkovej Afriky prenáša spavú chorobu?',
        answers: [
            { text: 'pich-pich', correct: false },
            { text: 'somnia', correct: false },
            { text: 'tse-tse', correct: true } 
        ] 
    },
    {
        question: 'Ako sa v slovenčine nazýva ochorenie diabetes mellitus?',
        answers: [
            { text: 'dna', correct: false },
            { text: 'cukrovka', correct: true },
            { text: 'lupienka', correct: false } 
        ] 
    },
    {
        question: 'Akej farby je smaragd?',
        answers: [
            { text: 'červenej', correct: false },
            { text: 'čiernej', correct: false },
            { text: 'zelenej', correct: true } 
        ] 
    },
    {
        question: 'Ktorá krvná bunka prenáša kyslík z pľúc (prípadne žiaber) do ostatných častí tela?',
        answers: [
            { text: 'červená krvinka', correct: true },
            { text: 'biela krvinka', correct: false },
            { text: 'krvná doštička', correct: false } 
        ] 
    },
    {
        question: 'Čo je základnou surovinou na výrobu karibského rumu?',
        answers: [
            { text: 'zemiaky', correct: false },
            { text: 'cukrová trstina', correct: true },
            { text: 'cukrová repa', correct: false } 
        ] 
    },
    {
        question: 'Kaktusy či agávy dokážu vďaka zadržiavaniu vody žiť v púšti. Ako sa suchomilné rastliny nazývajú?',
        answers: [
            { text: 'epifyty', correct: false },
            { text: 'reofyty', correct: false },
            { text: 'sukulenty', correct: true } 
        ] 
    },
    {
        question: 'Ako sa nazýva vírus, ktorý spôsobuje vážne ochorenie AIDS?',
        answers: [
            { text: 'CMV', correct: false },
            { text: 'SARS', correct: false },
            { text: 'HIV', correct: true } 
        ] 
    }              
]

const questionsGeography = [
    {
        question: 'Ktorý štát leží na ostrove Cejlón?',
        answers: [
            { text: 'Srí Lanka', correct: true },
            { text: 'Singapur', correct: false },
            { text: 'Indonézia', correct: false }
        ] 
    },
    {
        question: 'Ktorá africká krajina je najľudnatejšia?',
        answers: [
            { text: 'Egypt', correct: false },
            { text: 'Konžská demokratická republika', correct: false },
            { text: 'Nigéria', correct: true } 
        ] 
    },
    {
        question: 'Hlavným mestom ktorej krajiny je Lima?',
        answers: [
            { text: 'Peru', correct: true },
            { text: 'Čile', correct: false },
            { text: 'Venezuely', correct: false } 
        ] 
    },
    {
        question: 'V USA možno navštíviť najstarší národný park na svete. Ako sa nazýva?',
        answers: [
            { text: 'Yellowstone', correct: true },
            { text: 'Grand Canyon', correct: false },
            { text: 'Yosemite', correct: false } 
        ] 
    }, 
    {
        question: 'Ako sa v slovenčine nazýva čínska rieka Chuang che?',
        answers: [
            { text: 'Biela rieka', correct: false },
            { text: 'Hnedá rieka', correct: false },
            { text: 'Žltá rieka', correct: true } 
        ] 
    }, 
    {
        question: 'Ako sa volá najaktívnejší slovenský cestovateľ 20. storočia, ktorý navštívil všetky kontinenty a vykonal 3 cesty okolo sveta?',
        answers: [
            { text: 'Peter Gregor', correct: false },
            { text: 'František Kele', correct: true },
            { text: 'Samuel Šikeť', correct: false } 
        ] 
    }, 
    {
        question: 'V ktorom oceáne je Mariánska priekopa?',
        answers: [
            { text: 'v Atlantickom', correct: false },
            { text: 'v Tichom', correct: true },
            { text: 'v Indickom', correct: false } 
        ] 
    }, 
    {
        question: 'Bolo Československo medzi zakladateľskými štátmi OSN?',
        answers: [
            { text: 'áno', correct: true },
            { text: 'nie, pridalo sa v roku 1947', correct: false },
            { text: 'nie, pridalo sa až v roku 1983', correct: false } 
        ] 
    }, 
    {
        question: 'Koľko vrcholov sveta má nadmorskú výšku nad 8 000 metrov?',
        answers: [
            { text: '8', correct: false },
            { text: '11', correct: false },
            { text: '14', correct: true } 
        ] 
    }, 
    {
        question: 'Ktoré náboženstvo prevažuje v Indii?',
        answers: [
            { text: 'hinduizmus', correct: true },
            { text: 'sikhizmus', correct: false },
            { text: 'budhizmus', correct: false } 
        ] 
    }, 
    {
        question: 'Ktorý je najväčší ostrov na svete?',
        answers: [
            { text: 'Madagaskar', correct: false },
            { text: 'Borneo', correct: false },
            { text: 'Grónsko', correct: true } 
        ] 
    }, 
    {
        question: 'Malá časť ktorého afrického štátu leží aj v Ázii?',
        answers: [
            { text: 'Eritrey', correct: false },
            { text: 'Somálska', correct: false },
            { text: 'Egypta', correct: true } 
        ] 
    }, 
    {
        question: 'Ako sa nazýva nultá rovnobežka?',
        answers: [
            { text: 'rovník', correct: true },
            { text: 'poludník', correct: false },
            { text: 'elipsa', correct: false } 
        ] 
    },
    {
        question: 'Ktorá krajina sveta je najľudnatejšia?',
        answers: [
            { text: 'India', correct: false },
            { text: 'Čína', correct: true },
            { text: 'Indonézia', correct: false } 
        ] 
    },
    {
        question: 'Ktorým kontinentom preteká rieka Mekong, Amur alebo Jenisej?',
        answers: [
            { text: 'Áziou', correct: true },
            { text: 'Austráliou', correct: false },
            { text: 'Severnou Amerikou', correct: false } 
        ] 
    },
    {
        question: 'Ak sa vydáte na cestu z južného pólu, pôjdete vždy...',
        answers: [
            { text: 'na juh', correct: false },
            { text: 'na sever', correct: true },
            { text: 'na západ', correct: false } 
        ] 
    }, 
    {
        question: 'V ktorej krajine žije endemický živočích kivi veľký?',
        answers: [
            { text: 'na Novom Zélande', correct: true },
            { text: 'v Austrálii', correct: false },
            { text: 'v Mikronézii', correct: false } 
        ] 
    }, 
    {
        question: 'Ako sa nazýva štátna letecká spoločnosť Spojených arabských emirátov, ktorá patrí medzi najväčšie letecké spoločnosti na svete?',
        answers: [
            { text: 'Emirates', correct: true },
            { text: 'Air Arabia', correct: false },
            { text: 'Flydubai', correct: false } 
        ] 
    }, 
    {
        question: 'Ktorý štát s hlavným mestom na ostrove je najľudnatejší?',
        answers: [
            { text: 'Japonsko', correct: false },
            { text: 'Indonézia', correct: true },
            { text: 'Kuba', correct: false } 
        ] 
    }, 
    {
        question: 'V ktorej juhoamerickej krajine je úradným jazykom portugalčina?',
        answers: [
            { text: 'v Suriname', correct: false },
            { text: 'v Brazílii', correct: true },
            { text: 'v Argentíne', correct: false } 
        ] 
    }     
]

const questionsVarious = [
    {
        question: 'Z ktorej krajiny pochádza strunový nástroj balalajka?',
        answers: [
            { text: 'z Ruska', correct: true },
            { text: 'z Mongolska', correct: false },
            { text: 'z Číny', correct: false }
        ] 
    },
    {
        question: 'Koľko strún majú husle?',
        answers: [
            { text: 'štyri', correct: true },
            { text: 'päť', correct: false },
            { text: 'šesť', correct: false } 
        ] 
    },
    {
        question: 'Veľký kaňon (Grand Canyon) v Arizone, jeden z najväčších kaňonov na svete, vymodelovala jedna rieka. Ktorá?',
        answers: [
            { text: 'Mississippi', correct: false },
            { text: 'Colorado', correct: true },
            { text: 'Rio Grande', correct: false } 
        ] 
    },
    {
        question: 'Ktoré dva oceány spája Panamský prieplav?',
        answers: [
            { text: 'Atlantický a Tichý', correct: true },
            { text: 'Atlantický a Indický', correct: false },
            { text: 'Tichý a Indický', correct: false } 
        ] 
    }, 
    {
        question: 'Aký titul patril starovekým vládcom Egypta?',
        answers: [
            { text: 'veľkňaz', correct: false },
            { text: 'cisár', correct: false },
            { text: 'faraón', correct: true } 
        ] 
    }, 
    {
        question: 'Ktorá automobilka ma v logu štyri prepojené kruhy?',
        answers: [
            { text: 'Opel', correct: false },
            { text: 'Mercedes', correct: false },
            { text: 'Audi', correct: true } 
        ] 
    }, 
    {
        question: 'Ako sa nazýva odev, pás látky obkrútenej okolo tela, ktorý nosia ženy v Indii a príbuzných krajinách?',
        answers: [
            { text: 'habit', correct: false },
            { text: 'čador', correct: false },
            { text: 'sárí', correct: true } 
        ] 
    }, 
    {
        question: 'Aký list má na štátnej vlajke Kanada?',
        answers: [
            { text: 'gaštanový', correct: false },
            { text: 'dubový', correct: false },
            { text: 'javorový', correct: true } 
        ] 
    }, 
    {
        question: 'Ako sa nazýva slávna bábika, ktorú americká firma Mattel predstavila na trh v roku 1959?',
        answers: [
            { text: 'Anabel', correct: false },
            { text: 'Barbie', correct: true },
            { text: 'Cindy', correct: false } 
        ] 
    }, 
    {
        question: 'S ktorou krajinou sa spája tzv. politika jedného dieťaťa?',
        answers: [
            { text: 's Bangladéšom', correct: false },
            { text: 's Indiou', correct: false },
            { text: 's Čínou', correct: true } 
        ] 
    }, 
    {
        question: 'Čo označuje pojem humidita?',
        answers: [
            { text: 'úrodnosť pôdy', correct: false },
            { text: 'vlhkosť', correct: true },
            { text: 'ľudskú solidaritu', correct: false } 
        ] 
    }, 
    {
        question: 'Pre ktorú krajinu je typickou vianočnou postavou dedo Mráz?',
        answers: [
            { text: 'pre Fínsko', correct: false },
            { text: 'pre Nórsko', correct: false },
            { text: 'pre Rusko', correct: true } 
        ] 
    }, 
    {
        question: 'Ktoré vesmírne teleso patrilo ešte v roku 2006 medzi planéty slnečnej sústavy?',
        answers: [
            { text: 'Pluto', correct: true },
            { text: 'Európa', correct: false },
            { text: 'Ganymedes', correct: false } 
        ] 
    }, 
    {
        question: 'Ktorý zo skleníkových plynov je najdominantnejší?',
        answers: [
            { text: 'metán', correct: false },
            { text: 'vodná para', correct: true },
            { text: 'oxid dusný', correct: false } 
        ] 
    }, 
    {
        question: 'Ako sa nazýva veda, ktorá skúma papilárne línie na vnútornej strane prstov rúk, na dlaniach a chodidlách človeka?',
        answers: [
            { text: 'papilografia', correct: false },
            { text: 'daktyloskopia', correct: true },
            { text: 'liniografia', correct: false } 
        ] 
    }, 
    {
        question: 'Ako sa nazýva japonská profesionálna spoločníčka?',
        answers: [
            { text: 'hetéra', correct: false },
            { text: 'šunga', correct: false },
            { text: 'gejša', correct: true } 
        ] 
    }, 
    {
        question: 'Asi najznámejší pokrm japonskej kuchyne je závitok nakrájaný na malé kolieska, ktorý tvorí varená ryža so sladkokyslou omáčkou. Ako sa táto špecialita nazýva?',
        answers: [
            { text: 'agemoči', correct: false },
            { text: 'chukuchuk', correct: false },
            { text: 'sushi', correct: true } 
        ] 
    }, 
    {
        question: 'Ako sa nazýva pravoslávny kňaz?',
        answers: [
            { text: 'akolyta', correct: false },
            { text: 'diakon', correct: false },
            { text: 'pop', correct: true } 
        ] 
    }, 
    {
        question: 'Ako sa nazýva francúzska štátna hymna?',
        answers: [
            { text: 'Chant du départ', correct: false },
            { text: 'Maréchal, nous voilà!', correct: false },
            { text: 'Marseillaisa', correct: true } 
        ] 
    }, 
    {
        question: 'Ako sa označuje väzivová blana pokrývajúca otvor medzi čelovou kosťou a temennými kosťami novorodenca, nazývaná aj lupienok?',
        answers: [
            { text: 'fontanela', correct: true },
            { text: 'vernix', correct: false },
            { text: 'lanugo', correct: false } 
        ] 
    },   
]
