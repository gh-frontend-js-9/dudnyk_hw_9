function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Main {
  
  timer() {
    let minutes = 0;
    let seconds = 0;
    game__timer.textContent = "00:00" // it is needed, because the timer appears too long
    let timerInterval = setInterval(function() {
      if (++seconds > 59) {
        minutes += 1;
        seconds = 0;
      }
      game__timer.textContent = ((minutes > 9) ? minutes : "0" + minutes) + ":" + ((seconds > 9) ? seconds : "0" + seconds);
      if ((pet.food <= 0) || (pet.clean <= 0) || (pet.happiness <= 0)) {  
        clearInterval(timerInterval);               
      }

    }, 1000);
  }

  statsDecreaser() {
    let decreaser = (pet.maxPoints === 70) ? 5 : 3;

    let decreaserInterval = setInterval(function() {
      pet.food = pet.food - decreaser;
      pet.clean = pet.clean - decreaser;
      pet.happiness = pet.happiness - decreaser;
      
      if ((pet.food <= 0) || (pet.clean <= 0) || (pet.happiness <= 0)) {
        clearInterval(decreaserInterval);
      }
    }, 5000);
  }

  displayStats() {
    food.textContent = "Food: " + pet.food; // it is needed, because the stats appears too long
    clean.textContent = "Clean: " + pet.clean;
    happiness.textContent = "Happiness: " + pet.happiness; 
    
    food_bar.setAttribute("max", pet.maxPoints); 
    clean_bar.setAttribute("max", pet.maxPoints);
    happiness_bar.setAttribute("max", pet.maxPoints);

    food_bar.setAttribute("value", pet.food);
    clean_bar.setAttribute("value", pet.clean);
    happiness_bar.setAttribute("value", pet.happiness);
    
    let dispalayInterval =  setInterval(function() {
      food.textContent = "Food: " + pet.food;
      food_bar.setAttribute("value", pet.food);

      clean.textContent = "Clean: " + pet.clean;
      clean_bar.setAttribute("value", pet.clean);
      
      happiness.textContent = "Happiness: " + pet.happiness;
      happiness_bar.setAttribute("value", pet.happiness);

      if ((pet.food <= 0) || (pet.clean <= 0) || (pet.happiness <= 0)) {
        clearInterval(dispalayInterval);
      }
    }, 100); 
  }

  loseTester() {
    let loseInterval = setInterval(function() {
      if ((pet.food <= 0) || (pet.clean <= 0) || (pet.happiness <= 0)) {
        loseSection.style.display = "flex";
        clearInterval(loseInterval);
      }
    }, 500);
  }

  handleEvent(event) {
    this.timer();
    diffLvlsec.style.display = "none";
    mainGame.style.display = "flex";

    switch(event.currentTarget.id) {
      case "easyLvl":   
        pet = new Tamagochi(getRandom(50, 100), getRandom(50, 100), getRandom(50, 100), "easy");
        break;

      case "hardLvl":
        pet = new Tamagochi(getRandom(50, 70), getRandom(50, 70), getRandom(50, 70), "hard");
        break;
    }
    
    eat.addEventListener("click", pet);
    wash.addEventListener("click", pet);
    run.addEventListener("click", pet);
    
    this.displayStats();
    this.statsDecreaser();
    this.loseTester()
  }
}

class Tamagochi {
  
  constructor(food, clean, happiness, difficulty) {
    this.food = food;
    this.clean = clean;
    this.happiness = happiness;
    this.maxPoints = (difficulty === "easy") ? 100 : 70;   
  }

  eat() {
    this.food += (this.food <= (this.maxPoints - 30)) ? 30 : (this.maxPoints - this.food); // this woun't make stat over 100 or 70
    this.clean -= 20;
  }

  wash() {
    this.clean += (this.clean <= (this.maxPoints - 40)) ? 40 : (this.maxPoints - this.clean);
    this.happiness -= 10;
  }

  run() {
    this.happiness += (this.happiness <= (this.maxPoints - 15)) ? 15 : (this.maxPoints - this.happiness);
    this.food -= 10;
  }

  handleEvent(event) {
    switch(event.currentTarget.id) {
      case "eat":
        this.eat();
        break;
      
      case "wash": 
        this.wash();
        break;

      case "run":
        this.run();
        break;
    }
  }
}

let pet;
let mainClass = new Main();

easyLvl.addEventListener("click", mainClass, true);
hardLvl.addEventListener("click", mainClass, true);
tryAgain.addEventListener("click", () => location.reload());