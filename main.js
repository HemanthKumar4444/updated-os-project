import { Process } from './process.js';
import { FCFS } from './fcfs.js';
import { roundRobin } from './roundRobin.js';
import { SJF } from './sjf.js';
import { SRJF } from './srjf.js';
import { PriorityScheduling } from './priority.js';

document.getElementById('runButton').addEventListener('click', () => {
    // Get the user input
    const arrivalTimes = document.getElementById('arrivalTime').value.split(' ').map(Number);
    const burstTimes = document.getElementById('burstTime').value.split(' ').map(Number);
    const priorities = document.getElementById('priorities').value.split(' ').map(Number); // Get the priorities from input
    const quantum = parseInt(document.getElementById('timeQuantum').value) || 0;
    const algorithm = document.getElementById('algorithm').value;

    // Create processes with the appropriate attributes
    const processes = arrivalTimes.map((at, index) => new Process(at, burstTimes[index], index + 1, priorities[index]));
    let ganttChart;

    // Select algorithm based on user choice
    switch (algorithm) {
        case 'FCFS':
            ganttChart = FCFS(processes);
            break;
        case 'roundRobin':
            ganttChart = roundRobin(processes, quantum);
            break;
        case 'SJF':
            ganttChart = SJF(processes);
            break;
        case 'SRJF':
            ganttChart = SRJF(processes);
            break;
        case 'PriorityScheduling':
            ganttChart = PriorityScheduling(processes);
            break;
        default:
            alert('Invalid algorithm');
            return;
    }

    // Display the Gantt chart
    displayGanttChart(ganttChart);

    // Display the result table with averages
    displayResultTable(processes);
});

function displayGanttChart(ganttChart) {
    const ganttContainer = document.getElementById('ganttChart');
    ganttContainer.innerHTML = ''; // Clear previous chart

    // Create a container for the horizontal Gantt chart
    const chartRow = document.createElement('div');
    chartRow.className = 'gantt-row';

    ganttChart.forEach(pid => {
        const bar = document.createElement('div');
        bar.className = 'gantt-bar';
        bar.style.width = '100px'; // Adjust based on the timeslice or duration
        bar.style.backgroundColor = getRandomColor();
        bar.textContent = `P${pid}`;
        chartRow.appendChild(bar);
    });

    ganttContainer.appendChild(chartRow);
}

function displayResultTable(processes) {
    const tableBody = document.getElementById('tableBody');
    const resultTable = document.getElementById('resultTable');
    const avgWaitingTimeElement = document.getElementById('avgWaitingTime');
    const avgTurnaroundTimeElement = document.getElementById('avgTurnaroundTime');
    tableBody.innerHTML = ''; // Clear previous rows

    // Initialize totals for calculating averages
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;

    processes.forEach(p => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>P${p.PID}</td>
            <td>${p.arrivalTime}</td>
            <td>${p.originalBurstTime}</td>
            <td>${p.finishTime}</td>
            <td>${p.waitingTime}</td>
            <td>${p.turnaroundTime}</td>
            <td>${p.priority}</td> <!-- Display priority -->
        `;
        tableBody.appendChild(row);

        // Sum up waiting and turnaround times for averages
        totalWaitingTime += p.waitingTime;
        totalTurnaroundTime += p.turnaroundTime;
    });

    // Calculate averages
    const avgWaitingTime = totalWaitingTime / processes.length;
    const avgTurnaroundTime = totalTurnaroundTime / processes.length;

    // Display averages below the table
    avgWaitingTimeElement.textContent = avgWaitingTime.toFixed(2);
    avgTurnaroundTimeElement.textContent = avgTurnaroundTime.toFixed(2);

    resultTable.classList.remove('hidden');
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
