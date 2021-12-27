import request from "../Modules/AllOriginsProxy";

export class baseLesson {
	subject: string;
	teacher: string;
	group: string;
}

export class fullSсhedule {
	auditories: Map<string, Array<baseLesson | boolean>>;

	public isFreeAuditory(auditory: string, lessonNumber: number): Boolean {
		let auditorySchedule = this.auditories.get(auditory);
		if (auditorySchedule !== undefined) {
			return auditorySchedule[lessonNumber] === false;
		}
		else return false;
	}
	public getFreeAuditoriesOnLesson(lessonNumber: number): Array<string> {
		let freeAuditories: Array<string> = [];
		console.log(this.auditories);
		this.auditories.forEach((lessons, auditory) => {
			if (lessons[lessonNumber] === false) freeAuditories.push(auditory);
		});
		return freeAuditories;
	}
	public getFreeAuditories(): Array<Array<string>> {
		let maxLessons: number = this.auditories.values().next().value.length;
		let result = new Array<Array<string>>(maxLessons);
		for (let lesson = 0; lesson < maxLessons; lesson++) {
			result[lesson] = this.getFreeAuditoriesOnLesson(lesson);
		}
		return result;
	}
}

export class sсheduleLesson extends baseLesson {
	uid: number;
	auditory: string;
	subgroup: number;
	number: number;
	weekday: number;
	date?: string;
}

export type idableScheduleType = "group" | "teacher" | "auditory";
export type scheduleType = idableScheduleType | "all";

export class schedule {
	type: scheduleType;
	lessons: Array<sсheduleLesson>;
	diffs: Array<sсheduleLesson>;
}

export class schedules {
	public static type: number = 11;
	public static server: string = "lyceum.urfu.ru"

	private static async request(scheduleType: scheduleType, weekday: number, id?: number) {
		let url = new URL(`https://${this.server}`);

		url.searchParams.append("weekday", String(weekday));
		url.searchParams.append("scheduleType", scheduleType);
		url.searchParams.append("type", String(this.type));

		if (scheduleType !== "all") {
			url.searchParams.append(scheduleType, String(id))
		}

		return request(url.toString())
		.then(response => {
			return response.json();
		})
	}

	private static scheduleFromJSON(parsedJSON: JSON | any) {
		let result = new schedule();
		Object.assign(result, parsedJSON);
		return result;
	}

	public static async getFullSchedule(weekday: number) {
		return this.request("all", weekday)
		.then(APIResponse => {
			let result = new fullSсhedule();
			if (APIResponse.auditories) {
				//Convert object in parsed json to map
				result.auditories = new Map(Object.keys(APIResponse.auditories).map(auditory => [auditory, APIResponse.auditories[auditory]]));
			}
			return result;
		})
	}
	public static async getSchedule(scheduleType: idableScheduleType, weekday: number, id: number) {
		return this.request(scheduleType, weekday, id)
		.then(schedules.scheduleFromJSON);
	}
}