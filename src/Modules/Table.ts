import { schedules, schedule, idableScheduleType, sсheduleLesson } from "../Modules/Schedule";


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
	static lessonCanceledName = "Нет";

	public static listifySchedule(schedule: schedule) {
		let result = new Array<Array<sсheduleLesson>>();
		for (let scheduleSlot = 0; scheduleSlot < this.maxLessons; scheduleSlot++) {
			result.push(new Array<sсheduleLesson>());
		}
		schedule.lessons.forEach(lesson => result[lesson.number - 1].push(lesson));
		console.log(result);
		schedule.diffs.forEach(lesson => {
			if (lesson.subject === this.lessonCanceledName) {
				if (lesson.subgroup === 0) result[lesson.number - 1] = [];
				else {
					result[lesson.number - 1] = result[lesson.number - 1].filter(l => l.subgroup !== lesson.subgroup);
				}
			}
			else if (result[lesson.number - 1].length === 0) {
				result[lesson.number - 1].push(lesson);
			}
			else {
				if (lesson.subgroup === 0) result[lesson.number - 1] = [lesson];
				else {
					result[lesson.number - 1].forEach(l => {
						if (l.subgroup === lesson.subgroup) l = lesson;
					});
				}
			}
		});
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