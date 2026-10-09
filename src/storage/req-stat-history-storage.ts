import type reqStatHistoryEntry = require("./../models/entities/entry-in-the-request-status-history")

const reqStatHistoryEntriesStorage: reqStatHistoryEntry.ReqStatHistoryEntry[] = [
  {
    id: "d10d2482-f7a6-4cd3-5b37-c1e7f06284fd",
    requestId: "2af219d7-4c9b-4128-a20c-1c3c49c7a628",
    oldStatus: "",
    newStatus: "new",
    changeAuthor: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c01",
    comment: "Заявка создана",
    createdAt: "2026-09-10T15:30:00.000Z"
  },
  {
    id: "e21e3593-08b7-4de4-6c48-d2f8f17395fe",
    requestId: "3bf32ae8-5d0c-4239-b13d-2d4d5ad8b739",
    oldStatus: "new",
    newStatus: "in_progress",
    changeAuthor: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d02",
    comment: "Начато плановое ТО",
    createdAt: "2026-10-03T14:10:00.000Z"
  },
  {
    id: "a43a57b5-2ad9-4f06-8e6a-f41a1395b71f",
    requestId: "6ef65d1b-803f-456c-e460-5a708d0b1ea6",
    oldStatus: "new",
    newStatus: "in_progress",
    changeAuthor: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c01",
    comment: "Осмотр начат",
    createdAt: "2026-09-25T10:10:00.000Z"
  },
  {
    id: "b54b68c6-3bea-4017-9f7b-052b24a6c82f",
    requestId: "6ef65d1b-803f-456c-e460-5a708d0b1ea6",
    oldStatus: "in_progress",
    newStatus: "done",
    changeAuthor: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c01",
    comment: "Осмотр завершён, замечаний нет",
    createdAt: "2026-09-25T15:40:00.000Z"
  },
  {
    id: "c65c79d7-4cfb-4128-a08c-163c35b7d93f",
    requestId: "5df54c0a-7f2e-445b-d35f-4f6f7cfa0d95",
    oldStatus: "",
    newStatus: "new",
    changeAuthor: "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f04",
    comment: "Заявка создана",
    createdAt: "2026-10-04T16:45:00.000Z"
  },
  {
    id: "d76d8ae8-5d0c-4239-b19d-274d46c8e04f",
    requestId: "2af219d7-4c9b-4128-a20c-1c3c49c7a628",
    oldStatus: "new",
    newStatus: "new",
    changeAuthor: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c01",
    comment: "Добавлен комментарий по объёму работ",
    createdAt: "2026-09-19T15:30:00.000Z"
  }
];

module.exports = reqStatHistoryEntriesStorage