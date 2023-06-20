export function sendNotification<T>(event: string, data: T) {
    console.log("sent notification " + event + " with the following data: " + JSON.stringify(data));
}