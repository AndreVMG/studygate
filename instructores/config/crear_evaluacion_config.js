document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('#evaluationForm');
    form.addEventListener('submit', crearEvaluacion);
});

async function crearEvaluacion(event) {
    event.preventDefault();

    const form = event.target;
    const cursos_id = form.querySelector('[name="cursos_id"]').value;
    const titulo = form.querySelector('[name="titulo"]').value;
    const descripcion = form.querySelector('[name="descripcion"]').value;
    const fecha_evaluacion = form.querySelector('[name="fecha_evaluacion"]').value;

    const evaluacion = {
        cursos_id,
        titulo,
        descripcion,
        fecha_evaluacion
    };

    const respuesta = await fetch('http://191.232.164.248:5000/evaluaciones', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(evaluacion),
    });

    if (respuesta.ok) {
        const data = await respuesta.json();
        console.log('Evaluación creada:', data);
        alert('Evaluación creado con éxito');
        window.location.href = 'home_instructores.html';
    } else {
        const data = await respuesta.json();
        console.log('Error:', data.error);
        alert('Error al crear el curso');
    }
}