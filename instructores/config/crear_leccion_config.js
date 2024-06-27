document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('#leccionForm');
    form.addEventListener('submit', crearLeccion);
});

async function crearLeccion(event) {
    event.preventDefault();

    const form = event.target;
    const cursos_id = form.querySelector('[name="cursos_id"]').value;
    const titulo = form.querySelector('[name="titulo"]').value;
    const contenido = form.querySelector('[name="contenido"]').value;
    const orden = form.querySelector('[name="orden"]').value;

    const material = {
        cursos_id,
        titulo,
        contenido,
        orden
    };

    const respuesta = await fetch('http://191.232.164.248:5000/lecciones', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(material),
    });

    if (respuesta.ok) {
        const data = await respuesta.json();
        console.log('Lección creada:', data);
        alert('Lección creado con éxito');
        window.location.href = 'home_instructores.html';
    } else {
        const data = await respuesta.json();
        console.log('Error:', data.error);
        alert('Error al crear la lección');
    }
}