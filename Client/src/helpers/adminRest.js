export async function getPendingReservations() {
    const requestOptions = {
        method: 'GET',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `${localStorage.getItem('jwt')}`
        }
    };
    const response = await fetch(`http://localhost:3000/admin/pending`, requestOptions);
    return await response.json().then(data => {
        console.log(data);
        if (data && data.length > 0) {
            return data;
        } else {
            return [];
        }
    });
}

export async function getAcceptedReservations() {
    const requestOptions = {
        method: 'GET',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `${localStorage.getItem('jwt')}`
        }
    };
    const response = await fetch(`http://localhost:3000/admin/reservations`, requestOptions);
    return await response.json().then(data => {
        console.log(data);
        if (data && data.length > 0) {
            return data;
        } else {
            return [];
        }
    });
}

export async function getUsers() {
    const requestOptions = {
        method: 'GET',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `${localStorage.getItem('jwt')}`
        }
    };
    const response = await fetch(`http://localhost:3000/admin/users`, requestOptions);
    return await response.json().then(data => {
        console.log(data);
        if (data && data.length > 0) {
            return data;
        } else {
            return [];
        }
    });
}

export function acceptReservation(idReservations) {
    const formData = new URLSearchParams();
    formData.append('idReservations', `${idReservations}`);

    const requestOptions = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `${localStorage.getItem('jwt')}`
        },
        body: formData.toString()
    };
    fetch('http://localhost:3000/admin/accept', requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data && data.success) {
                alert('Reservation accepted!');
            } else {
                alert(`Error occurred!`);
            }
        })
        .catch(() => alert(`Please login again.`));
}

export function adminEditReservation(idRooms, dateStart, dateEnd, idReservations) {
    const formData = new URLSearchParams();
    formData.append('idRooms', `${idRooms}`);
    formData.append('dateStart', `${dateStart}`);
    formData.append('dateEnd', `${dateEnd}`);
    formData.append('idReservations', `${idReservations}`);

    const requestOptions = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `${localStorage.getItem('jwt')}`
        },
        body: formData.toString()
    };
    fetch('http://localhost:3000/admin/update', requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data && data.success) {
                alert('Reservation changed!');
            } else {
                alert(`Selected dates collides with other reservations`);
            }
        })
        .catch(() => alert(`Please login again.`));
}

export function deleteReservation(idReservations) {
    const formData = new URLSearchParams();
    formData.append('idReservations', `${idReservations}`);

    const requestOptions = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `${localStorage.getItem('jwt')}`
        },
        body: formData.toString(),
    };
    fetch('http://localhost:3000/admin/delete', requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data && data.success) {
                alert('Reservation has been removed!')
            } else {
                alert(`Error occurred!`);
            }
        })
        .catch(() => alert(`Please login again.`));
}

export function deleteUser(idUsers) {
    const formData = new URLSearchParams();
    formData.append('idReservations', `${idUsers}`);

    const requestOptions = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `${localStorage.getItem('jwt')}`
        },
        body: formData.toString(),
    };
    fetch('http://localhost:3000/admin/user', requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data && data.success) {
                alert('Reservation has been removed!')
            } else {
                alert(`Error occurred!`);
            }
        })
        .catch(() => alert(`Please login again.`));
}