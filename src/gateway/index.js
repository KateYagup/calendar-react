// Удаление ивента
const baseUrl = 'https://66efde95f2a8bce81be46357.mockapi.io/tasks';

export const getEvents = () =>
    fetch(baseUrl)
        .then((response) => {
            if (!response.ok) throw new Error("Error: Cant't display events");
            return response.json();
        })

export const deleteEvent = (eventId) =>
    fetch(`${baseUrl}/${eventId}`, { method: "DELETE" })
        .then((response) => {
            if (!response.ok) throw new Error("Error/ Can't delete event")
        })
        .catch((error) => alert(error.message));

export const createEvent = (newTask) =>
    fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
    })