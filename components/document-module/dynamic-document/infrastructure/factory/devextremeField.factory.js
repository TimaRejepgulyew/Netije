import { EmployeeBoxField } from '../models/ViewField/EmployeeBoxField';
import { DxTextBoxField } from '../models/ViewField/dxTextBoxField';

import { DepartmentBoxField } from '../models/ViewField/DepartmentBoxField';
import { DxDateBoxField } from '../models/ViewField/dxDateBoxField';

import { RecipientBoxField } from '../models/ViewField/RecipientBoxField';
import { DxCheckBoxField } from '../models/ViewField/dxCheckboxField';

import { BusinessUnitBoxField } from '../models/ViewField/BusinessUnitBoxField';
import { DxTextAreaField } from '../models/ViewField/dxTextAreaField';

import { CounterPartBoxField } from '../models/ViewField/CounterPartBoxField';
import { ContactBoxField } from '../models/ViewField/ContactBoxField';

import { DocumentBoxField } from '../models/ViewField/DocumentBoxField';
import { AutoCompleteField } from '../models/ViewField/AutoCompleteBox';
export class devExtremeFieldFactory {
	DepartmentBox = DepartmentBoxField;
	RecipientBox = RecipientBoxField;
	EmployeeBox = EmployeeBoxField;
	BusinessUnitBox = BusinessUnitBoxField;
	dxTextBox = DxTextBoxField;
	dxDateBox = DxDateBoxField;
	dxCheckBox = DxCheckBoxField;
	dxTextArea = DxTextAreaField;
	CounterPartBox = CounterPartBoxField;
	ContactBox = ContactBoxField;
	DocumentBox = DocumentBoxField;
	AutoCompleteBox = AutoCompleteField;
	constructor(сontext, fields = []) {
		const res = [];
		for (let field of fields) {
			const fieldEd = field.editorType;
			res.push(new this[fieldEd](сontext, field).getFielOptions());
		}
		return res;
	}
}
