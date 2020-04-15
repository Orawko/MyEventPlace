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