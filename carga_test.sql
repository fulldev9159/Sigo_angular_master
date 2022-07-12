update contrato_marco set tipo_contrato_id=3 where nombre='CONTRATO_ORDINARIO';
insert into usuario_has_contrato(usuario_id,contrato_id) values(2,(select id from contrato_marco where nombre='BUCLE'));
insert into usuario_has_contrato(usuario_id,contrato_id) values(2,(select id from contrato_marco where nombre='UNIFICADO_FIJA'));
insert into usuario_has_contrato(usuario_id,contrato_id) values(2,(select id from contrato_marco where nombre='CONTRATO_ORDINARIO'));

update contrato_marco set aprob_jerarq_inic=1 where nombre='BUCLE';
insert into usuario(username,rut,nombres,apellidos,celular,estado,proveedor_id,area_id,email,created_at,updated_at)values('msupervisor1','12312312312','Supervisora Josefa','Antonella',22222222222,1,1,1,'asdasdas@asdasd.com',now(),now());
insert into usuario_has_contrato(usuario_id,contrato_id)values((select id from usuario where username='msupervisor1'),(select id from contrato_marco where nombre='SBE_2018'))    insert into usuarioproxy(usuario_orig,usuario_id,perfil_id,superior_proxy_id,created_at,updated_at)values((select id from usuario where username='msupervisor1'),(select id from usuario where username='msupervisor1'),9,17,now(),now());
update usuarioproxy set superior_proxy_id = (select id from usuario where username='msupervisor1') where id=2;
insert into usuario_has_contrato(usuario_id,contrato_id) values(9,(select id from contrato_marco where nombre='BUCLE'));
insert into usuario_has_contrato(usuario_id,contrato_id) values((select id from usuario where username='ntrabajador1'),(select id from contrato_marco where nombre='BUCLE'));

    
insert into usuario(username,rut,nombres,apellidos,celular,estado,proveedor_id,area_id,email,created_at,updated_at)values('gadmincontrato1','12312312312','Luk GENERATEL SPA','Antonella',22222222222,1,10097,1,'asdasdas@asdasd.com',now(),now());
insert into usuarioproxy(usuario_orig,usuario_id,perfil_id,superior_proxy_id,created_at,updated_at)values((select id from usuario where username='gadmincontrato1'),(select id from usuario where username='gadmincontrato1'),2,NULL,now(),now());
insert into usuario_has_contrato(usuario_id,contrato_id) values((select id from usuario where username='gadmincontrato1'),(select id from contrato_marco where nombre='SBE_2018'));
insert into usuario(username,rut,nombres,apellidos,celular,estado,proveedor_id,area_id,email,created_at,updated_at)values('gtrabajador1','12312312312','Ana GENERATEL SPA','Antonella',22222222222,1,10097,1,'asdasdas@asdasd.com',now(),now());
insert into usuarioproxy(usuario_orig,usuario_id,perfil_id,superior_proxy_id,created_at,updated_at)values((select id from usuario where username='gtrabajador1'),(select id from usuario where username='gtrabajador1'),4,(select id from usuario where username='gadmincontrato1'),now(),now());
insert into usuario_has_contrato(usuario_id,contrato_id) values((select id from usuario where username='gtrabajador1'),(select id from contrato_marco where nombre='BUCLE'));;
insert into usuario_has_contrato(usuario_id,contrato_id) values((select id from usuario where username='gadmincontrato1'),(select id from contrato_marco where nombre='UNIFICADO_FIJA'));
insert into usuario_has_contrato(usuario_id,contrato_id) values((select id from usuario where username='gadmincontrato1'),(select id from contrato_marco where nombre='SBE_2018'));