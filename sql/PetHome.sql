CREATE table person (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

alter table person 
add column name varchar(100),
add column dob date check (dob <= CURRENT_DATE),
add column gender varchar(10),
add column phone varchar(10),
add column membership varchar(5) default 'Đồng',
add column address varchar(500);

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
	university varchar(255),
	graduationYear int,
	achievements varchar(255),
	experienceYear int
);

-- create trigger for update experience year when new year

CREATE OR REPLACE FUNCTION update_experience_year()
RETURNS TRIGGER AS $$
DECLARE
    a CONSTANT INT := 1;
BEGIN
    IF EXTRACT(YEAR FROM CURRENT_DATE) <> EXTRACT(YEAR FROM CURRENT_DATE) - a THEN
        NEW.experienceyear := NEW.experienceyear + 1;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_experienceyear_trigger
BEFORE INSERT OR UPDATE ON doctor
FOR EACH ROW
EXECUTE PROCEDURE update_experience_year();

Insert into doctor (email, password, name, dob, gender, phone, address, university, graduationyear, achievements, experienceyear) values 
	('nam.nv211@gmail.com', 'namdepzai', 'Nguyễn Văn Nam', '1990-10-10', 'male', '092288288', '7 HN', 'HUST', 2020, '1st reward', 3), 
	('anh.pv212@gmail.com', '123456', 'Phạm Vân Anh','1989-10-10', 'female', '092288288', '7 HN', 'HUST', 2020, '1st reward', 3),
	('thien.ph213@gmail.com', 'tester', 'Phạm Hữu Thiên', '1980-10-10', 'male', '092288288', '7 HN', 'HUST', 2020, '1st reward', 3),
	('hoang.nvt221@gmail.com', 'dk56#', 'Nguyễn Văn Thái Hoàn', '1975-10-10', 'male', '092288288', '7 HN', 'HUST', 2020, '1st reward', 3),
	('mang.ta222@gmail.com', 'huangon', 'Trần Anh Mang', '1960-9-8', 'male', '092288288', '7 HN', 'HUST', 2020, '1st reward', 3),
	('an.nvp223@gmail.com', 'lopdiu', 'Nguyễn Văn Phú An', '1979-9-10', 'male', '092288288', '7 HN', 'HUST', 2020, '1st reward', 3),
	('thu.nna224@gmail.com', 'bobdepzai', 'Nguyễn Ngọc Anh Thư', '1989-10-11', 'female', '092288288', '7 HN', 'HUST', 2020, '1st reward', 3),
	('dung.ntt225@gmail.com', 'uiux', 'Nguyễn Thị Thùy Dung', '1938-1-1', 'female', '092288288', '7 HN', 'HUST', 2020, '1st reward', 3);

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


Insert into staff (email, password, name, dob, gender, phone, address) values 
	('lam.nv@gmail.com', 'namdepzai', 'Nguyễn Văn Lâm', '1990-10-10','male', '0909029929', '9 HHN'), 
	('chau.ntmc@gmail.com', '123456', 'Nguyễn Thị Minh Châu', '1990-10-10','male', '0909029929', '9 HHN'),
	('nhung.nt@gmail.com', 'tester', 'Nguyễn Thị Nhung', '1990-10-10','male', '0909029929', '9 HHN'),
	('phuc.dth@gmail.com', 'dk56#', 'Đinh Thị Hồng Phúc', '1990-10-10','male', '0909029929', '9 HHN'),
	('anh.tt@gmail.com', 'huangon', 'Trần Trung Anh', '1990-10-10','male', '0909029929', '9 HHN'),
	('duy.vd@gmail.com', 'lopdiu', 'Vũ Đức Duy', '1990-10-10','male', '0909029929', '9 HHN'),
	('tuan.nm@gmail.com', 'bobdepzai', 'Nguyễn Mạnh Tuấn', '1990-10-10','male', '0909029929', '9 HHN'),
	('thao.ntn@gmail.com', 'uiux', 'Nguyễn Thị Ngọc Thảo', '1990-10-10','male', '0909029929', '9 HHN');

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
alter table pet
add column weight real;

select * from pet;

-- create auto id

CREATE SEQUENCE service_item_id_seq;
CREATE OR REPLACE FUNCTION generate_service_item_id()
RETURNS trigger AS $$
BEGIN
    CASE NEW.service_id
        WHEN 1 THEN
            NEW.id := 'HE' || LPAD(CAST(NEXTVAL('service_item_id_seq') AS VARCHAR), 2, '0');
        WHEN 2 THEN
            NEW.id := 'SE' || LPAD(CAST(NEXTVAL('service_item_id_seq') AS VARCHAR), 2, '0');
		WHEN 3 THEN 
			NEW.id := 'HO' || LPAD(CAST(NEXTVAL('service_item_id_seq') AS VARCHAR), 2, '0');
        ELSE
            RAISE EXCEPTION 'Invalid service_id value: %', NEW.service_id;
    END CASE;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER generate_service_item_id
BEFORE INSERT ON service_item
FOR EACH ROW
EXECUTE FUNCTION generate_service_item_id();

-- create service list

create table service_list (
	id serial primary key,
	name varchar(100) not null,
	introduction varchar(500)
);

select * from service_list;
insert into service_list (name, introduction) values 
('Chăm sóc sức khỏe', 'Chăm sóc sức khỏe thú cưng là một phần quan trọng trong việc nuôi dưỡng và bảo vệ những người bạn đáng yêu của chúng ta. Việc định kỳ kiểm tra sức khỏe và cung cấp dinh dưỡng đầy đủ sẽ giúp thú cưng của bạn luôn khỏe mạnh.'),
('Làm đẹp thú cưng', 'Làm đẹp cho thú cưng không chỉ mang lại vẻ ngoài khỏe mạnh và sạch sẽ, mà còn thể hiện sự chăm sóc và quan tâm của chủ nhân. Việc tắm rửa, cắt tỉa lông và chải chuốt định kỳ sẽ giúp thú cưng luôn tự tin và hạnh phúc.'),
('Khách sạn thú cưng', 'Khách sạn thú cưng là nơi cung cấp dịch vụ lưu trú, chăm sóc và vui chơi cho thú cưng khi chủ nhân không thể trực tiếp chăm sóc. Tại đây, thú cưng sẽ được đảm bảo sức khỏe, an toàn và có không gian thích hợp để vận động, giải trí.');

-- create table service_item
create table service_item (
	id varchar(10) primary key,
	name varchar(100) not null,
	introduction varchar(500),
	price bigint,
	service_id int,
	foreign key (service_id) references service_list(id)
);

select * from service_item;
insert into service_item (name, introduction, price, service_id) values 
('Cấp cứu', 'Đội ngũ bác sĩ sẵn sàng 24/24, có thể đến tận nhà hoặc điều xe đến', 200,1),
('Tắm sấy cơ bản cho thú cưng', 'Dịch vụ tắm sấy, làm sạch và sấy khô cho thú cưng', 80,2)
('Khám sức khỏe định kỳ', 'Kiểm tra sức khỏe tổng quan thường xuyên cho thú cưng', 200, 1),
('Triệt sản', 'Dịch vụ để ngăn chặn sự sinh sản của thú cưng', 200, 1),
('Chẩn đoán và điều trị', 'Dịch vụ để chẩn đoán và điều trị các vấn đề không rõ nguyên nhân của thú cưng', 120,1),
('Da liễu', 'Điều trị các vấn đề da liễu như nấm, ghẻ, rận…', 150,1),
('Tiêm phòng', 'Để phòng ngừa các bệnh truyền nhiễm', 250,1),
('Tắm sấy cơ bản cho thú cưng', 'Dịch vụ tắm sấy, làm sạch và sấy khô cho thú cưng', 150, 2),
('Mát xa thư giãn cho thú cưng', 'Dịch vụ Spa giúp thú cưng thư giãn và nâng cao tinh thần', 90,2),
('Tạo Kiểu Lông cho thú cưng', 'Dịch vụ tạo kiểu lông giúp thú cưng có bộ lông gọn gàng, phong cách hơn',200,2),
('Nhuộm Lông cho thú cưng', 'Dịch vụ nhuộm lông giúp thú cưng nổi bật và cá nhân hóa', 500,2),
('Gói tắm cơ bản', 'combo 10 buổi', 680,2),
('chung cư', 'loại rẻ nhất, có lồng sơn sắt tĩnh điện, chỗ ở tiện nghi, đầy đủ dụng cụ ăn uống', 100,3),
('VIP', 'phòng gỗ không gian ấm cúng, sạch sẽ, thoáng mát', 200,3);





-- create table sicktype using auto id start with 'HE' (health care type)
create table sicktype (
	id VARCHAR(10) PRIMARY KEY,
	symptom varchar(500),
	treatment varchar(500),
	foreign key (id) references service_item(id)
);
select * from sicktype;

insert into sicktype (id,symptom, treatment) values 
('HE01', 'Thú cưng có tình trạng khẩn cấp (suy tim, suy hô hấp, vấn đề tiêu hóa, nhiễm trùng…), gặp sự cố y tế hoặc tai nạn', 'Bác sĩ sẽ cung cấp chăm sóc y tế ngay lập tức, bao gồm các biện pháp cấp cứu, xử lý tình hình khẩn cấp, và cung cấp sự ổn định cho thú cưng'),
('HE03', 'Không có', 'Bác sĩ sẽ thực hiện kiểm tra toàn diện, bao gồm kiểm tra cơ thể, xét nghiệm máu, xét nghiệm nhanh, và ghi nhận tình trạng sức khỏe chung của thú cưng. Nếu phát hiện vấn đề sức khỏe, các biện pháp điều trị cụ thể sẽ được áp dụng'),
('HE04', 'Thú cưng chưa được triệt sản và có nhu cầu triệt sản', 'Bác sĩ sẽ thực hiện ca phẫu thuật triệt sản, bao gồm phẫu thuật tiểu phẫu hoặc ca phẫu thuật lớn tùy theo trường hợp. Có thể thực hiện tại bệnh viện hoặc tận nhà nếu có sự hỗ trợ và điều kiện phù hợp'),
('HE05', 'Thú cưng có triệu chứng bất thường hoặc vấn đề sức khỏe không được xác định rõ nguyên nhân', 'Bác sĩ sẽ thực hiện các biện pháp chẩn đoán, bao gồm xét nghiệm, chụp X-quang, siêu âm, hoặc các phương pháp khác để xác định nguyên nhân bệnh. Sau đó sẽ áp dụng phương pháp điều trị cụ thể tùy theo từng trường hợp: Da liễu, tiêm phòng, nắn chỉnh xương, tai - mũi - họng - răng - miệng, phụ khoa, tâm lý'),
('HE06', 'Gặp các triệu chứng như ngứa, mẩn ngứa, viêm da, rụng lông, vảy nổi, các sự thay đổi trong tình trạng da', 'Bác sĩ sẽ đưa ra chẩn đoán chính xác dựa trên triệu chứng và xét nghiệm. Sau đó, thú cưng sẽ được điều trị bằng cách sử dụng thuốc tại nhà hoặc đến bệnh viện để thực hiện các liệu pháp như tắm thuốc, sử dụng kem hoặc thuốc chống vi nấm, hoặc điều trị bằng ánh sáng laser'),
('HE07', 'Môi trường sống tiềm ẩn của loại kí sinh trùng hoặc tiếp xúc với các nguồn bệnh có thể làm tăng nguy cơ nhiễm bệnh', 'Bác sĩ sẽ xem lịch sử tiêm phòng và đề xuất loại vaccine phù hợp. Thú cưng sẽ được tiêm theo lịch trình khuyến nghị để tạo sự miễn dịch chống lại các bệnh truyền nhiễm');


-- create table servicetype using auto id start with 'SE' (service type)
create table servicetype (
	id VARCHAR(10) PRIMARY KEY,
	process varchar(500),
	quantitative int,
	foreign key (id) references service_item(id)
);
select * from servicetype;

insert into servicetype (id,process, quantitative) values 
('SE02', 'Dịch vụ tắm sấy, làm sạch và sấy khô cho thú cưng, Chải lông,Tắm lần 1 bằng sữa tắm,Tắm lại lần 2 bằng dầu xả,Sấy khô,Chải lông', 2),
('SE09', 'Gồm quy trình tắm sấy massage nhẹ nhàng,Dưỡng lông với sản phẩm dầu dưỡng từ thiên nhiên,Thưởng snack', 2),
('SE10', 'Tắm qua với nước sạch; Sấy lông;Tỉa lông, làm xoăn, duỗi thẳng tùy theo yêu cầu;Bôi dầu dưỡng',3),
('SE11', 'Nhuộm lông với các màu sắc an toàn cho thú cưng', 2),
('SE12', 'như quy trình tắm sấy', 2);


-- create table hotel using auto id start with "HO"
create table hotel(
	id VARCHAR(10) PRIMARY KEY,
	diet varchar(500),
	takeExercise varchar(500),
	airconditioning boolean,
	heating boolean,
	clean varchar(500),
	camera varchar(500),
	foreign key (id) references service_item(id)
);
select * from hotel;
insert into hotel (id, diet, takeExercise,airconditioning, heating, clean, camera) values
('HO13', '2 bữa/ngày. Thức ăn là cơm thịt rau, hạt ANF','Trên 1h/ ngày', true,true,'3 ngày/lần. Sau 5 ngày thú cưng được tắm miễn phí','không có' ),
('HO14', '2 bữa/ngày. Thức ăn là cơm thịt rau, hạt ANF','1-2h/ngày', true, true, '1h/lần, tắm trọn gói 3 ngày/lần', 'Camera chỉ có chức năng ghi hình');
drop table hotel;


-- create trigger when delete sservice_item

CREATE OR REPLACE FUNCTION process_emp_service() RETURNS TRIGGER AS $$
    BEGIN
         DELETE FROM sicktype
    WHERE sicktype.id = OLD.id;

    DELETE FROM servicetype
    WHERE servicetype.id = OLD.id;

    DELETE FROM hotel
    WHERE hotel.id = OLD.id;
    
    DELETE FROM bookschedule
    WHERE bookschedule.service_id = OLD.id;
	RETURN OLD;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER emp_service
BEFORE DELETE ON service_item
FOR EACH ROW EXECUTE FUNCTION process_emp_service();

DROP TRIGGER emp_service ON service_item;

create table bookschedule (
	id SERIAL PRIMARY KEY,
	pet_id int,
	bookDate timestamp,
	endTime timestamp,
	result varchar(500) default 'Đang xét duyệt',
	service_id varchar(10),
	money real,
	post_date timestamp DEFAULT CURRENT_TIMESTAMP,
	note varchar(500),
	 CONSTRAINT check_date CHECK (bookDate >= CURRENT_DATE),
	foreign key (pet_id) references pet(id),
	foreign key (service_id) references service_item(id),
	unique (pet_id, bookDate, service_id)
);
select * from bookschedule;
create table bookSalon (
	id int primary key,
	staff_id int,
	foreign key (id) references bookschedule(id),
	foreign key (staff_id) references staff(id)
);
select * from bookSalon;
create table bookHealth (
	id int primary key,
	doctor_id int,
	foreign key (id) references bookschedule(id),
	foreign key (doctor_id) references doctor(id)
);

select * from bookHealth;

create table bookHotel (
	id int primary key,
	endDate date,
	cage_id int,
	foreign key (id) references bookschedule(id),
	foreign key (cage_id) references cage(cage_id)
	
);
drop table bookHotel;
select * from bookHotel;
create table cage(
	cage_id serial primary key,
	hotel_id varchar(10),
	foreign key (hotel_id) references hotel(id)
);
DROP TABLE IF EXISTS cage CASCADE;

select * from cage;

-- create table for medical examination process
create table medicalProcess (
	id serial primary key,
	pet_id int,
	doctor_id int,
	post_date timestamp default CURRENT_TIMESTAMP,
	type varchar(10),
	symptom varchar(100),
	behavior_change varchar(100),
	energy varchar(100),
	weight real,
	skin_check varchar(100),
	nose_check varchar(100),
	temperature real,
	heart_beat real,
	breath_beat real,
	touch_check varchar(500),
	blood_check varchar(100),
	urine_check varchar(100),
	digest_check varchar(100),
	stool_check varchar(100),
	supersonic varchar(100),
	x_ray varchar(100),
	sick varchar(100),
	medicine_name varchar(100),
	amount varchar(100),
	note varchar(500),
	diet varchar(100),
	diet_amount varchar(100),
	diet_time varchar(100),
	practice varchar(100),
	practice_time varchar(100),
	practice_level varchar(100),
	re_examDay timestamp,
	foreign key (pet_id) references pet(id),
	foreign key (doctor_id) references doctor(id)
);

select * from medicalProcess;


-- make trigger when delete bookschedule

CREATE OR REPLACE FUNCTION process_delete_bookschedule() RETURNS TRIGGER AS $$
    BEGIN
         DELETE FROM bookHealth
    WHERE bookHealth.id = OLD.id;

    DELETE FROM bookSalon
    WHERE bookSalon.id = OLD.id;

    DELETE FROM bookHotel
    WHERE bookHotel.id = OLD.id;

	RETURN OLD;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_bookschedule
BEFORE DELETE ON bookschedule
FOR EACH ROW EXECUTE FUNCTION process_delete_bookschedule();

-- create trigger set cage_id = null when delete cage 
CREATE OR REPLACE FUNCTION set_bookschedule_cage_id_to_null()
RETURNS TRIGGER AS $$
BEGIN
         DELETE FROM bookHotel
    WHERE bookHotel.cage_id = OLD.cage_id;

	RETURN OLD;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_bookschedule_cage_id_to_null_trigger
BEFORE DELETE ON cage
FOR EACH ROW
EXECUTE FUNCTION set_bookschedule_cage_id_to_null();

-- create trigger delete when pet is deleted 
CREATE OR REPLACE FUNCTION delete_pet() RETURNS TRIGGER AS $$
    BEGIN
         DELETE FROM bookschedule
    WHERE bookHealth.pet_id = OLD.id;

    DELETE FROM medicalProcess
    WHERE medicalProcess.pet_id = OLD.id;

	RETURN OLD;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_pet
BEFORE DELETE ON pet
FOR EACH ROW EXECUTE FUNCTION delete_pet();

-- create table for price exchange
create table priceExchange (
	id serial primary key,
	weight real,
	factor real
);

insert into priceExchange (weight, factor) values 
(2,1),(5, 1.2),(10, 1.5),(15, 1.8),(20,2);

select * from priceExchange;


select * from bookschedule;
select * from bookHotel;


  