const verifyUser = async (id) => {    
    const data = await fetch(`http://localhost:3000/api/verification/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
    })

    location.reload()
}

export default verifyUser