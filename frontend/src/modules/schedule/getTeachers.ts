export default function getTeachers(){
    return fetch("/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({query: "{ getTeachers }"})
    })
        .then(response => response.json())
        .then(response => response.data.getTeachers);
}