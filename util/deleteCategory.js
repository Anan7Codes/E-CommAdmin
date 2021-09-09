const verifyUser = async (id) => {    
    const data = await fetch(`http://localhost:3000/api/productCategory?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })

    location.reload()
}

export default verifyUser