import type equipment = require("../models/entities/equipment");

const equipmentStorage: equipment.Equipment[] = [
  {
    id: "1b22e7a9-2d91-4a9a-ba1a-b4911737a318",
    siteId: "6a5c8c6e-5d1a-4a8e-9a0d-3c0b6f9e1a01",
    name: "Ветрогенератор №1",
    type: "turbine",
    serialNumber: "WT-2024-001",
    status: "operational",
    installedAt: "2024-05-12T08:00:00.000Z",
    location: {
      lat: 68.9581,
      lon: 33.0824
    }
  },
  {
    id: "2c33f8b0-3e02-4b0b-9b2b-b5a2848b429f",
    siteId: "6a5c8c6e-5d1a-4a8e-9a0d-3c0b6f9e1a01",
    name: "Инвертор №1",
    type: "inverter",
    serialNumber: "INV-2024-017",
    status: "maintenance",
    installedAt: "2024-06-20T10:15:00.000Z",
    location: {
      lat: 68.9585,
      lon: 33.0819
    }
  },
  {
    id: "3d44a9c1-4f13-4c1c-8c3c-c6b3959c53af",
    siteId: "7b6d9d7f-6e2b-4b9f-8b1e-4d1c7a0f2b02",
    name: "Датчик температуры",
    type: "sensor",
    serialNumber: "SNS-2025-042",
    status: "fault",
    installedAt: "2025-01-15T09:30:00.000Z",
    location: {
      lat: 46.3492,
      lon: 48.0355
    }
  },
  {
    id: "4e55b0d2-5024-4d2d-9d4d-d7c4a6ad64bf",
    siteId: "7b6d9d7f-6e2b-4b9f-8b1e-4d1c7a0f2b02",
    name: "Подстанция 110 кВ",
    type: "substation",
    serialNumber: "SUB-2023-003",
    status: "operational",
    installedAt: "2023-09-01T07:00:00.000Z",
    location: {
      lat: 46.3487,
      lon: 48.0348
    }
  },
  {
    id: "5f66c1e3-6135-4e3e-ae5e-e8d5b7be75cf",
    siteId: "8c7e0e80-7f3c-4c0a-9c2f-5e2d8b1a3c03",
    name: "Гидротурбина №2",
    type: "turbine",
    serialNumber: "HT-2022-002",
    status: "maintenance",
    installedAt: "2022-11-11T06:45:00.000Z",
    location: {
      lat: 42.9843,
      lon: 47.5042
    }
  },
  {
    id: "6077d2f4-7246-4f4f-bf6f-f9e6c8cf86df",
    siteId: "9d8f1f91-804d-4d1b-a030-6f3e9c2b4d04",
    name: "Трансформатор Т-1",
    type: "substation",
    serialNumber: "TR-2021-001",
    status: "decommissioned",
    installedAt: "2021-03-05T12:00:00.000Z",
    location: {
      lat: 55.7512,
      lon: 37.6184
    }
  }
];

module.exports = equipmentStorage