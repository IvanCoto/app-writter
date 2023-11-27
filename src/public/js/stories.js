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
