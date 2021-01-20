import IncomingLetter from "~/infrastructure/models/document-store/IncomingLetter.js";
export const createStore = ()=>{
    return {...new IncomingLetter().createStore()}
}
