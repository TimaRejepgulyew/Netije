import DocumentQuery from "~/infrastructure/constants/query/documentQuery.js";
import dataApi from "~/static/dataApi";


export function GenerateGridApi(docQuery) {
    switch (docQuery) {
        case DocumentQuery.IncomingLetter:
            return dataApi.incomingLetter.getAll
        default:
            break;
    }
}
export function GenerateApi(docQuery) {
    switch (docQuery) {
        case DocumentQuery.IncomingLetter:
            return dataApi.incomingLetter.document
        default:
            break;
    }
}
