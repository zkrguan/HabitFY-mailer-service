export interface EmailOption{
    to : string;
    detail:GoalDetail[];
}

export interface GoalDetail{
    description:string;
    targetAmount:number;
}