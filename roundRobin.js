import { Process } from './process.js';

export function roundRobin(processes, quantum) {
    const n = processes.length;
    let time = 0; // Current time
    const processQueue = []; // Queue to manage the order of processes
    const inQueue = new Array(n).fill(false); // Track which processes are in the queue
    const ganttChart = []; // To store Gantt chart data

    // Enqueue processes that arrive at time 0
    for (let i = 0; i < n; ++i) {
        if (processes[i].arrivalTime <= time && !inQueue[i]) {
            processQueue.push(i);
            inQueue[i] = true;
        }
    }

    // Process the queue until it's empty
    while (processQueue.length > 0) {
        const i = processQueue.shift();
        ganttChart.push(processes[i].PID); // Record the process in Gantt chart

        // Check if process has remaining burst time less than or equal to quantum
        if (processes[i].remainingTime <= quantum) {
            time += processes[i].remainingTime;
            processes[i].finishTime = time;
            processes[i].remainingTime = 0;
            processes[i].turnaroundTime = processes[i].finishTime - processes[i].arrivalTime;
            processes[i].waitingTime = processes[i].turnaroundTime - processes[i].originalBurstTime;
        } else {
            // Process runs for 'quantum' time
            processes[i].remainingTime -= quantum;
            time += quantum;
        }

        // Enqueue new processes that have arrived up to the current time
        for (let j = 0; j < n; ++j) {
            if (processes[j].arrivalTime <= time && !inQueue[j] && processes[j].remainingTime > 0) {
                processQueue.push(j);
                inQueue[j] = true;
            }
        }

        // If the current process still has remaining time, re-add it to the queue
        if (processes[i].remainingTime > 0) {
            processQueue.push(i);
        }
    }

    return ganttChart;
}
