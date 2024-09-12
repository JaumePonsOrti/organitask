export interface TaskToDO{
    id: number,
    name: string,
    start_time:any,
    end_time:any,
    diary_task: boolean,
    date?: string,
    time_completed: number,
    started: boolean,
    timeStarted?: Date,
    timeEnded?: Date
}