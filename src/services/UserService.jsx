// URL del endpoint de usuarios
const apiUrl = 'http://localhost:3000/users';

// Función para obtener todos los usuarios usando Fetch
export const getUsers = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error al obtener los usuarios');
    }
    const data = await response.json();
    return data;  // Devuelve la lista de usuarios
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error;
  }
};

// Función para obtener un usuario por su ID usando Fetch
export const getUserById = async (userId) => {
  try {
    const response = await fetch(`${apiUrl}/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Error al obtener el usuario');
    }
    const user = await response.json();
    return user;  // Devuelve el usuario específico
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw error;
  }
};

// Función para agregar un nuevo usuario usando Fetch
export const PostUser = async (user) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Error al agregar el usuario');
    }

    const data = await response.json();
    alert('Registro exitoso!');
    return data;  // Devuelve la respuesta del servidor
  } catch (error) {
    console.error('Error al agregar el usuario:', error);
    throw error;
  }
};

// Función para actualizar un usuario usando Fetch
export const PutUser = async (user) => {
  try {
    const response = await fetch(`${apiUrl}/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar el usuario con id ${user.id}`);
    }

    return { message: `Usuario con id ${user.id} actualizado exitosamente` };
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};

// Función para eliminar un usuario usando Fetch
export const DeleteUser = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar el usuario con id ${id}`);
    }

    return { message: `Usuario con id ${id} eliminado exitosamente` };
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw error;
  }
};
