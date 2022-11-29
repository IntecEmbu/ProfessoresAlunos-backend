use Intec_TS;

insert into tbl_course_schedule(scd_name, scd_acronym) values
	('Manhã','M'),
    ('Tarde','T'),
    ('Noite','N');

insert into tbl_course(course_name, course_acronym, period) values
    ('Desenvolvimento de sistemas','DS','2'),
    ('Desenvolvimento de sistemas','DS','3'),
    ('Técnico em Redes de Computadores','TR','2'),
    ('Técnico em Redes de Computadores','TR','3'),
    ('Técnico em Contabilidade','TC','2');

insert into tbl_module(id_module, module_name) values
	('1','I'),
    ('2','II'),
    ('3','III'),
    ('4','IV'),
    ('5','V'),
    ('6','VI'),
    ('7','VII'),
    ('8','VIII');
    
insert into tbl_Component(component_name, component_acronym, module_index) values
	('Sistemas Operacionais I','SOR I','3'),
    ('Desenvolvimento de Sistemas I','DS I','2'),
    ('Qualidade e Teste de Software','QTS','3');
    
insert into tbl_user(user_name, registration_class, registration_number, birth, email, sign, cell_phone, am_course, pm_course, n_course) values
	('João Maria da Silva', 'RA', 12321, '2001/05/05', 'jm@myemail.com', '@mariaJoao', '(17)988989986',null,null, 2),
    ('Maria João da Silva', 'RA', 8321, '1998/04/09', 'mj@myemail.com', '@Joaomaria', '(12)988989986',null, 1, null),
    ('Jomar da Silva', 'RA', 16321, '2003/01/18', 'jomar@myemail.com', '@Jom@r', '(11)788989981',null,5, null),
    ('Maria Jose dos Santos','RM',3845,'1998/02/17','majo@myemail.com','@majo','(21)654380201',null,null,4),
    ('Jose Maria dos Santos','RM',4006,'1980/11/15','jmaria@myemail.com','@jomar','(12)734568712',null,null,2),
    ('Joao Jose da Silva','RM',5018,'1988/04/01','jojo@myemail.com','@josil','(16)245638872',null,3,2),
    ('Jose João dos Santos','GT',1835,'2001/03/25','santos@myemail.com','@sesa','(31)113451010',null,1,null),
    ('antonio','RM',3650,'1997/10/12','mariasilva@myemail.com','123456789','(20)789659221',null,5,2);
    
insert into tbl_permission(authority_code, authority_title) values
	(1, 'Administrator'),
    (2,'Coordinator'),
    (3,'Master'),
    (4,'Guest expert'),
    (5,'Curator');
        
insert into tbl_perm_user_link(id_perm, id_user) values
	(3,5),
    (2,6),
    (5,4),
    (4,7),
    (1,8);

insert into tbl_perm_user_link(id_perm, id_user) values
	(5,7);
    
select * from tbl_user;
   
insert into tbl_observatory(obs_name, obs_subject, obs_desc) values
	('teste', 'teste', 'teste');
    
insert into tbl_user(user_name, registration_class, registration_number, birth, email, sign, cell_phone, am_course, pm_course, n_course) values
('andrei', 'RA', 12321, '2001/05/05', 'jm@myemail.com', '123456789', '(17)988989986',null,null, 2);

    
