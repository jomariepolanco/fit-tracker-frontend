//Keep track of the data associated with Goals
// render goal to the DOM
// handle any events associated with goals

class GoalComponent {

    static all = []

    constructor(goalObj){
        this.goal = goalObj
        GoalComponent.all.push(this)
    }

    render(intentionsContainer) {
        const date = intentionsContainer.querySelector('h3')
        date.textContent = `Day ${this.goal.day_id}`
        const sleep = intentionsContainer.querySelector('.sleep')
        sleep.textContent = `${this.goal.sleep} hours`
        const nutrition = intentionsContainer.querySelector('.nutrition')
        nutrition.textContent = this.goal.nutrition
        const hydration = intentionsContainer.querySelector('.hydration')
        hydration.textContent = `${this.goal.hydration} mL`
        const intentions = intentionsContainer.querySelector('.intention')
        intentions.textContent = this.goal.intentions 
        const reflections = intentionsContainer.querySelector('.reflections')
        reflections.textContent = this.goal.reflections
    }
}