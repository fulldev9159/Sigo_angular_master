
/*Todos los contratos */
select * from contratos where estado='A';
select rut,dv,nombre,email,telefono,direccion,estado,tipo_proveedor_id from proveedores where estado='A'; 
-- contratos_proveedores (subcontratos) para que se usa esta tabla? debería representar el subcontrato. Aparentemente no se usa realmente en el sistema de DB
select DISTINCT(contrato_id) from contratos_proveedores;
SELECT c.nombre,p.nombre,cp.codigo_acuerdo,cp.fecha_inicio,cp.fecha_termino,cp.region_id from contratos_proveedores cp INNER JOIN proveedores p on cp.proveedor_id=p.id INNER JOIN contratos c on cp.contrato_id= c.id where cp.contrato_id=25 ;
-- Esta tabla sería nuestra tabla subcontrato pero ellos a nivel de db solo lo usan para almacenar info. Nosotros lo usamos de base para las LPU
select * from proveedores_numeroscontratos where contrato_id=25 and proveedor_id=10059;

-- Servicios de un proveedor
--- Nombres de Servicios de un contrato y de un proveedor para luego procesar y dejar los unicos
select DISTINCT(nombre) from servicios s INNER JOIN proveedores_servicios ps on ps.servicio_id=s.id where s.estado='A' and ps.contrato_id=25 and ps.proveedor_id= 10059 order by nombre;
-- LPUS
-- Los nombres se parecen y están incompletos Especiales Suministro de un metro adicional a 10 metros de  cruzada
select ps.region_id,s.tipo_servicio_id,s.nombre, ps.precio,ps.tipo_moneda_id, ps.numero_producto from servicios s INNER JOIN proveedores_servicios ps on ps.servicio_id=s.id where s.estado='A' and ps.contrato_id=25 and ps.proveedor_id= 10059 ;
--- hay servicios con el mismo nombre pero con distinto tipo
select * from servicios where nombre like '%Especiales Readecuación de Red - Instalación/Integración Nodob/BTS%'
---- Servicios con distinta ciudad
select * from servicios where nombre like '%Especiales Adicional por transporte de materiales desde 15,1 a 30 Mts3 %'
--- servicios proveedores
select ps.proveedor_id,ps.contrato_id,ps.precio,s.nombre from servicios s INNER JOIN proveedores_servicios ps on ps.servicio_id=s.id where s.estado='A' and s.nombre like '%TRASLADO ING/TEC SOPORTE AÉREO IDA Y RETORNO Región%'

select * from tipo_servicio where estado='A';



-- Distintos contratos usados en cubicaciones
select DISTINCT(cc.nombre) from cubicador_detalle cd INNER JOIN cubicador c on cd.cubicador_id=c.id INNER JOIN contratos cc on c.contrato_id=cc.id;
-- UNIFICADO-2019-FIJA
-- Desmantelamiento
-- MINERIA
-- UNIFICADO-2019-MOVIL
-- Contrato Unificado
-- LVES

-- Mayor cantidad de serivicos por cubicacion UNIFICADO-2019-MOVIL
select cubicador_id,p.nombre,c.proveedor_id,count(*) from cubicador_detalle cd INNER JOIN cubicador c on cd.cubicador_id=c.id INNER JOIN proveedores p on c.proveedor_id = p.id where c.contrato_id=25 and c.proveedor_id not in (10058) GROUP BY cubicador_id,p.nombre,c.proveedor_id HAVING count(*)>10;
-- 54652	SIAE Microelettronica Chile SPA	10045	12
-- 56334	SIAE Microelettronica Chile SPA	10045	11
-- 53188	GENERATEL SPA	10059	12
-- 45719	SIAE Microelettronica Chile SPA	10045	11
-- 56922	TECNOCOM CHILE S.A.	7	12
-- 47873	GENERATEL SPA	10059	11

-- Datos de los servicios de una cubicacion
select  s.nombre from cubicador_detalle cd INNER JOIN cubicador c on cd.cubicador_id=c.id INNER JOIN servicios s on cd.servicio_id=s.id where cubicador_id=53188;
select * from proveedores where id=10059;
-- Roles de los usuarios de un proveedor -- GENERATEL SPA 10059
select u.nombre_usuario as nombre_usuario,r.nombre from usuarios u INNER JOIN usuarios_roles ur on u.id= ur.usuario_id INNER JOIN roles r on r.id= ur.rol_id  where proveedor_id=10059 and u.estado='A' ;
-- Seleccion de usuarios proveedor
select u.nombre_usuario as nombre_usuario,u.rut,u.dv,nombres,apellidos,celular,u.estado,p.nombre,area_id,u.email from usuarios u  INNER JOIN proveedores p on u.proveedor_id=p.id where proveedor_id=10059 and u.estado='A' ;

-- Agregar Contrato
select * from contratos where id=25;





select * from tipo_moneda where id in (2,4);
select s.id,s.nombre,s.tipo_servicio_id,s.nombre from servicios s INNER JOIN tipo_servicio b on s.tipo_servicio_id= b.id where s.id in (12156,12158,12157,12164,29769,29771,28872,28873,28874,363,364,365,366);

/*select * from servicios where id in (12164,12158);*/

/*Contratos Proveedores
select a.contrato_id,d.nombre as "contrato",a.proveedor_id,b.nombre as "proveedor" from contratos_proveedores a inner join proveedores b on a.proveedor_id=b.id  inner join contratos d on a.contrato_id=d."id" WHERE contrato_id in (1,3) group by a.contrato_id,contrato,a.proveedor_id,proveedor order by contrato_id; */


/*Contratos Proveedores fechas */
select a.contrato_id,d.nombre as "contrato",a.proveedor_id,b.nombre as "proveedor",a.fecha_inicio,a.fecha_termino,codigo_acuerdo from contratos_proveedores a inner join proveedores b on a.proveedor_id=b.id  inner join contratos d on a.contrato_id=d."id" WHERE (contrato_id=1 and proveedor_id in (4,20)) or (contrato_id=3 and proveedor_id in (4,6)) and codigo_acuerdo in (3300092948, 3300113741, 3300123277, 3300141807) order by contrato_id,proveedor_id,codigo_acuerdo;


/*Servicios

select * from servicios;
*/

/*proveedores servicios SBE-Ericson*/
select region_id,b.nombre,servicio_id,s.nombre,s.codigo,s.cod_alcance,precio,tipo_moneda_id,numero_producto from proveedores_servicios a inner JOIN regiones b on a.region_id=b.id inner JOIN servicios s on a.servicio_id=s.id WHERE (a.contrato_id=1 and a.proveedor_id in (20)) and a.estado='A' and region_id = 13 and s.estado='A'  ORDER BY region_id limit 2; 

/*proveedores servicios SBE-Nokia - */
/*select region_id,b.nombre,servicio_id,s.nombre,s.codigo,precio,tipo_moneda_id,numero_producto from proveedores_servicios a inner JOIN regiones b on a.region_id=b.id inner JOIN servicios s on a.servicio_id=s.id WHERE (a.contrato_id=1 and a.proveedor_id in (4)) and a.estado='A' and region_id = 1 and s.estado='A' ORDER BY region_id limit 3; */


/*proveedores servicios RAN-Huawei*/
/*select region_id,b.nombre,servicio_id,s.nombre,s.codigo,precio,tipo_moneda_id,numero_producto from proveedores_servicios a inner JOIN regiones b on a.region_id=b.id inner JOIN servicios s on a.servicio_id=s.id WHERE (a.contrato_id=3 and a.proveedor_id in (6)) and a.estado='A' and region_id = 13 and s.estado='A' ORDER BY region_id limit 4; */


/*
select a.contrato_id,d.nombre as "contrato",a.proveedor_id,b.nombre as "proveedor",c.nombre as "region",a.codigo_acuerdo,a.intcial1,a.intcial2,a.fecha_inicio,a.fecha_termino,a.fecha_contable from contratos_proveedores a inner join proveedores b on a.proveedor_id=b.id inner join regiones c on a.region_id=c.id inner join contratos d on a.contrato_id=d."id"  order by proveedor_id desc;

select * from proveedores_servicios where proveedor_id=6 and contrato_id=3;
select b.nombre as "contrato",c.nombre as "proveedor", d.nombre as "region", e.nombre as "servicio", precio, f.nombre as "tipoMoneda", numero_producto,proveedores_numero_contrato_id   from proveedores_servicios a inner JOIN contratos b on a.contrato_id=b."id" INNER JOIN proveedores c on a.proveedor_id=c."id" INNER JOIN regiones d on a.region_id=d."id" inner JOIN servicios e on a.servicio_id=e."id" INNER JOIN tipo_moneda f on a.tipo_moneda_id =f."id" where a.proveedor_id=20 and a.contrato_id=1; */