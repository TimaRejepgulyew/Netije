export default {
    numberFormat: {
        leadingNumber: "№ ведущего документа",
        log: "Журнал регистрации (индекс)",
        caseFile: "Дело (индекс)",
        quarter: "Квартал",
        month: "Месяц",
        number: "№ - Порядковый номер",
        year2Place: "Год, 2 цифры",
        year4Place: "Год, 4 цифры",
        departmentCode: "Подразделение (код)",
        buCode: "Наша организация (код)",
        docKindCode: "Код вида документа",
        cPartyCode: "Контрагент (код)",
        customString: "Произвольная строка",
        registrPlace: "Группа регистрации (индекс)",
    },
    registrationState: {
        registered: "Зарегистрирован",
        notRegistered: "Не зарегистрирован",
        reserved: "Зарезервирован",
    },
    numberingType: {
        numerable: "Нумерумый",
        notNumerable: "Не нумеруемый",
        registrable: "Регистрируемый",
    },
    documentType: {
        incomingEnum: "Входящий",
        outcomingEnum: "Исходящий",
        inner: "Внутренний",
        contract: "Договор",
    },
    numberingPeriod: {
        year: "Год",
        quarter: "Квартал",
        month: "Месяц",
        continuous: "Сквозной",
    },
    headerTitle: "Документооборот",
    headerDescription:
        "Модуль предназначен для настройки документооборота компании.",
    personalSetting: {
        title: "Персональные настройки",
        mySetting: "Мои настройки",
        mySettingDescr: "Личные настройки отдельных параметров работы системы."
    },
    documentSetting: {
        title: "Настройки документов",
        docKind: "Виды документов",
        docKindDescr:
            "Классификация документов, определяющая документопоток, тип нумерации документа.",
        categories: "Категории договоров",
        categoriesDescr:
            "Дополнительная классификация договоров в рамках видов документов."
    },
    regSetting: {
        title: "Регистрация и нумерация",
        registration: "Журналы регистрации",
        registrationDescr:
            "Перечень журналов, используемых для учета, нумерации и регистрации документов.",
        regGroup: "Группы регистрации",
        regGroupDescr:
            "Группы сотрудников, которыми производится регистрация, учет и хранение документов в определенных журналах регистрации.",
        registrationSettings: "Настройки регистрации",
        registrationSettingsDescr:
            "Правила автоматического подбора журнала регистрации в соответствии с реквизитами документа.",
        deliveriMethods: "Способы доставки документов",
        deliveriMethodsDescr: "Настройте способ доставки документов"
    },

    caseFileSetting: {
        title: "Номенклатура дел",
        caseFile: "Номенклатура дел",
        caseFileDescr:
            "Систематизированный перечень дел. В дела помещаются документы, относящиеся к одному вопросу или участку деятельности.",
        fileRetention: "Сроки хранения дел",
        fileRetentionDescr: "Перечень регламентированных сроков хранения дел."
    },
    associatedAppSetting: {
        title: "Настройки приложений-обработчиков",
        fileType: "Типы файлов",
        fileTypeDescr:
            "Типы файлов предназначены для группировки приложений-обработчиков.",
        associatedApp: "Приложения-обработчики",
        associatedAppDescr:
            "Справочник определяет расширения файлов, которые можно использовать в документах."
    },
    fields: {
        documentRegister: "Журнал регистрации",
        mailDeliveryMethod: "Способ доставки документа",
        filesType: "Типы файлов",
        responsibleId: "Ответственный за группу регистрации",
        documentFlow: "Документопоток",
        isDefault: "По умолчанию",
        startDate: "Начало",
        endDate: "Конец",
        extension: "Раcширение",
        title: "Заголовок",
        location: "Место нахождения",
        retentionPeriodId: "Срок хранения дел",
        numberingPeriod: "Период нумерации",
        element: "Формирование номера документа",
        caseFile: "Дело (индекс)",
        separator: "Разделитель",
        numberOfDigitsInNumber: "Количество цифр в номере",

    },
    validation: {
        numberOfDigitsInNumberRequired: "Введите количество цифр в номере",
        elementRequired: "Выберите формирование номера документа",
        numberingPeriodRequired: "Выберите период нумерации",
        retentionPeriodIdRequired: "Выберите срок хранения дел",
        titleRequired: "Введите заголовок",
        extensionPatternRule: "Пожалуйста введите валидное расширение",
        extensionRequired: "Расширение не может быть пустым",
        extensionAlreadyExists: "Такое расширение уже есть",
        endDateRequired: "Выберите конец",
        startDateRequired: "Выберите начало",
        documentFlowRequired: "Выберите документопоток",
        filesTypeIdRequired: "Тип файла не может быть пустым",
        responsibleIdRequired: "Введите ответственного за группу регистрации",
    }
}