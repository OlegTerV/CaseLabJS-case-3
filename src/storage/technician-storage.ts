import type technician = require("./../models/entities/technician")

const techniciansStorage: technician.Technician[] = [
  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c01",
    fio: "Иванов Иван Иванович",
    specialization: "Механик",
    tabelNumber: "TAB-1001"
  },
  {
    id: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d02",
    fio: "Петров Пётр Петрович",
    specialization: "Электрик",
    tabelNumber: "TAB-1002"
  },
  {
    id: "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e03",
    fio: "Сидорова Анна Сергеевна",
    specialization: "Инженер КИПиА",
    tabelNumber: "TAB-1003"
  },
  {
    id: "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f04",
    fio: "Кузнецов Олег Викторович",
    specialization: "Высотник",
    tabelNumber: "TAB-1004"
  },
  {
    id: "e4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f05",
    fio: "Кузнецов Олег Викторович",
    specialization: "Высотник",
    tabelNumber: "TAB-1004"
  }
];

module.exports = techniciansStorage