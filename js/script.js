function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class TamagochiFactory {
  createTamagochi (type) {
    let min = 50;
    let max;

    switch(type) {
      case 'kitty':
        max = 100;   
        return  new TamagochiFluffyKitty(getRandom(min, max), getRandom(min, max), getRandom(min, max), getRandom(min, max), getRandom(min, max), getRandom(min, max));

      case 'pug':
        max = 70;
        return new TamagochiLazyPug(getRandom(min, max), getRandom(min, max), getRandom(min, max), getRandom(min, max), getRandom(min, max), getRandom(min, max));
  
      case 'ninja':
        max = 70;  
        return new TamagochiNinja(getRandom(min, max), getRandom(min, max), getRandom(min, max), getRandom(min, max), getRandom(min, max), getRandom(min, max));
    }  
  }
}

class Controller {
  constructor() {
    this.pet;
  }

  handleEvent(event) {
    switch(event.currentTarget.id) {
      case 'kitty':
      case 'pug':
      case 'ninja':
        let tamagFactory = new TamagochiFactory();

        this.pet = tamagFactory.createTamagochi(event.currentTarget.id);
        
        let tamagViev = new GameView(this.pet);
        
        tamagViev.startGame();
        tamagViev.showTime();
        tamagViev.displayStats();
        tamagViev.statsDecreaser();
        tamagViev.randomHelp();
        tamagViev.deadCheaker();

        eat.addEventListener('click', this);
        wash.addEventListener('click', this)
        run.addEventListener('click', this);
        doctor.addEventListener('click', this);
        bar.addEventListener('click', this);
        work.addEventListener('click', this);
        buyFood.addEventListener('click', this);
        startBusiness.addEventListener('click', this);

        break;

      case 'eat':
        this.pet.eat();
        break;

      case 'wash':
        this.pet.wash();
        break;

      case 'run':
        this.pet.run()
        break;

      case 'doctor':
        this.pet.visitADoctor();
        break;

      case 'bar':
        this.pet.goToBar();
        break;

      case 'work':
        this.pet.goToWork();
        break;

      case 'buyFood': 
        this.pet.buyFood();
        break;

      case 'startBusiness':
        this.pet.startABusiness();
        break;
    }
  }
}

class Timer {
  constructor () {
    this.timerInterval;
    this.minutes;
    this.seconds;
  }

  start() {
    this.minutes = 0;
    this.seconds = 0;

    this.timerInterval = setInterval(() => {
      if (++this.seconds > 59) {
        this.minutes += 1;
        this.seconds = 0;
      }
    }, 1000);
  }

  end() {
    clearInterval(this.timerInterval);
  }
}

class GameView {
  constructor(tamagochi) {
    this.tamagochi = tamagochi;
    this.helpInterval;
    this.dispalayInterval;
    this.decreaserInterval;
  }

  startGame() {
    diffLvlsec.style.display = 'none';
    mainGame.style.display = 'flex';
    tamagName.textContent = 'Tamagochi: ' + this.tamagochi.type;
  }

  showTime() {
    game__timer.textContent = '00:00';
    let timer = new Timer();
    timer.start();
    let timerDisplayingInterval = setInterval(() => {
      game__timer.textContent = ((timer.minutes > 9) ? timer.minutes : '0' + timer.minutes) + ':' + ((timer.seconds > 9) ? timer.seconds : '0' + timer.seconds);  
      
      if (this.tamagochi.isDead()) {
        clearInterval(timer.end());
        clearInterval(timerDisplayingInterval);
      }
    }, 1000) 
  }

  displayStats() {
    // it is needed, because the stats appears too long
    food.textContent = 'Food: ' + this.tamagochi.food; 
    clean.textContent = 'Clean: ' + this.tamagochi.clean;
    happiness.textContent = 'Happiness: ' + this.tamagochi.happiness; 
    health.textContent = 'Health ' + this.tamagochi.health;
    socialization.textContent = 'Socialization ' + this.tamagochi.socialization;
    money.textContent = 'Money ' + this.tamagochi.money; 

    food_bar.setAttribute('max', this.tamagochi.maxPoints); 
    clean_bar.setAttribute('max', this.tamagochi.maxPoints);
    happiness_bar.setAttribute('max', this.tamagochi.maxPoints);
    health_bar.setAttribute('max', this.tamagochi.maxPoints);
    socialization_bar.setAttribute('max', this.tamagochi.maxPoints);
    money_bar.setAttribute('max', this.tamagochi.maxPoints);

    food_bar.setAttribute('value', this.tamagochi.food);
    clean_bar.setAttribute('value', this.tamagochi.clean);
    happiness_bar.setAttribute('value', this.tamagochi.happiness);
    health_bar.setAttribute('value', this.tamagochi.health)
    socialization_bar.setAttribute('value', this.tamagochi.socialization)
    money_bar.setAttribute('value', this.tamagochi.money)

    this.dispalayInterval =  setInterval(() => {
      food.textContent = 'Food: ' + this.tamagochi.food;
      food_bar.setAttribute('value', this.tamagochi.food);

      clean.textContent = 'Clean: ' + this.tamagochi.clean;
      clean_bar.setAttribute('value', this.tamagochi.clean);

      happiness.textContent = 'Happiness: ' + this.tamagochi.happiness;
      happiness_bar.setAttribute('value', this.tamagochi.happiness);

      health.textContent = 'Health: ' + this.tamagochi.health;
      health_bar.setAttribute('value', this.tamagochi.health);

      socialization.textContent = 'Socialization: ' + this.tamagochi.socialization;
      socialization_bar.setAttribute('value', this.tamagochi.socialization);

      money.textContent = 'Money: ' + this.tamagochi.money;
      money_bar.setAttribute('value', this.tamagochi.money);
    }, 250);
  }

  statsDecreaser() {
    this.decreaserInterval = setInterval(()  => {
      this.tamagochi.food -= this.tamagochi.decreasePoints;
      this.tamagochi.clean -= this.tamagochi.decreasePoints;
      this.tamagochi.happiness -= this.tamagochi.decreasePoints;
      this.tamagochi.socialization -= this.tamagochi.decreasePoints;
      this.tamagochi.health -= this.tamagochi.decreasePoints;
      // i do not think i should to decrese money with no reason 
    }, this.tamagochi.decreaseAfter * 1000);
  }

  randomHelp() {
    this.helpInterval = setInterval(()=> {
      let stats = ['food', 'clean', 'happiness', 'socialization', 'money', 'health'];
      this.tamagochi[stats[getRandom(0, stats.length)]] += getRandom(10, 50);
    }, 60 * 1000)
  }

  deadCheaker() {
    let deadChekerInterval = setInterval(()=>{
      if (this.tamagochi.isDead()) {
        clearInterval(this.helpInterval);
        clearInterval(this.dispalayInterval);
        clearInterval(this.decreaserInterval);
        clearInterval(deadChekerInterval);
        
        loseSection.style.display = 'flex';
      }
    }, 1000) 
  }
}

class TamagochiAbstract {
  constructor(food, clean, happiness, health, socialization, money) {
    this.food = food;
    this.clean = clean;
    this.happiness = happiness;
    this.health = health;
    this.socialization = socialization;
    this.money = money;
    this.difficulty;
    this.maxPoints;
    this.decreasePoints;
    this.decreaseAfter;
    this.type;   
  }

  eat() {
    this.food += (this.maxPoints > (this.food + 30)) ? 30 : this.maxPoints - this.food;
    this.clean -= 20;
  }

  wash() {
    this.clean += (this.maxPoints > (this.clean + 40)) ? 40 : this.maxPoints - this.clean;
    this.happiness -= 10;
  }

  run() {
    this.happiness += (this.maxPoints > (this.happiness + 15)) ? 15 : this.maxPoints - this.happiness; 
    this.food -= 10;
  }

  visitADoctor() {
    this.health += (this.maxPoints > (this.health + 30)) ? 30 : this.maxPoints - this.health;
    this.money -= 20;
  }

  goToBar() {
    this.socialization += (this.maxPoints > (this.socialization + 40)) ? 40 : this.maxPoints - this.socialization;
    this.food += (this.maxPoints > (this.food + 10)) ? 10 : this.maxPoints - this.food;
    this.money -= 20;
    this.health -= 10;
  }

  goToWork() {
    this.money += 50;
    this.food -= 10;
    this.health -= 10;
    this.socialization -= 20;
  }

  buyFood() {
    // tamagochi will buy as much as he needs to reach 100, for example if his food = 94, he will spend only 6 points of money 
    this.money -= (this.maxPoints > (this.food + 20)) ? 20 : (this.maxPoints - this.food); 
    this.food += (this.maxPoints > (this.food + 20)) ? 20 : (this.maxPoints - this.food);
  }

  startABusiness() {
    this.money += 100;
    this.happiness += (this.maxPoints > (this.happiness + 20)) ? 20 : (this.maxPoints - this.happiness);
    this.health -= 100;
    this.socialization += (this.maxPoints > (this.socialization + 20)) ? 20 : (this.maxPoints - this.socialization);
  }

  isDead() {
    if ((this.food < 0) || (this.clean < 0) || (this.happiness < 0) || (this.health < 0) || (this.socialization < 0) || (this.money < 0)) {
      return true;
    }
    return false;
  }
}

class TamagochiFluffyKitty extends TamagochiAbstract {
  constructor (food, clean, happiness, health, socialization, money) {
    super(food, clean, happiness, health, socialization, money);
    this.difficulty = 'easy';
    this.maxPoints = 100;
    this.decreasePoints = 3;
    this.decreaseAfter = 5;
    this.type = 'Flyffy kitty';
  }
}

class TamagochiLazyPug extends TamagochiAbstract {
  constructor(food, clean, happiness, health, socialization, money) { 
    super(food, clean, happiness, health, socialization, money);
    this.difficulty = 'hard';
    this.maxPoints = 70;
    this.decreasePoints = 5;
    this.decreaseAfter = 5;
    this.type = 'Lazy pug';
  }
}

class TamagochiNinja extends TamagochiAbstract {
  constructor (food, clean, happiness, health, socialization, money) {
    super(food, clean, happiness, health, socialization, money);
    this.difficulty = 'hard';
    this.maxPoints = Infinity;
    this.decreasePoints = 7;
    this.decreaseAfter = 7;
    this.type = 'Ninja'
  }
}

let main = new Controller();

pug.addEventListener('click', main);
kitty.addEventListener('click', main);
ninja.addEventListener('click', main);

tryAgain.addEventListener('click', () => {
  loseSection.style.display = 'none';

  if (main.pet instanceof TamagochiFluffyKitty){
    kitty.click();
  } else if (main.pet instanceof TamagochiLazyPug) {
    pug.click();
  } else {
    ninja.click();
  }
});

tryNew.addEventListener('click', () => location.reload());