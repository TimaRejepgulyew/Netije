import { DefaultEditor } from "./DefaultEditor";
import EditorTypes from "../constants/editorTypes";
export class TextBox extends DefaultEditor {
  constructor(context) {
    const options = {
      id: EditorTypes.TextBox,
      value: "TextBox",
      text: context.$t(`dinamicDocument.editorTypes${TextBox}`)
    };
  }
}
