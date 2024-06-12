const insertProcess = `INSERT INTO medicalProcess 
(pet_id, doctor_id, type, symptom, behavior_change, energy, weight, skin_check, 
    nose_check,temperature,heart_beat,breath_beat,touch_check,blood_check,urine_check, digest_check, stool_check,
    supersonic, x_ray, sick, medicine_name, amount, note, diet, diet_amount, diet_time,practice, practice_time,
    practice_level, re_examDay
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, 
 $15, $16 , $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30) RETURNING id`;

const updateProcess = `UPDATE medicalProcess SET pet_id = $1, doctor_id = $2, type = $3, symptom = $4, behavior_change = $5, energy = $6, weight = $7, skin_check = $8, 
    nose_check = $9,temperature = $10,heart_beat = $11,breath_beat = $12,touch_check  = $13,blood_check = $14,urine_check = $15, digest_check = $16, stool_check = $17,
    supersonic = $18, x_ray = $19, sick = $20, medicine_name = $21, amount = $22, note = $23, diet  = $24, diet_amount  = $25, diet_time = $26,practice = $27, practice_time = $28,
    practice_level = $29, re_examDay = $30, post_date = CURRENT_TIMESTAMP WHERE id = $31`;

const getAProcess =
  "SELECT * FROM pet join (medicalProcess join doctor on medicalProcess.doctor_id = doctor.id) on medicalProcess.pet_id = pet.id WHERE id = $1";
const getProcessDoctor =
  "SELECT * FROM pet join medicalProcess on pet.id = medicalProcess.pet_id WHERE doctor-id = $1";
const getProcessPet =
  "SELECT * FROM medicalProcess join doctor on medicalProcess.doctor_id = doctor.id WHERE pet_id = $1";

module.exports = {
  insertProcess,
  updateProcess,
  getProcessDoctor,
  getProcessPet,
  getAProcess,
};
