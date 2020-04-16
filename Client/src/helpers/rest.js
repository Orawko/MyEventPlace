import React from 'react';

export function deleteReservation(data) {
    const formData = new URLSearchParams();
    formData.append('idReservations', `${data.idReservations}`);

    const requestOptions = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `${localStorage.getItem('jwt')}`
        },
        body: formData.toString(),
    };
    fetch('http://localhost:3000/user/delete', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data) {
                alert('Your reservation has been removed!')
            } else {
                alert(`Error occured!`);
            }
        })
        .catch(() => alert(`Invalid email or password`));
}

export function confirmReservation(data) {
    const formData = new URLSearchParams();
    formData.append('idRooms', `${data.idRooms}`);
    formData.append('from', `${data.dateStart}`);
    formData.append('to', `${data.dateEnd}`);

    console.log(data);
    const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `${localStorage.getItem('jwt')}`
        },
        body: formData.toString(),
    };
    fetch('http://localhost:3000/add', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data && data.affectedRows === 1) {
                alert('Your reservation is pending!');
            } else {
                alert(`Invalid email or password`);
            }
        })
        .catch(() => alert(`Invalid email or password`));
}

export function editReservation(idRooms, dateStart, dateEnd, idReservations) {
    const formData = new URLSearchParams();
    formData.append('idRooms', `${idRooms}`);
    formData.append('from', `${dateStart}`);
    formData.append('to', `${dateEnd}`);
    formData.append('idReservations', `${idReservations}`);

    console.log(idRooms);
    const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `${localStorage.getItem('jwt')}`
        },
        body: formData.toString(),
    };
    fetch('http://localhost:3000/user/edit', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data) {
                alert('Your reservation is pending!');
            } else {
                alert(`Selected dates collides with other reservations`);
            }
        })
        .catch(() => alert(`Error occurred`));
}

export async function getMyReservations() {
    const requestOptions = {
        method: 'GET',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `${localStorage.getItem('jwt')}`
        }
    };
    const response = await fetch(`http://localhost:3000/user`, requestOptions);
    return await response.json().then(data => {
        console.log(data);
        if (data && data.length > 0) {
            return data;
        } else {
            return [];
        }
    });
}

export async function getSearchResults(from, to, price, capacity) {
    const requestOptions = {
        method: 'GET',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `${localStorage.getItem('jwt')}`
        }
    };
    const response = await fetch(`http://localhost:3000/result/${from}/${to}/${price}/${capacity}`, requestOptions);
    return await response.json().then(data => {
        if (data && data.length > 0) {
            return data;
        } else {
            alert(`No rooms available!`);
            return [];
        }
    });
}