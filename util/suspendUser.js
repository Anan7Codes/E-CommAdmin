const suspendUser = async (id) => {    
    const data = await fetch(`http://localhost:3000/api/suspend/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
    })

    location.reload()
}

export default suspendUser