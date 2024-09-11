export interface TaskToDO{
    name: string,
    start_time:any,
    end_time:any,
    diary_task: boolean,
    date?: string,
    time_completed: string,
    extra_time:number,
    extra_time_is_plus: boolean,
    completed?: boolean
}