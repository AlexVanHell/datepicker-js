# JS Datepicker
jQuery plug-in para poder hacer selección de fechas

## Instalacion

1. Añadir jQuery.
```html
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
```

2. Llamar el archivo js para el plug-in justo despues de haber agregado jQuery.
```html
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript" src="js/datepicker.js"></script>
```
<br>

## Implementación y Uso

Mandar a llamar `$(selector).datepicker();` y agregarlo dentro del `$(document).ready` o al final de la pagina.
```html
<div id="datepicker"></div> <!-- Aqui se va a colocar el calendario -->

<script type="text/javascript">
    $(document).ready( function() {
        $('#datepicker').datepicker();
    });
</script>
```

### JS

#### Modificar valores predeterminados
Puedes editar los valores predeterminados para personalizar tu datepicker.

```js
// Estos son los valores por defecto
$('#datepicker').datepicker({
    inputId: undefined, // id del input para mostrar la fecha seleccionada
    leftButton: '', // src para la imagen del boton izquierdo
    rightButton: '', // src para la imagen del boton derecho
    selectionColor: '#424242', // Color de fondo al seleccionar el día
    hoverColor: 'rgba(0,0,0,0.08)', // Color de fondo al pasar por encima del día
    blockDays: false, // Activar bloqueo de días anteriores al día de hoy
    separator: '/', // Separador (dd/mm/yyyy)
    yearSelection: true, // Activar selección de años
    startingYear: 2000, // Año que se va a mostrar el inicio
    startingMonth: 03, // Mes que se va a mostrar al inicio
    maxYear: 2030, // Año maximo para selección de años
    minYear: 1990, // Año minimo para selección de años
    onDaySelection: function() {},
});
```

### Input Relacionado

Colocar un elemento `input` con un id para poder mostrar la fecha seleccionada en este.
```html
    <input type="text" id="datepicker-input" name="">
    <div id="datepicker"></div>
```
En el js asignar el id del `input` agregado.
```js
$('#datepicker').datepicker({
    inputId: 'datepicker-input'
});
```

#### Funcion al seleccionar un día
```js
$('#datepicker').datepicker({
    onDaySelection: function() {
        // Implementar codigo al hacer click en algun día
    }
});
```

#### Para algun problema o duda con el plugin favor de contactarme a mi correo electronico
alejandrodnl.cv@hotmail.com
