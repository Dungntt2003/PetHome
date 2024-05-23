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
create table inhotel (
	id SERIAL PRIMARY KEY,
	pet_id int not null,
	starttime date,
	endtime date,
	price int,
	hotel_id varchar(10),
	foreign key (pet_id) references pet(id),
	foreign key (hotel_id) references hotel(id),
	unique (id, pet_id, starttime)
);
select * from inhotel;

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
    WHERE bookschedule.type = OLD.id;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER emp_service
AFTER DELETE ON service_item
FOR EACH ROW EXECUTE FUNCTION process_emp_service();


create table bookschedule (
	id SERIAL PRIMARY KEY,
	pet_id int,
	doctor_id int,
	bookDate date,
	result varchar(500) default 'Đang xét duyệt',
	type varchar(10),
	 CONSTRAINT check_date CHECK (bookDate >= CURRENT_DATE),
	foreign key (pet_id) references pet(id),
	foreign key (doctor_id) references doctor(id),
	foreign key (type) references service_item(id),
	unique (pet_id, bookDate, type)
);
select * from bookschedule;

SELECT doctor_id, name,bookdate, result, bookschedule.type FROM bookschedule join pet on bookschedule.pet_id = pet.id where owner_id = 6;

