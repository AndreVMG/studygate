document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('form');
    form.addEventListener('submit', postUsuario);
});

async function obtenerUsuarios() {
    const respuesta = await fetch('http://191.232.164.248:5000/usuarios', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!respuesta.ok) {
        throw new Error('Error al obtener los usuarios');
    }

    const data = await respuesta.json();
    return data.usuarios || [];
}
async function obtenerIdPorEmail(emailBuscado) {
    const usuarios = await obtenerUsuarios();

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].correo_electronico === emailBuscado) {
            return usuarios[i].id;
        }
    }
    console.log("Usuario no encontrado");
    return null;
}

async function postUsuario(event) {
    event.preventDefault(); 

    const form = event.target;
    const nombre = form.querySelector('[name="nombre"]').value;
    const correo_electronico = form.querySelector('[name="correo"]').value;
    const contrasena = form.querySelector('[name="contraseña"]').value;
    const nivel_educativo = parseInt(form.querySelector('[name="nivelEducativo"]').value, 10);
    const fecha_registro = new Date().toISOString();

    const usuario = {
        nombre,
        correo_electronico,
        contrasena,
        fecha_registro
    };

    const respuesta = await fetch('http://191.232.164.248:5000/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    });
    console.log("Respuesta del servidor:", respuesta.status);
    const cuerpoRespuesta1 = await respuesta.json(); 
    console.log("Cuerpo de la respuesta:", cuerpoRespuesta1);
    if (!respuesta.ok) {
        throw new Error('Error al enviar el formulario');
    }
    
    const usuarios_id = await obtenerIdPorEmail(correo_electronico);
    const estudiante = {
        usuarios_id,
        nivel_educativo
    }
    const respuestaEstudiante = await fetch('http://191.232.164.248:5000/estudiantes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(estudiante),
    });
    console.log("Respuesta del servidor:", respuestaEstudiante.status);
    const cuerpoRespuesta2 = await respuestaEstudiante.json(); 
    console.log("Cuerpo de la respuesta:", cuerpoRespuesta2);
    if (!respuestaEstudiante.ok) {
        throw new Error('Error al enviar el formulario');
    } else {
        // Aquí se muestra el mensaje de éxito en el HTML
        alert('Usuario creado correctamente.');
        window.location.href = '../index.html';
    }
    event.target.reset();
}
