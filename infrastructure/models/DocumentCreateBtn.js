export class DocumentCreateButton extends DocumentType {
  withMethodCreate(method) {
    for (let element in this.elements) {
      this.elements[element].create = method;
    }
    return this;
  }
}
