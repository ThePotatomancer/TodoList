export function logError(message: string, payload: Record<string, any>) {
    console.error(message + ", payload: " + JSON.stringify(payload));
}

export function logInfo(message: string, payload: Record<string, any>) {
    console.log(message + ", payload: " + JSON.stringify(payload));
}
