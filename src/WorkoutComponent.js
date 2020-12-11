class WorkoutComponent {

    static all = []

    constructor(workoutObj){
        this.workout = workoutObj
        WorkoutComponent.all.push(this)
    }

    render(mainWorkout){
        mainWorkout.innerHTML = `<div>${this.workout.title}</div>`
    }
}