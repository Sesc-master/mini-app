import getIDs from "./api/getIDs";

export default async function getTeachers(){
    return (await getIDs())?.teachers;
}