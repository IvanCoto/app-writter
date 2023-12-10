function toggleManualInput(fieldId, switchId) {
    const manualInput = document.getElementById(fieldId);
    const manualSwitch = document.getElementById(switchId);
    const hiddenSwitch = document.getElementById(`switchAuto${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)}`);
    if (manualSwitch.checked) {
        // Ocultar el campo manual si está seleccionado
        manualInput.classList.add('hidden');
        // Quitar el atributo required
        manualInput.removeAttribute('required');
        // Establecer el valor del campo oculto en "true"
        hiddenSwitch.value = "true";
    } else {
        // Mostrar el campo manual si no está seleccionado
        manualInput.classList.remove('hidden');
        // Agregar el atributo required
        manualInput.setAttribute('required', 'required');
        // Establecer el valor del campo oculto en "false"
        hiddenSwitch.value = "false";
    }
}


// Variable para almacenar el estado de isLoading
var isLoading = false;

// Función que se ejecuta al hacer clic en el botón
function startGeneratingHistory() {
    // Obtén la referencia al elemento que tiene la clase "loader"
    var loaderElement = document.querySelector('.loader');

    // Verifica si el elemento existe antes de intentar cambiar su clase
    if (loaderElement) {
        // Cambia la clase del elemento para agregar la clase "active"
        loaderElement.classList.add('active');

        // También puedes modificar el texto dentro del elemento si es necesario
        loaderElement.querySelector('h1').innerText = 'Generando historia...';

        // Cambia el estado de isLoading a true
        isLoading = true;
    }
}