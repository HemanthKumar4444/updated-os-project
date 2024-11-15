import { Process } from './process.js';

export function SRJF(processes) {
    let currentTime = 0; // Tracks the current time during scheduling
    let completed = 0; // Number of completed processes
    const n = processes.length; // Total number of processes
    const isCompleted = new Array(n).fill(false); // Array to track completion of processes
    const ganttChart = []; // To store process IDs in order of execution

    // Sort processes by arrival time (to ensure we consider the earliest arriving processes first)
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    // While there are incomplete processes
    while (completed < n) {
        let index = -1;
        let minRemainingTime = Infinity;

        // Find the process with the shortest remaining burst time that has arrived and not completed
        for (let i = 0; i < n; i++) {
            if (processes[i].arrivalTime <= currentTime && !isCompleted[i] && processes[i].remainingTime < minRemainingTime) {
                minRemainingTime = processes[i].remainingTime;
                index = i;
            }
        }

        if (index !== -1) {
            // Process found; execute it
            const process = processes[index];
            process.startTime = currentTime;

            // Process executes for one unit of time (remaining time for this process)
            process.remainingTime -= 1;
            currentTime++;

            // If the process has finished executing
            if (process.remainingTime === 0) {
                process.finishTime = currentTime;
                process.turnaroundTime = process.finishTime - process.arrivalTime;
                process.waitingTime = process.turnaroundTime - process.originalBurstTime;
                isCompleted[index] = true; // Mark this process as completed
                completed++; // Increment the number of completed processes
            }

            ganttChart.push(process.PID); // Add the process ID to the Gantt chart (record execution)
        } else {
            // If no process is available to run, just increment the time
            currentTime++;
        }
    }

    return ganttChart;
}
