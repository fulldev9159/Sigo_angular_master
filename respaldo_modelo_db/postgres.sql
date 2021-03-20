/*Todos los contratos */
select * from contratos where estado='A';
select * from proveedores; 
-- Proveedores_contrato (subcontratos)
SELECT c.nombre,p.nombre,cp.codigo_acuerdo,cp.fecha_inicio,cp.fecha_termino,cp.region_id from contratos_proveedores cp INNER JOIN proveedores p on cp.proveedor_id=p.id INNER JOIN contratos c on cp.contrato_id= c.id where cp.contrato_id=1 ;
select * from tipo_servicio where estado='A';
select * from servicios where estado='A' and contrato_id=1;
select * from proveedores_servicios where estado='A' and contrato_id=1;



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