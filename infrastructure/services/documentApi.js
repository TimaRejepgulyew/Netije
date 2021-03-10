import DocumentQuery from "~/infrastructure/constants/query/documentQuery.js";
import dataApi from "~/static/dataApi";


export function GenerateGridApi(docQuery) {
    switch (docQuery) {
        case DocumentQuery.IncomingLetter:
            return dataApi.incomingLetter.getAll
        case DocumentQuery.OutgoingLetter:
            return dataApi.outgoingLetter.getAll
        default:
            break;
    }
}
export function GenerateApi(docQuery) {
    switch (docQuery) {
        case DocumentQuery.IncomingLetter:
            return dataApi.incomingLetter.document
        case DocumentQuery.OutgoingLetter:
            return dataApi.outgoingLetter.document
        default:
            break;
    }
}
