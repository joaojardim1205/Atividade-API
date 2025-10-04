async function cadastrar(){
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    try{
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({nome, email, senha})
        });

        const data = await response.json()
        if (response.ok) {
            document.getElementById("msg").innerHTML = data.message;
            window.location.href = 'login.html';
        } else {
            document.getElementById("msg").innerHTML = data.error;
        }
    } catch (err) {
    document.getElementById("msg").innerHTML = 'Erro ao cadastrar';
    }
}
