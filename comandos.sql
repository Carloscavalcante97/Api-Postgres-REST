create database resume_ai;

CREATE TABLE usuarios (
  "id" serial NOT NULL,
  "nome" text NOT NULL,
  "email" text NOT NULL,
  "senha" text NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "Unique_user_email" UNIQUE ("email")
);

CREATE TABLE materias (
  "id" serial NOT NULL,
  "nome" text NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE resumos (
  "id" serial NOT NULL,
  "usuario_id" int4 NOT NULL,
  "materia_id" int4 NOT NULL,
  "titulo" text NOT NULL,
  "topicos" text NOT NULL,
  "descricao" text NOT NULL,
  "criado" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_usuario_id" FOREIGN KEY ("usuario_id") REFERENCES usuarios ("id"),
  CONSTRAINT "Fk_materia_id" FOREIGN KEY ("materia_id") REFERENCES materias("id")
);

insert into materias (nome) 
values('Back-end'),('Front-end'),('Carreira'),('Mobile'),('Design'),('Dados'),('Sql');


insert into usuarios(nome,email,senha)
values('Carlos','carlos@email.com', '1234567');

insert into resumos (usuario_id,materia_id, titulo,topicos,descricao)
values(1,1,'Node.js','Node.js é uma plataforma para desenvolvimento de aplicações server-side utilizando JavaScript.');





select * from materias;

select * from usuarios where email = 'carlos@email.com';

select * from resumos where usuario_id = 1;

select * from resumos 
join materias on resumos.materia_id = materias.id 
where resumos.usuario_id = 1 and materias.materia_id =1; 

select * from resumos where usuario_id = 1 and materia_id = 1;

update resumos set topicos = 'node.js, express.js, sequelize', descricao = 'resumos de node,express e sequelize' where id = 1;

delete from resumos where id = 1;

select count(*) from resumos where extract(month from criado) = 9 and extract(year from criado) = 2022;
