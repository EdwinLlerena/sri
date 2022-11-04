
//$(document).ready(function () {
//   $('#docu').DataTable();
//});


$(document).ready(function() {

    $('#docu').DataTable( 
         {
  "language": {
    "info": "Pagina _PAGE_ de _PAGES_",
    "lengthMenu":     "Mostrar _MENU_ registros",
    "search":         "Buscar:",
    "paginate": {
        "first":      "Primera",
        "last":       "Última",
        "next":       "Siguiente",
        "previous":   "Anterior"
    },
  }
}
     );

} );