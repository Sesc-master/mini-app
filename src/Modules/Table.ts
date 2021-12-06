import { schedules, schedule, idableScheduleType, sheduleLesson } from "../Modules/Schedule";


export class Table {
	static teachers: any;
	static auditories: any;
	
	public static getTable(scheduleType: idableScheduleType, weekday: number, grade: string) {
		switch (scheduleType) {
			case "group":
				return schedules.getSchedule(scheduleType, weekday, Number(Table.grades.get(grade)));
			case "teacher":
				// TODO: парсить учителей и их id
				return schedules.getSchedule(scheduleType, weekday, Number(Table.grades.get(grade)));
			case "auditory":
				// TODO: парсить кабинеты и их id
				return schedules.getSchedule(scheduleType, weekday, Number(Table.grades.get(grade)));
		}
		// TODO: случай поеботы с нeкорректным типом, послать исключением
	}

	static maxLessons = 7;

	public static listifySchedule(schedule: schedule) {
		let lessons = new Array<sheduleLesson>();

		schedule.lessons.forEach(lesson => lessons.push(lesson));
		schedule.diffs.forEach(lesson => lessons.push(lesson));

		let result = new Array<Array<sheduleLesson>>();
		for (let scheduleSlot = 0; scheduleSlot < this.maxLessons; scheduleSlot++) {
			result.push(new Array<sheduleLesson>());
		}
		lessons.forEach(lesson => result[lesson.number - 1].push(lesson));
		return result;
	}

	public static getFullTable(weekday: number) {
		return schedules.getFullSchedule(weekday)
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