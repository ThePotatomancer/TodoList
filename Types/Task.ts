export type completionStatus = "finished" | "unfinished";
export const completionStatus = ["finished", "unfinished"];

export type Task = {
    title: string,
    description: string,
    completionStatus: completionStatus,
    dueDate?: number
};