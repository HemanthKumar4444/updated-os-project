import { Process } from './process.js';

export function PriorityScheduling(processes) {
    let currentTime = 0; // Tracks the current time during scheduling
    let completed = 0; // Number of completed processes
    const n = processes.length; // Total number of processes
    const isCompleted = new Array(n).fill(false); // Array to track completion of processes
    const ganttChart = []; // To store process IDs in order of execution

    // Sort processes by arrival time first, then by priority (lowest priority number is the highest priority)
    processes.sort((a, b) => {
        if (a.arrivalTime === b.arrivalTime) {
            return a.priority - b.priority; // If arrival times are the same, choose the one with the highest priority
        }
        return a.arrivalTime - b.arrivalTime; // Otherwise, choose the one that arrives first
    });

    // While there are incomplete processes
    while (completed < n) {
        let index = -1;
        let highestPriority = Infinity;

        // Find the process with the highest priority that has arrived and not completed
        for (let i = 0; i < n; i++) {
            if (processes[i].arrivalTime <= currentTime && !isCompleted[i] && processes[i].priority < highestPriority) {
                highestPriority = processes[i].priority;
                index = i;
            }
        }

        if (index !== -1) {
            // Process found; execute it
            const process = processes[index];
            process.startTime = currentTime;

            // Process executes for the full burst time
            process.finishTime = currentTime + process.burstTime;
            process.turnaroundTime = process.finishTime - process.arrivalTime;
            process.waitingTime = process.turnaroundTime - process.burstTime;

            // Mark the process as completed
            isCompleted[index] = true;
            completed++; // Increment the number of completed processes

            currentTime = process.finishTime; // Update the current time
            ganttChart.push(process.PID); // Add the process ID to the Gantt chart (record execution)
        } else {
            // If no process is available to run, just increment the time
            currentTime++;
        }
    }

    return ganttChart;
}
