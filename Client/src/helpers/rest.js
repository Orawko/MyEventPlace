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
            if (data && data.success) {
                alert('Your reservation has been removed!')
            } else {
                alert(`Error occured!`);
            }
        })
        .catch(() => alert(`Please login again.`));
}

export function confirmReservation(data) {
    const formData = new URLSearchParams();
    formData.append('idRooms', `${data.idRooms}`);
    formData.append('dateStart', `${data.dateStart}`);
    formData.append('dateEnd', `${data.dateEnd}`);

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
            if (data && data.success) {
                alert('Your reservation is pending!');
            } else {
                alert(`Error occurred!`);
            }
        })
        .catch(() => alert(`Please login again.`));
}

export function editReservation(idRooms, dateStart, dateEnd, idReservations) {
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
        body: formData.toString(),
    };
    fetch('http://localhost:3000/user/edit', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data && data.success) {
                alert('Your changed reservation is pending!');
            } else {
                alert(`Selected dates collides with other reservations`);
            }
        })
        .catch(() => alert(`Please login again.`));
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
        if (data && data.length > 0) {
            return data;
        } else {
            return [];
        }
    });
}

export async function getSearchResults(dateStart, dateEnd, price, capacity) {
    const requestOptions = {
        method: 'GET',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `${localStorage.getItem('jwt')}`
        }
    };
    const response = await fetch(`http://localhost:3000/result/${dateStart}/${dateEnd}/${price}/${capacity}`, requestOptions);
    return await response.json().then(data => {
        if (data && data.length > 0) {
            return data;
        } else {
            alert(`No rooms available!`);
            return [];
        }
    });
}


export async function userAuthenticated() {
    const requestOptions = {
        method: 'GET',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `${localStorage.getItem('jwt')}`
        }
    };
    const response = await fetch(`http://localhost:3000/login`, requestOptions);
    return await response.json().then(data => {
        if (data && data.timeLeft > 0) {
            return true;
        } else {
            alert(`Please login again.`);
            return false;
        }
    });
}