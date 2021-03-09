import DocumentQuery from "~/infrastructure/constants/query/documentQuery.js";
import dataApi from "~/static/dataApi";


function GenerateApi(docQuery) {
    switch (docQuery) {
        case DocumentQuery.IncomingLetter:
            return dataApi.documents.incomingLetter
        default:
            break;
    }
}

export default GenerateApi