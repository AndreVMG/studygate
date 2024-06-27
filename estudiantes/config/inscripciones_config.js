document.addEventListener('DOMContentLoaded', async (event) => {
    try {
        const cursos = await obtenerCursos();
        const cursosContainer = document.querySelector('#cursos');

        cursos.forEach(curso => {
            const cursoElement = document.createElement('div');
            cursoElement.classList.add('curso');

            cursoElement.innerHTML = `
                <h3>${curso.nombre}</h3>
                <p>${curso.descripcion}</p>
                <p>Fecha de Creación: ${curso.fecha_creacion}</p>
                <p>Costo: $${curso.costo}</p>
                <button onclick="inscribirCurso(${curso.id})">Inscribirse</button>
            `;

            cursosContainer.appendChild(cursoElement);
        });
    } catch (error) {
        console.error('Error al cargar los cursos:', error);
        alert('Hubo un problema al cargar los cursos. Inténtelo de nuevo más tarde.');
    }
});

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

async function inscribirCurso(cursoId) {
    const usuarioId = localStorage.getItem('id');
    const fecha_inscripcion = new Date().toISOString().split('T')[0];
    const fecha = new Date().toISOString();
    const monto = await obtenerCostoCurso(cursoId);

    const inscripcion = {
        estudiantes_id: usuarioId,
        cursos_id: cursoId,
        fecha_inscripcion,
        monto: monto,
        fecha
    };

    const respuesta = await fetch('http://191.232.164.248:5000/inscripciones', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inscripcion),
    });

    if (respuesta.ok) {
        const data = await respuesta.json();
        console.log('Inscripción creada:', data);
        alert('Inscripción creada con éxito');
    } else {
        const data = await respuesta.json();
        console.log('Error:', data.error);
        alert('Error al inscribirse');
    }
}

async function obtenerCostoCurso(cursoId) {
    const cursos = await obtenerCursos();
    const curso = cursos.find(curso => curso.id === cursoId);
    return curso.costo;
}
