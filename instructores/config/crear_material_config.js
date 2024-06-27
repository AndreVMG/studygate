document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('#materialForm');
    form.addEventListener('submit', crearMaterial);
});

async function crearMaterial(event) {
    event.preventDefault();

    const form = event.target;
    const cursos_id = form.querySelector('[name="cursos_id"]').value;
    const tipo = form.querySelector('[name="tipo"]').value;
    const titulo = form.querySelector('[name="titulo"]').value;
    const descripcion = form.querySelector('[name="descripcion"]').value;
    const url = form.querySelector('[name="url"]').value;

    const material = {
        cursos_id,
        tipo,
        titulo,
        descripcion,
        url
    };

    const respuesta = await fetch('http://191.232.164.248:5000/materiales', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(material),
    });

    if (respuesta.ok) {
        const data = await respuesta.json();
        console.log('Material creado:', data);
        alert('Material creado con éxito');
        window.location.href = 'home_instructores.html';
    } else {
        const data = await respuesta.json();
        console.log('Error:', data.error);
        alert('Error al crear el material');
    }
}