import database from '../connection/connection.js';

async function findAuth(regClass,regNumber){	//Retorna as autorizações de um usuário cadastrado utilizando parâmetros Classe e número de registro.
  const conn = await database.connect();
  const sql = 'select authority_code, authority_title from tbl_user as u join tbl_perm_user_link as pu join tbl_permission as p on pu.id_user=u.id_user and pu.id_perm=p.id_permission where u.registration_class=? AND u.registration_number=?';
  const dataAuth = [regClass,regNumber];
  const [rows] = await conn.query(sql, dataAuth);
  //console.log(`${sql}`);
  conn.end();
  return rows;
}

async function insertAuth(regClass, regNumber, authority){	//Grava chaves primárias de usuário e de autorização na tabela tbl_perm_user_link.
   const conn = await database.connect();

   const sqliduser = 'select id_user from tbl_user where registration_class=? AND registration_number=? ';	//Obtendo chave primária de usuário.
   const user = [regClass,regNumber];
   const iduser = await conn.query(sqliduser, user);
   
   const sqlidperm = 'select id_permission from tbl_permission where authority_title=?';				//Obtendo chave primária de permissão.
   const idperm = await conn.query(sqlidperm, authority);
   
   const sqlUserPerm = 'insert into tbl_perm_user_link (id_perm, id_user) values (?, ?)';	//Inserindo registro com chaves primárias na tabela tbl_perm_user_link.
   const dataAuth = [idperm[0][0].id_permission, iduser[0][0].id_user];
   const [rows] = await conn.query(sqlUserPerm, dataAuth);

   conn.end();
return rows;
}

async function hierarchy(useresults, authority){	//Avalia se solicitante e solicitação atendem regra de negócio.
	let autorized = false;
	for( let auth in useresults){
		//console.log(`${auth}`, useresults.length);
		//console.log(useresults[auth].authority_title)
		//console.log(authority)
		switch(authority){
			case 'Coord pedagogico':{
			autorized =  (useresults[auth].authority_title ==='Administrador');	//Administrador autoriza coordenador pedagógico.
			if (autorized){ return autorized;}
			break;}

			case 'Coordenador':{
			autorized = useresults[auth].authority_title === 'Coord pedagogico';	//Coordenador pedagógico autoriza coordenador.
			if (autorized){ return autorized;}
			break;}

			case 'Professor':{
			autorized = (useresults[auth].authority_title ==="Coordenador");	//Coordenador autoriza professor.
			if (autorized){ return autorized;}
			break;}

			case 'Especialista':{
			autorized = (useresults[auth].authority_title ==='Coordenador');		//Coordenador autoriza especialista.
			if (autorized){ return autorized;}
			break;}

			case 'Curador':{
			autorized = (useresults[auth].authority_title === 'Coord pedagogico');	//Coordenador pedagógico autoriza coordenador.
			if (autorized){ return autorized;}
			break;}
				
			default:
			autorized = false;
			}		
		}
	return autorized
}
export default {findAuth, insertAuth, hierarchy};