export class Process {
    constructor(arrivalTime, burstTime, PID, priority) {
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime; // Original burst time
        this.remainingTime = burstTime; // Remaining burst time (for algorithms like SRJF)
        this.originalBurstTime = burstTime; // Store original burst time for calculations
        this.finishTime = 0;
        this.turnaroundTime = 0;
        this.waitingTime = 0;
        this.startTime = 0; // Track the start time for the process
        this.PID = PID; // Process ID
        this.priority = priority; // Priority of the process (lower is higher priority)
    }
}
