import type maintenanceRequest = require("../models/entities/maintenance-request");

const maintenanceRequestsStorage: maintenanceRequest.MaintenanceRequest[] = [
    {
        id: "2af219d7-4c9b-4128-a20c-1c3c49c7a628",
        equipmentId: "1b22e7a9-2d91-4a9a-ba1a-b4911737a318",
        title: "Починить лопасти",
        description: "Старые лопасти отслужили свой срок",
        priority: "medium",
        status: "new",
        plannedAt: "2026-10-12T09:00:00.000Z",
        authorId: "Иванов Иван Иванович",
        createdAt: "2026-09-10T15:30:00.000Z",
        updatedAt: "2026-09-19T15:30:00.000Z"
    },
    {
        id: "3bf32ae8-5d0c-4239-b13d-2d4d5ad8b739",
        equipmentId: "2c33f8b0-3e02-4b0b-9b2b-b5a2848b429f",
        title: "Плановое ТО инвертора",
        description: "Проверка систем охлаждения и контактов",
        priority: "low",
        status: "in_progress",
        plannedAt: "2026-10-07T08:00:00.000Z",
        authorId: "Петров Пётр Петрович",
        createdAt: "2026-09-28T11:20:00.000Z",
        updatedAt: "2026-10-03T14:10:00.000Z"
    },
    {
        id: "4cf43bf9-6e1d-434a-c24e-3e5e6be9c84a",
        equipmentId: "3d44a9c1-4f13-4c1c-8c3c-c6b3959c53af",
        title: "Замена датчика температуры",
        description: "Датчик выдаёт некорректные показания",
        priority: "high",
        status: "done",
        plannedAt: "2026-10-06T07:30:00.000Z",
        authorId: "Сидорова Анна Сергеевна",
        createdAt: "2026-10-01T09:05:00.000Z",
        updatedAt: "2026-10-02T12:00:00.000Z"
    },
    {
        id: "5df54c0a-7f2e-445b-d35f-4f6f7cfa0d95",
        equipmentId: "5f66c1e3-6135-4e3e-ae5e-e8d5b7be75cf",
        title: "Ремонт направляющего аппарата",
        description: "Повышенная вибрация при нагрузке выше 80%",
        priority: "critical",
        status: "new",
        plannedAt: "2026-10-05T13:00:00.000Z",
        authorId: "Кузнецов Олег Викторович",
        createdAt: "2026-10-04T16:45:00.000Z",
        updatedAt: "2026-10-04T16:45:00.000Z"
    },
    {
        id: "6ef65d1b-803f-456c-e460-5a708d0b1ea6",
        equipmentId: "4e55b0d2-5024-4d2d-9d4d-d7c4a6ad64bf",
        title: "Осмотр подстанции",
        description: "Ежегодный осмотр оборудования",
        priority: "medium",
        status: "rejected",
        plannedAt: "2026-09-25T10:00:00.000Z",
        authorId: "Иванов Иван Иванович",
        createdAt: "2026-09-15T10:00:00.000Z",
        updatedAt: "2026-09-25T15:40:00.000Z"
    },
    {
        id: "1ef11d1b-813f-456c-e460-5a708d0b1ea1",
        equipmentId: "4e55b0d2-5024-4d2d-9d4d-d7c4a6ad64bf",
        title: "Замена проовдки",
        description: "Так надо",
        priority: "medium",
        status: "new",
        plannedAt: "2026-09-25T10:00:00.000Z",
        authorId: "Иванов Иван Иванович",
        createdAt: "2026-09-15T10:00:00.000Z",
        updatedAt: "2026-09-25T15:40:00.000Z"
    }
]

module.exports = maintenanceRequestsStorage