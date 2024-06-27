document.addEventListener('DOMContentLoaded', async (event) => {
    const estudiantes_id = localStorage.getItem('id');
    const inscripciones = await obtenerInscripcionesEstudiante();
    const cursos = await obtenerCursos();
    const inscripciones_estudiantes =inscripciones.filter(inscripcion=> inscripcion.estudiantes_id == Number(estudiantes_id))
    const cursosContainer = document.querySelector('#cursos');

    inscripciones_estudiantes.forEach(inscripcion => {
        const cursoElement = document.createElement('div');
        cursoElement.classList.add('curso');
        const cursos_estudiante = cursos.filter(c=>c.id==inscripcion.cursos_id);
        cursos_estudiante.forEach(curso=>{
            cursoElement.innerHTML = `
            <h3>${curso.nombre}</h3>
            <p>${curso.descripcion}</p>
            <p>Fecha de Creación: ${curso.fecha_creacion}</p>
            <p>Costo: $${curso.costo}</p>
        `;
        })
        cursosContainer.appendChild(cursoElement);
    });
});

async function obtenerInscripcionesEstudiante() {
    const respuesta = await fetch(`http://191.232.164.248:5000/inscripciones`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!respuesta.ok) {
        throw new Error('Error al obtener los cursos del estudiante');
    }

    const data = await respuesta.json();
    return data.inscripciones || [];
}
async function obtenerCursos() {
    const respuesta = await fetch('http://191.232.164.248:5000/cursos', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!respuesta.ok) {
        throw new Error('Error al obtener los cursos');
    }

    const data = await respuesta.json();
    return data.cursos || [];
}