export type completionStatus = "finished" | "unfinished"

export type Task = {
    title: string,
    description: string,
    completionStatus: completionStatus,
    dueDate: Date // Maybe change to number and avoid Date?
};