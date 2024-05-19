CREATE table person (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

select * from person;

CREATE table doctor (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
	name varchar(255) not null,
	dob date,
	gender varchar(255),
	phone varchar(10),
	address varchar(255),
	major varchar(255),
	startDay date,
	endDay date,
	university varchar(255),
	graduationYear int,
	achievements varchar(255),
	experienceYear int
);

Insert into doctor (email, password, name) values 
	('nam.nv211@gmail.com', 'namdepzai', 'Nguyễn Văn Nam'), 
	('anh.pv212@gmail.com', '123456', 'Phạm Vân Anh'),
	('thien.ph213@gmail.com', 'tester', 'Phạm Hữu Thiên'),
	('hoang.nvt221@gmail.com', 'dk56#', 'Nguyễn Văn Thái Hoàn'),
	('mang.ta222@gmail.com', 'huangon', 'Trần Anh Mang'),
	('an.nvp223@gmail.com', 'lopdiu', 'Nguyễn Văn Phú An'),
	('thu.nna224@gmail.com', 'bobdepzai', 'Nguyễn Ngọc Anh Thư'),
	('dung.ntt225@gmail.com', 'uiux', 'Nguyễn Thị Thùy Dung');

select * from doctor;

CREATE table staff (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
	name varchar(255) not null,
	dob date,
	gender varchar(255),
	phone varchar(10),
	address varchar(255)
);


Insert into staff (email, password, name) values 
	('lam.nv@gmail.com', 'namdepzai', 'Nguyễn Văn Lâm'), 
	('chau.ntmc@gmail.com', '123456', 'Nguyễn Thị Minh Châu'),
	('nhung.nt@gmail.com', 'tester', 'Nguyễn Thị Nhung'),
	('phuc.dth@gmail.com', 'dk56#', 'Đinh Thị Hồng Phúc'),
	('anh.tt@gmail.com', 'huangon', 'Trần Trung Anh'),
	('duy.vd@gmail.com', 'lopdiu', 'Vũ Đức Duy'),
	('tuan.nm@gmail.com', 'bobdepzai', 'Nguyễn Mạnh Tuấn'),
	('thao.ntn@gmail.com', 'uiux', 'Nguyễn Thị Ngọc Thảo');

select * from staff;


create table pet (
	id SERIAL PRIMARY KEY,
	name varchar(255) not null,
	dob date CHECK (dob <= CURRENT_DATE),
	gender varchar(255),
	type varchar(255),
	hobby varchar(255),
	owner_id int not null,
	foreign key (owner_id) references person(id)
);

select * from pet;