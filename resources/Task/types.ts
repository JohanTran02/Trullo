export interface ITask {
    title: string,
    description: string,
    status: "to-do" | "in-progress" | "blocked" | "done",
    assignedTo: string[],
    createdAt: Date
    finishedBy: string,
    tags: string[],
}