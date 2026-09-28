function out(id, text) {
    const el = document.createElement('div');
    el.textContent = text;
    document.getElementById(id).appendChild(el);
}

class PiggyBank {
    #balance = 0;
    put(amount) {
        if (amount <= 0) { out('piggyOut', 'Некорректная сумма'); return; }
        this.#balance += amount;
        out('piggyOut', 'Баланс: ' + this.#balance);
    }
    take(amount) {
        if (amount > this.#balance) { out('piggyOut', 'Недостаточно средств'); return; }
        this.#balance -= amount;
        out('piggyOut', 'Баланс: ' + this.#balance);
    }
}
const piggy = new PiggyBank();
function doPut() { piggy.put(Number(document.getElementById('piggyAmount').value)); }
function doTake() { piggy.take(Number(document.getElementById('piggyAmount').value)); }

class Animal {
    constructor(name) { this.name = name; }
    speak() { return this.name + ' издаёт звук'; }
}
class Cat extends Animal {
    speak() { return this.name + ' говорит: Мяу'; }
}
class Dog extends Animal {
    speak() { return this.name + ' говорит: Гав'; }
    fetch() { return this.name + ' принёс палку'; }
}

const animals = [];
function addAnimal() {
    const name = document.getElementById('animalName').value;
    const type = document.getElementById('animalType').value;
    if (!name) return;
    let a = type === 'cat' ? new Cat(name) : type === 'dog' ? new Dog(name) : new Animal(name);
    animals.push(a);
    out('animalOut', a.speak());
    if (a instanceof Dog) out('animalOut', a.fetch());
    document.getElementById('animalName').value = '';
}

class Task {
    constructor(title) { this.title = title; this.done = false; }
    complete() { this.done = true; }
    toString() { return (this.done ? '[x] ' : '[ ] ') + this.title; }
}
class TodoList {
    constructor() { this.tasks = []; }
    add(title) { this.tasks.push(new Task(title)); }
    complete(i) { if (this.tasks[i]) this.tasks[i].complete(); }
    countDone() { return this.tasks.filter(t => t.done).length; }
}

const todo = new TodoList();
function renderTasks() {
    const el = document.getElementById('taskOut');
    el.innerHTML = '';
    todo.tasks.forEach((t, i) => {
        const div = document.createElement('div');
        div.textContent = t.toString();
        if (!t.done) {
            const btn = document.createElement('button');
            btn.textContent = '✓';
            btn.onclick = () => { todo.complete(i); renderTasks(); };
            div.appendChild(btn);
        }
        el.appendChild(div);
    });
    out('taskOut', 'Выполнено: ' + todo.countDone());
}
function addTask() {
    const title = document.getElementById('taskTitle').value;
    if (!title) return;
    todo.add(title);
    renderTasks();
    document.getElementById('taskTitle').value = '';
}
renderTasks();