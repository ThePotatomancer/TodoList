export function scheduleLoop(callback: (previousTime: number, currentTime: number) => Promise<void>, loopDelay: number) {
    let previousTime = Date.now();
    setTimeout(() => {
        const currentTime = Date.now();
        callback(previousTime, currentTime);
        previousTime = currentTime;
        scheduleLoop(callback, loopDelay);
    }, loopDelay);
} 