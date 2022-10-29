export class Producto{

    id_producto?:number; //generated always as identity(start with 1 increment by 1),
	nombre_producto?:string; //varchar(64),
	id_marca?:number;
	descripcion?:string;
	linea?:string; //varchar(64),
	modelo?:number; //int,
	cilindraje?:number; //int,
	espec_tecnicas?:string; //varchar(1000),
	existencias?:number; //int,
	precio?:number; //numeric(8,2),
	id_categoria?:number; //int,
	descripcion_cat?:string;
	id_usuario?:number; //int,
	nombre?:string; //nombre del
	id_persona?:number; //int, --proveedor
	nombre_persona?:string;
	estado?:string; //char(1) default 'A',
	usuario_creacion?:string; //varchar(16),--usar dpi o nit 
	nombre_usuario?:string;
	usuario_modificacion?:string; //varchar(16), --usar dpi o nit
	fecha_creacion?:string; //timestamp default current_timestamp, 
    fecha_modificacion?:string; //timestamp default current_timestamp,


    



}