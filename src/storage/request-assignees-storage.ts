import type {RequestAssignees} from "./../models/entities/request-assignees"

const requestAssigneesStorage: RequestAssignees[] = [
  {
    id: "7fa76e2c-9140-467d-f571-6b819e1c2fb7",
    technicianId: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c01",
    requestId: "2af219d7-4c9b-4128-a20c-1c3c49c7a628",
    role: "lead",
    hours: 12
  },
  {
    id: "8ab87f3d-a251-478e-0682-7c92af2d3fc8",
    technicianId: "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f04",
    requestId: "2af219d7-4c9b-4128-a20c-1c3c49c7a628",
    role: "member",
    hours: 8
  },
  {
    id: "9bc9804e-b362-489f-1793-8da3bf3e40d9",
    technicianId: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d02",
    requestId: "3bf32ae8-5d0c-4239-b13d-2d4d5ad8b739",
    role: "member",
    hours: 6
  },
  {
    id: "acda915f-c473-49a0-2804-9eb4cf4f51ea",
    technicianId: "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e03",
    requestId: "4cf43bf9-6e1d-434a-c24e-3e5e6be9c84a",
    role: "lead",
    hours: 4
  },
  {
    id: "bdeb0260-d584-4ab1-3915-afc5df5062fb",
    technicianId: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c01",
    requestId: "5df54c0a-7f2e-445b-d35f-4f6f7cfa0d95",
    role: "member",
    hours: 20
  },
  {
    id: "cefc1371-e695-4bc2-4a26-b0d6ef6173fc",
    technicianId: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d02",
    requestId: "6ef65d1b-803f-456c-e460-5a708d0b1ea6",
    role: "member",
    hours: 3
  }
];

module.exports = requestAssigneesStorage