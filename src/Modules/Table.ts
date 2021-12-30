import { Schedules, IdableScheduleType,} from "../Modules/Schedule";


export class Table {
    static teachers: any;
    static auditories: any;
	
    public static getTable(scheduleType: IdableScheduleType, weekday: number, grade: string) {
        switch (scheduleType) {
            case "group":
                return Schedules.getSchedule(scheduleType, weekday, Number(Table.grades.get(grade)));
            case "teacher":
                // TODO: парсить учителей и их id
                return Schedules.getSchedule(scheduleType, weekday, Number(Table.grades.get(grade)));
            case "auditory":
                // TODO: парсить кабинеты и их id
                return Schedules.getSchedule(scheduleType, weekday, Number(Table.grades.get(grade)));
        }
        // TODO: случай поеботы с нeкорректным типом, послать исключением
    }

    public static getFullTable(weekday: number) {
        return Schedules.getFullSchedule(weekday)
    }

    private static grades: Map<string, number> = new Map([
        ["8А",1],
        ["8В",2],
        ["9А",4],
        ["9Б",5],
        ["9В",3],
        ["9Г",11],
        ["9Е",9],
        ["10А",12],
        ["10Б",13],
        ["10В",14],
        ["10Г",15],
        ["10Д",16],
        ["10Е",17],
        ["10З",18],
        ["10К",19],
        ["10Л",20],
        ["10М",21],
        ["10Н",22],
        ["10С",23],
        ["11А",6],
        ["11Б",7],
        ["11В",8],
        ["11Г",24],
        ["11Д",25],
        ["11Е",26],
        ["11З",27],
        ["11К",28],
        ["11Л",29],
        ["11М",30],
        ["11Н",32],
        ["11С",31]])
}