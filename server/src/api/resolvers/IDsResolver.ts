import "reflect-metadata";
import { Arg, Int, Query, Resolver } from "type-graphql";
import { IdableScheduleType, IdableScheduleTypeValues } from "../../dataGetters/getSchedule";
import IDsCache from "../caches/IDsCache";

@Resolver()
export default class IDsResolver {
    @Query(type => [String])
    getNames(@Arg("type") type: IdableScheduleType): Array<string> {
        if (IdableScheduleTypeValues.includes(type)) return Array.from(IDsCache()[type].keys())
        else return [];
    }

    @Query(type => Int, {nullable: true})
    getID(
        @Arg("type") type: IdableScheduleType,
        @Arg("name") name: string
    ): number | undefined {
        if (IdableScheduleTypeValues.includes(type)) return IDsCache()[type].get(name);
        else return undefined;
    }

    @Query(type => String, {nullable: true})
    getName(
        @Arg("type") type: IdableScheduleType,
        @Arg("ID") ID: number
    ): number | undefined {
        if (IdableScheduleTypeValues.includes(type)) {
            let result = undefined;
            IDsCache()[type].forEach((possibleID, name) => {
                if (possibleID == ID) result = name;
            });
            return result;
        }
        else return undefined;
    }


    @Query(type => [String])
    getClasses() {
        return this.getNames("group");
    }

    @Query(type => Int, {nullable: true})
    getClassID(@Arg("name") className: string) {
        return this.getID("group", className);
    }

    @Query(type => String, {nullable: true})
    getClassName(@Arg("ID") classID: number) {
        return this.getName("group", classID);
    }


    @Query(type => [String])
    getTeachers() {
        return this.getNames("teacher");
    }

    @Query(type => Int, {nullable: true})
    getTeacherID(@Arg("name") teacherName: string) {
        return this.getID("teacher", teacherName);
    }

    @Query(type => String, {nullable: true})
    getTeacherName(@Arg("ID") teacherID: number) {
        return this.getName("teacher", teacherID);
    }


    @Query(type => [String])
    getAuditories() {
        return this.getNames("auditory");
    }

    @Query(type => Int, {nullable: true})
    getAuditoryID(@Arg("name") auditoryName: string) {
        return this.getID("auditory", auditoryName);
    }

    @Query(type => String, {nullable: true})
    getAuditoryName(@Arg("ID") auditoryID: number) {
        return this.getName("auditory", auditoryID);
    }
}