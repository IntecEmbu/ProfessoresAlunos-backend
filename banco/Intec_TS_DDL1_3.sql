#drop database Intec_TS;
create database Intec_TS character set utf8mb4 collate utf8mb4_unicode_ci;
use Intec_TS;

#select * from tbl_user;
#select * from Intec_TS.Images;
#drop table images;

#description "tbl_course_schedule": identificação dos nomes dos períodos de oferecimento de cursos presenciais.
create table Images(
   id integer auto_increment primary key,
   image varchar(60) not null,
   createdAt datetime,
   updatedAt datetime
);
create table tbl_genero(
   id_genero integer auto_increment primary key,
   genero varchar(60) 
);

create table tbl_course_schedule(
	id_scd int primary key auto_increment ,		
	scd_name enum('Manhã','Tarde','Noite'),	
	scd_acronym	enum('M','T','N'));

#description "tbl_course": identificação de nomes de cursos oferecidos e acrônimos destes nomes ex. Desenvolvimento de Sistemas - DS.  
create table tbl_course(
	id_course int primary key auto_increment,
	course_name	varchar(50),
	course_acronym varchar(3),
    period int,
    constraint fk_period foreign key (period) references tbl_course_schedule(id_scd));
 
#description "tbl_module": dados de identificação de um módulo de um curso. ex. I, III.
create table tbl_module(
	id_module set('1','2','3','4','5','6','7','8') primary key,
	module_name enum('I','II','III','IV','V','VI','VII','VIII'));

#description "tbl_Component": dados dd identificação dos componentes de um curso. ex ECO.
create table tbl_Component(			
	id_component int auto_increment primary key,
	component_name	varchar(75),	
	component_acronym varchar(10),
	module_index int);

#description "tbl_user": dados de cadastro dos usuários do sistema.  
create table tbl_user(
	id_user	int	auto_increment primary key,
	user_name varchar(70),
    registration_class enum('RM','RA','GT'),
	registration_number varchar(11),
	birth date,
	email varchar(70),
    sign varchar (15),
	cell_phone varchar(13),
    am_course int default null,
    pm_course int default null,
    n_course int default null,
	constraint fk_am foreign key (am_course) references tbl_course(id_course),
	constraint fk_pm foreign key (pm_course) references tbl_course(id_course),
	constraint fk_n foreign key (n_course) references tbl_course(id_course));

#description "tbl_permission": permissões para solicitar ações do sistema. ex. inserir material de aula, criar aula, autorizar professor. 
create table tbl_permission(		
	id_permission int auto_increment primary key,	
	authority_code int unique,
	authority_title varchar(20) unique); 	#ex.:administrator, coordinator, master, guest_expert, curator,...)

#description "": ligação entre dados do usuário e das permissões para solicitar ações do sistema.  ex. RM 23102 Professor.  
create table tbl_perm_user_link(
	id_pulink int	auto_increment primary key,
    id_perm int,
    id_user int,
    constraint fk_perm foreign key(id_perm) references tbl_permission(id_permission),
    constraint fk_user foreign key(id_user) references tbl_user(id_user));

#description "tbl_class": dados de uma classe. Prof. Fulano, RT_SORII
create table tbl_class(
	id_class	int	auto_increment primary key,
    id_master int,
	class_code	int,
	class_name	varchar(45),
	constraint fk_master foreign key(id_master) references tbl_perm_user_link(id_pulink)
    );

#description "tbl_class_user_link": ligação entre dados de usuário e da turma. ex. RA23201 - ECO_DS.
create table tbl_class_user_link(
	id_uclink int auto_increment primary key,
    id_lclass int,
    id_luser int,
	constraint fk_class foreign key  (id_lclass) references tbl_class(id_class),
	constraint fk_luser foreign key  (id_luser)	references tbl_user(id_user)
    );

#description "tbl_current_component": dados de um componente de módulo de um curso acontecendo no presente. ex. PWI.
create table tbl_current_component(
	id_ccomponent int	auto_increment primary key,
	ccomp_index int,
    id_class int,
	current_year int,
	current_semester enum('1','2'),
	constraint fk_ccindex foreign key(ccomp_index) references tbl_Component(id_component)
	);

#description "tbl_ccomp_class_link": ligação entre dados de um componente corrente e de uma turma. ex. PWI - turma A.  
create table tbl_ccomp_class_link(
	id_ccclink int auto_increment primary key,
    cccomp int,
    cclass int,
	constraint fk_ccomp foreign key (cccomp) references tbl_current_component(id_ccomponent),
	constraint fk_lclass foreign key(cclass) references tbl_class(id_class)
    );

#description "tbl_current_module": dados de um módulo de curso acontecendo no presente. ex. QTS-2022-2ºsemestre.
create table tbl_current_module(
	id_cmodule int	auto_increment primary key,
    id_module set('1','2','3','4','5','6','7','8'),
    id_ccomp int,
	current_year int,
	current_semester enum('1','2'),
    constraint fk_mod foreign key (id_module) references tbl_module(id_module)
	);

#description "tbl_cmod_ccomp_link": ligação entre dados de um módulo de curso e um componente acontecendo no presente. ex. DTCC 3º módulo.   
create table tbl_cmod_ccomp_link(
	id_cmcc int auto_increment primary key,
    id_cmod int,
    id_ccomp int,
	constraint fk_cmod foreign key(id_cmod) references tbl_current_module(id_cmodule),
	constraint fk_lccomp foreign key(id_ccomp) references tbl_current_component(id_ccomponent)
    );
 
#description "tbl_Current_course": dados do curso acontecendo no presente. ex. Redes-2022.
create table tbl_Current_course(
	id_ccourse int	auto_increment primary key,
    ccourse_cod int,
    current_year int,
	constraint fk_ccourse foreign key (ccourse_cod)	references tbl_course(id_course)
    );

#description "tbl_ccourse_cmod_link": ligação entre dados de cursos e módulos acontecendo no presente. ex. DS-2022 3º módulo.  
create table tbl_ccourse_cmod_link(
	id_cccm int auto_increment primary key,
    ccour int,
    cmod int,
	constraint fk_ccour foreign key(ccour) references tbl_Current_course(id_ccourse),
	constraint fk_lcmod foreign key(cmod) references tbl_current_module(id_cmodule)
    );
    
#description "tbl_access_type":	dados do tipo de acesso ao material de aula para controle do responsável ou autor.    
create table tbl_access_type(
	id_atype enum('A','R','C') primary key,
	type_name enum('Aberto','Restrito','Compartilhado'));

#description "tbl_lesson_access_period": dados do período de disponibilidade da aula para consulta.
create table tbl_lesson_access_period(
	id_accessp int auto_increment primary key,
    id_accountable int,
	start_date	date,
	access_period	int,
	constraint fk_account foreign key(id_accountable) references tbl_perm_user_link(id_pulink)
	);

#description "tbl_material":dados de registro de um material digital de aula, responsável, tipo de acesso, formato do material e endereço digital. 
#description "tbl_observatory": recebe dados de identificação de um Observatório. ex.:Feira das Profissões 2022 - organizador "fulano" autorizado.   
create table tbl_observatory(
	id_obs int auto_increment primary key,
	obs_cod	int unique ,
	obs_name varchar(70) not null,
	obs_subject	varchar(200) not null,
    obs_desc	varchar(200) not null,
    criador varchar(70) not null,
    organizing int,
	constraint fk_coord foreign key (organizing) references tbl_perm_user_link(id_pulink)
    #constraint material foreign key (id_material) references tbl_material(id_material)
    );  
create table tbl_material(
	id_material int	auto_increment primary key,
	material_name varchar(80),
    id_accountable int,
    access_type enum('A','R','C'),
	inclusion_date date,
	description varchar(300),
	digital_format	varchar(20),
    digital_repository	varchar(300),
	local_observatory int,
    createdAt datetime,
	updatedAt datetime,
    constraint fk_observatory foreign key (local_observatory) references tbl_observatory(id_obs),
	constraint fk_masteracc foreign key (id_accountable) references tbl_perm_user_link(id_pulink),
	constraint fk_access foreign key(access_type) references tbl_access_type(id_atype)   
    );

#description "tbl_material_sharing":dados ( chaves primárias) de material de aula e professor para compartilhamento de material autoral.
create table tbl_material_sharing(
	id_sharing int	auto_increment primary key,
    mat_shar int,
    mat_account int,
	constraint sharing foreign key (mat_shar) references tbl_material(id_material),	
	constraint accountable foreign key (mat_account) references tbl_perm_user_link(id_pulink));

#descriprion "tbl_lesson":dados que identificam uma aula, o professor responsável, o componente associado, o período de acesso e os materiais.
create table tbl_lesson(
	id_lesson  int	auto_increment primary key,
	lesson_name	varchar(10),
	lesson_subject varchar(50),
    organizing int,
    ccomponent int,
    access int,
    material1 int, material2 int, material3 int, material4 int, material5 int, material6 int, material7 int, material8 int, material9 int, material10 int, 
	constraint fk_organ foreign key (organizing) references tbl_perm_user_link(id_pulink),
    constraint fkl_ccomp foreign key (ccomponent) references tbl_current_component(id_ccomponent),
    constraint fkl_access foreign key (access) references tbl_lesson_access_period(id_accessp),
	constraint fk1_material foreign key (material1) references tbl_material(id_material),
    constraint fk2_material foreign key (material2) references tbl_material(id_material),
    constraint fk3_material foreign key (material3) references tbl_material(id_material),
    constraint fk4_material foreign key (material4) references tbl_material(id_material),
    constraint fk5_material foreign key (material5) references tbl_material(id_material),
    constraint fk6_material foreign key (material6) references tbl_material(id_material),
    constraint fk7_material foreign key (material7) references tbl_material(id_material),
    constraint fk8_material foreign key (material8) references tbl_material(id_material),
    constraint fk9_material foreign key (material9) references tbl_material(id_material),
    constraint fk10_material foreign key (material10) references tbl_material(id_material),
	feedback_message1 varchar(200),
	feedback_message2 varchar(200),
    feedback_message3 varchar(200),
    feedback_message4 varchar(200),
    feedback_message5 varchar(200));

#description "tbl_Class_Lesson_link":registra dados (chaves primárias) vinculando turmas e aulas que as compõem.     
create table tbl_Class_Lesson_link(
	id_link	int	auto_increment primary key,
	cl_code	int,
    les_code int,
	constraint fk_class_code foreign key  (cl_code) references tbl_class(id_class),
	constraint fk_lesson foreign key (les_code) references tbl_lesson(id_lesson));

#description "tbl_lesson_material_link":registra dados (chaves primárias) vinculando aulas e materiais que as compõem.    
create table tbl_lesson_material_link(
	id_lesmat int auto_increment primary key,
    lesson int,
    material int,
	constraint fk_less foreign key(lesson) references tbl_lesson(id_lesson),
	constraint fk_mat foreign key(material) references tbl_material(id_material));

#description "tbl_Feedback": registra o valor de feedback emitido por um aluno e vincula a uma aula. "O valor é calculado no back-end"
create table tbl_Feedback(
	id_feedback	int	auto_increment primary key,
    learn int,
    student int,
	feedback_value int,
	feedback_mensage varchar(300),
	constraint fkf_lesson foreign key (learn)	references tbl_lesson(id_lesson),
	constraint fkf_stud foreign key (student) references tbl_user(id_user)
);

    
#description "tbl_obs_mat_link": faz ligação entre um Observatório e os materiais associados a ele. ex.: Feira de Profissões 2022 - fotografias.  
create table tbl_obs_mat_link(
	id_obsmat int,
    obslink int,
    matlink int,
    constraint fk_observ foreign key(obslink) references tbl_observatory(id_obs),
    constraint fk_omater foreign key(matlink) references tbl_material(id_material)
    );

#description "tbl_evaluating_commitee": recebe os dados dos componentes de cada banca de avalização do TCC com até 5 membros com permissão adequada.
create table tbl_evaluating_commitee(
	id_evalc int auto_increment primary key,
	commitee_code int unique,
    ccourse int,
    current_year int,
    current_semester enum('1','2'),
    member1 int,
    member2 int,
    member3 int,
    member4 int,
    member5 int,
	constraint fke_ccourse foreign key (ccourse) references tbl_Current_course(id_ccourse),
	constraint fke_member foreign key (member1) references tbl_perm_user_link(id_pulink));
    
#description "tbl_class_concept": recebe o conceito de avaliação do TCC emitido pela banca avaliadora. 
create table tbl_class_concept(
	id_cc int auto_increment primary key,
    works_theme	varchar(300),
    com_code int,
    class_TCC int,
    concept	enum('MB','B','R','I'),
	constraint fkc_code foreign key (com_code) references tbl_evaluating_commitee(commitee_code),
	constraint fkc_class foreign key (class_TCC) references tbl_class(id_class)
	);

#description "tbl_class_student_concept": recebe o conceito individual de avaliação do TCC emitido pelo professor orientador para o  DOC-73. 
create table tbl_class_student_concept(
	id_cmc int auto_increment primary key,
    class_TCC int,
    advisor int,
    student int,
    student_note enum('MB','B','R','I'),
	constraint fku_class foreign key (class_TCC) references tbl_class(id_class),
	constraint fku_advisor foreign key (advisor) references tbl_perm_user_link(id_pulink),
    constraint fku_student foreign key (student) references tbl_user(id_user)
    );
    #select * from tbl_observatory;
   

#insert into tbl_observatory(obs_name, obs_subject, obs_desc) values
	#('teste', 'teste', 'teste');
