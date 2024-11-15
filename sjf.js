import { Process } from './process.js';

export function SJF(processes) {
    const n = processes.length;
    let time = 0;
    const ganttChart = [];

    // Sort processes by arrival time and then burst time
    processes.sort((a, b) => {
        if (a.arrivalTime === b.arrivalTime) {
            return a.burstTime - b.burstTime;
        }
        return a.arrivalTime - b.arrivalTime;
    });

    processes.forEach(p => {
        if (time < p.arrivalTime) {
            time = p.arrivalTime; // If the process arrives later, move time forward
        }
        p.finishTime = time + p.burstTime;
        p.turnaroundTime = p.finishTime - p.arrivalTime;
        p.waitingTime = p.turnaroundTime - p.burstTime;
        ganttChart.push(p.PID);
        time = p.finishTime;
    });

    return ganttChart;
}
