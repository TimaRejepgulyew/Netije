export default class AbstractType {
  elements= []
  filtering(allowTypes) {
    const filterObj = {};
    for (let element in this.elements) {
      for (let allowType of allowTypes) {
        if (+element === allowType) {
          filterObj[element] = this.elements[element];
        }
      }
    }
    return filterObj;
  }
  getAll() {
    return this.elements;
  }
  
}
