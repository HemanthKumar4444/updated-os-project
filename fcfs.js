import { Process } from './process.js';

export function FCFS(processes) {
    const n = processes.length;
    let time = 0; // Track the current time
    let ganttChart = [];

    // Sort processes by arrival time (FCFS executes in the order of arrival)
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    processes.forEach(p => {
        if (time < p.arrivalTime) {
            time = p.arrivalTime; // If the process arrives later than the current time, jump to arrival time
        }
        p.finishTime = time + p.burstTime; // Calculate the finish time of the process
        p.turnaroundTime = p.finishTime - p.arrivalTime; // Turnaround Time = Finish Time - Arrival Time
        p.waitingTime = p.turnaroundTime - p.burstTime; // Waiting Time = Turnaround Time - Burst Time
        ganttChart.push(p.PID); // Record the process in Gantt chart
        time = p.finishTime; // Update the current time to the finish time of the current process
    });

    return ganttChart;
}
