export interface ReqStatHistoryEntry{
    id: string,
    requestId: string,
    oldStatus: string,
    newStatus: string,
    changeAuthor: string,
    comment: string,
    createdAt: string
}