my.sampleData = (function (my) {
    var data = {
        Tariff: {
            id: 1,
            info: {
                Name: "Tariff 1",
                Description: "This is Tariff One",
                Descriptors: "Tariff,One"
            },
            SeasonDefinition: {
                Seasons: [{ Month: 1, SeasonQualifierId: 1}],
                Qualifiers: [{ Id: 1, Name: 1, Identifier: 1, Color: 1}]
            },
            PeriodDefinition: {
                Weekdays: [{ Hour: 1, PeriodQualifierId: 1}],
                Saturdays: [{ Hour: 1, PeriodQualifierId: 1}],
                Sundays: [{ Hour: 1, PeriodQualifierId: 1}],
                PublicHolidays: [{ Hour: 1, PeriodQualifierId: 1}],
                Qualifiers: [{ Id: 1, Name: 1, Identifier: 1, Color: 1}]
            },
            Qualifiers: [{ Id: 1, Name: "" }, [{ Description: "", Value: "", Priority: 0}]],
            Charges: [{ Id: 1, Name: 1, Description: 1, Denomination: 1, Indice: 1, Frequency: 1}]
        }
    };
    return {
        data: data
    };
})(my);


