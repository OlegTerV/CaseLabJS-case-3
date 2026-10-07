import type equipmentPassport = require("./../models/entities/equipment-pasport")

const equipmentPassportsStorage: equipmentPassport.EquipmentPassport[] = [
  {
    id: "1b22e7a9-2d91-4a9a-ba1a-b4911737a318",
    manufacturer: "Vestas",
    model: "V150-4.2 MW",
    ratedPower: "4200 кВт",
    dateOfLastVerification: "2026-03-15T00:00:00.000Z"
  },
  {
    id: "2c33f8b0-3e02-4b0b-9b2b-b5a2848b429f",
    manufacturer: "SMA",
    model: "Sunny Central 2500-EV",
    ratedPower: "2500 кВт",
    dateOfLastVerification: "2025-12-10T00:00:00.000Z"
  },
  {
    id: "3d44a9c1-4f13-4c1c-8c3c-c6b3959c53af",
    manufacturer: "Endress+Hauser",
    model: "iTHERM TM131",
    ratedPower: "0.1 кВт",
    dateOfLastVerification: "2026-01-20T00:00:00.000Z"
  },
  {
    id: "4e55b0d2-5024-4d2d-9d4d-d7c4a6ad64bf",
    manufacturer: "ABB",
    model: "PowerTransformer 110/35/10",
    ratedPower: "40000 кВА",
    dateOfLastVerification: "2025-08-05T00:00:00.000Z"
  },
  {
    id: "5f66c1e3-6135-4e3e-ae5e-e8d5b7be75cf",
    manufacturer: "Voith",
    model: "Francis 120 MW",
    ratedPower: "120000 кВт",
    dateOfLastVerification: "2024-10-01T00:00:00.000Z"
  },
  {
    id: "6077d2f4-7246-4f4f-bf6f-f9e6c8cf86df",
    manufacturer: "Siemens",
    model: "TUM-110",
    ratedPower: "63000 кВА",
    dateOfLastVerification: "2020-06-30T00:00:00.000Z"
  }
];

module.exports = equipmentPassportsStorage