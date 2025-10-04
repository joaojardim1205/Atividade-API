async function login(){
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try{
    const response = await fetch('http://localhost:3000/login', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, senha})
    });

    const data = await response.json()
    if (response.ok) {
        document.getElementById("msg").innerHTML = data.message;
        window.location.href = 'index.html';
    } else {
        document.getElementById("msg").innerHTML = data.error;
    }
    } catch (err) {
    document.getElementById("msg").innerHTML = 'Erro no login';
    }
}
