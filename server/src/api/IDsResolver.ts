import "reflect-metadata";
import { Arg, Int, Query, Resolver } from "type-graphql";
import { IdableScheduleType, IdableScheduleTypeValues } from "../sesc/sescAPI/getSchedule";
import IDsCache from "../sesc/sescCache/caches/IDsCache";

@Resolver()
export default class IDsResolver {
    @Query(type => [String])
    async getNames(@Arg("type") type: IdableScheduleType): Promise<Array<string>> {
        if (IdableScheduleTypeValues.includes(type)) return Array.from(Object.keys((await IDsCache())[type]))
        else return [];
    }

    @Query(type => Int, {nullable: true})
    async getID(
        @Arg("type") type: IdableScheduleType,
        @Arg("name") name: string
    ): Promise<number | undefined> {
        if (IdableScheduleTypeValues.includes(type))  return (await IDsCache())[type][name];
        else return undefined;
    }

    @Query(type => String, {nullable: true})
    async getName(
        @Arg("type") type: IdableScheduleType,
        @Arg("ID") ID: number
    ): Promise<number | undefined> {
        if (IdableScheduleTypeValues.includes(type)) {
            let result = undefined;
            (await IDsCache())[type]?.forEach((possibleID : any, name: any) => {
                if (possibleID == ID) result = name;
            });
            return result;
        }
        else return undefined;
    }


    @Query(type => [String])
    async getClasses() {
        return await this.getNames("group");
    }

    @Query(type => Int, {nullable: true})
    async getClassID(@Arg("name") className: string) {
        return await this.getID("group", className);
    }

    @Query(type => String, {nullable: true})
    async getClassName(@Arg("ID") classID: number) {
        return await this.getName("group", classID);
    }


    @Query(type => [String])
    async getTeachers() {
        return await this.getNames("teacher");
    }

    @Query(type => Int, {nullable: true})
    async getTeacherID(@Arg("name") teacherName: string) {
        return await this.getID("teacher", teacherName);
    }

    @Query(type => String, {nullable: true})
    async getTeacherName(@Arg("ID") teacherID: number) {
        return await this.getName("teacher", teacherID);
    }


    @Query(type => [String])
    async getClassrooms() {
        return await this.getNames("auditory");
    }

    @Query(type => Int, {nullable: true})
    async getAuditoryID(@Arg("name") auditoryName: string) {
        return await this.getID("auditory", auditoryName);
    }

    @Query(type => String, {nullable: true})
    async getAuditoryName(@Arg("ID") auditoryID: number) {
        return await this.getName("auditory", auditoryID);
    }
}