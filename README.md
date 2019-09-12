# Moodel reporter app (En desarrollo)

Esta aplicacion  se conecta a cualquier base de datos de moodle para obtener, filtrar y mostrar reportes que no pueden ser obtenidos en moodle.

Los reportes que esta aplicacion obtiene estan en PDF y CSV:

####Dashboard: 
+ muestra cantidad de alumnos, profesores y administradores de moodle
+ cantidad total de cursos.
+ Grafico de alumnos por curso
+ Grafico de actividad por parte de los alumnos en cada curso


####Alumnos:
+ total de alumnos enrolados a cursos, filtrados por curso
+ Descripcion de cuantas y el tipo de interacciones que tuvo el alumno con cada curso.

####Profesores
+ Total de profesores enrolados a cursos, filtrados por curso
+ Descripcion de cuantas y el tipo de interacciones que tuvo el alumno con cada curso.


Hecho con:

* Slim Php 3 
  - /public/index
  - base de datos: /src/config/database.php
  - routes: /src/routes/

* React v16, con redux /development/view/
