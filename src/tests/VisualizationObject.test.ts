// (C) 2007-2020 GoodData Corporation
import { VisualizationObject } from '../VisualizationObject';
import IMeasure = VisualizationObject.IMeasure;
import IVisualizationAttribute = VisualizationObject.IVisualizationAttribute;
import BucketItem = VisualizationObject.BucketItem;
import VisualizationObjectExtendedFilter = VisualizationObject.VisualizationObjectExtendedFilter;
import VisualizationObjectAttributeFilter = VisualizationObject.VisualizationObjectAttributeFilter;
import VisualizationObjectDateFilter = VisualizationObject.VisualizationObjectDateFilter;
import VisualizationObjectFilter = VisualizationObject.VisualizationObjectFilter;
import IMeasureDefinitionType = VisualizationObject.IMeasureDefinitionType;
import IArithmeticMeasureDefinition = VisualizationObject.IArithmeticMeasureDefinition;
import IObjUriQualifier = VisualizationObject.IObjUriQualifier;
import ILocalIdentifierQualifier = VisualizationObject.ILocalIdentifierQualifier;
import MeasureValueFilterCondition = VisualizationObject.MeasureValueFilterCondition;
import isDateFilter = VisualizationObject.isDateFilter;

describe('VisualizationObject', () => {
    describe('isMeasure', () => {
        it('should return false when null is tested', () => {
            const result = VisualizationObject.isMeasure(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = VisualizationObject.isMeasure(undefined);
            expect(result).toEqual(false);
        });

        it('should return false when visualization attribute is tested', () => {
            const attribute: IVisualizationAttribute = {
                visualizationAttribute: {
                    localIdentifier: 'm1',
                    displayForm: {
                        uri: '/gdc/mock/measure'
                    }
                }
            };
            const result = VisualizationObject.isMeasure(attribute);
            expect(result).toEqual(false);
        });

        it('should return true when measure is tested', () => {
            const measure: IMeasure = {
                measure: {
                    localIdentifier: 'm1',
                    definition: {
                        measureDefinition: {
                            item: {
                                uri: '/gdc/mock/measure'
                            }
                        }
                    }
                }
            };
            const result = VisualizationObject.isMeasure(measure);
            expect(result).toEqual(true);
        });
    });

    describe('isVisualizationAttribute', () => {
        it('should return false when null is tested', () => {
            const result = VisualizationObject.isVisualizationAttribute(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = VisualizationObject.isVisualizationAttribute(undefined);
            expect(result).toEqual(false);
        });

        it('should return false when measure is tested', () => {
            const measure: IMeasure = {
                measure: {
                    localIdentifier: 'm1',
                    definition: {
                        measureDefinition: {
                            item: {
                                uri: '/gdc/mock/measure'
                            }
                        }
                    }
                }
            };
            const result = VisualizationObject.isVisualizationAttribute(measure);
            expect(result).toEqual(false);
        });

        it('should return true when visualization attribute is tested', () => {
            const attribute: IVisualizationAttribute = {
                visualizationAttribute: {
                    localIdentifier: 'm1',
                    displayForm: {
                        uri: '/gdc/mock/measure'
                    }
                }
            };
            const result = VisualizationObject.isVisualizationAttribute(attribute);
            expect(result).toEqual(true);
        });
    });

    describe('isMeasureDefinition', () => {
        it('should return false when null is tested', () => {
            const result = VisualizationObject.isMeasureDefinition(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = VisualizationObject.isMeasureDefinition(undefined);
            expect(result).toEqual(false);
        });

        it('should return true when simple measure definition is tested', () => {
            const measureDefinition: IMeasureDefinitionType = {
                measureDefinition: {
                    item: {
                        uri: '/gdc/mock/measure'
                    }
                }
            };
            const result = VisualizationObject.isMeasureDefinition(measureDefinition);
            expect(result).toEqual(true);
        });

        it('should return false when arithmetic measure definition is tested', () => {
            const measureDefinition: IArithmeticMeasureDefinition = {
                arithmeticMeasure: {
                    measureIdentifiers: ['/gdc/mock/measure'],
                    operator: 'sum'
                }
            };
            const result = VisualizationObject.isMeasureDefinition(measureDefinition);
            expect(result).toEqual(false);
        });

        it('should return false when pop measure definition is tested', () => {
            const measureDefinition: IMeasureDefinitionType = {
                popMeasureDefinition: {
                    measureIdentifier: 'm1',
                    popAttribute: {
                        uri: '/gdc/mock/measure'
                    }
                }
            };
            const result = VisualizationObject.isMeasureDefinition(measureDefinition);
            expect(result).toEqual(false);
        });

        it('should return false when previous period measure definition is tested', () => {
            const measureDefinition: IMeasureDefinitionType = {
                previousPeriodMeasure: {
                    measureIdentifier: 'm1',
                    dateDataSets: [{
                        dataSet: {
                            uri: '/gdc/mock/date'
                        },
                        periodsAgo: 1
                    }]
                }
            };
            const result = VisualizationObject.isMeasureDefinition(measureDefinition);
            expect(result).toEqual(false);
        });
    });

    describe('isArithmeticMeasureDefinition', () => {
        it('should return false when null is tested', () => {
            const result = VisualizationObject.isArithmeticMeasureDefinition(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = VisualizationObject.isArithmeticMeasureDefinition(undefined);
            expect(result).toEqual(false);
        });

        it('should return false when simple measure definition is tested', () => {
            const measureDefinition: IMeasureDefinitionType = {
                measureDefinition: {
                    item: {
                        uri: '/gdc/mock/measure'
                    }
                }
            };
            const result = VisualizationObject.isArithmeticMeasureDefinition(measureDefinition);
            expect(result).toEqual(false);
        });

        it('should return true when arithmetic measure definition is tested', () => {
            const measureDefinition: IArithmeticMeasureDefinition = {
                arithmeticMeasure: {
                    measureIdentifiers: ['/gdc/mock/measure'],
                    operator: 'sum'
                }
            };
            const result = VisualizationObject.isArithmeticMeasureDefinition(measureDefinition);
            expect(result).toEqual(true);
        });

        it('should return false when pop measure definition is tested', () => {
            const measureDefinition: IMeasureDefinitionType = {
                popMeasureDefinition: {
                    measureIdentifier: 'm1',
                    popAttribute: {
                        uri: '/gdc/mock/measure'
                    }
                }
            };
            const result = VisualizationObject.isArithmeticMeasureDefinition(measureDefinition);
            expect(result).toEqual(false);
        });

        it('should return false when previous period measure definition is tested', () => {
            const measureDefinition: IMeasureDefinitionType = {
                previousPeriodMeasure: {
                    measureIdentifier: 'm1',
                    dateDataSets: [{
                        dataSet: {
                            uri: '/gdc/mock/date'
                        },
                        periodsAgo: 1
                    }]
                }
            };
            const result = VisualizationObject.isArithmeticMeasureDefinition(measureDefinition);
            expect(result).toEqual(false);
        });
    });

    describe('isPopMeasureDefinition', () => {
        it('should return false when null is tested', () => {
            const result = VisualizationObject.isPopMeasureDefinition(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = VisualizationObject.isPopMeasureDefinition(undefined);
            expect(result).toEqual(false);
        });

        it('should return false when simple measure definition is tested', () => {
            const measureDefinition: IMeasureDefinitionType = {
                measureDefinition: {
                    item: {
                        uri: '/gdc/mock/measure'
                    }
                }
            };
            const result = VisualizationObject.isPopMeasureDefinition(measureDefinition);
            expect(result).toEqual(false);
        });

        it('should return false when arithmetic measure definition is tested', () => {
            const measureDefinition: IArithmeticMeasureDefinition = {
                arithmeticMeasure: {
                    measureIdentifiers: ['/gdc/mock/measure'],
                    operator: 'sum'
                }
            };
            const result = VisualizationObject.isPopMeasureDefinition(measureDefinition);
            expect(result).toEqual(false);
        });

        it('should return true when pop measure definition is tested', () => {
            const measureDefinition: IMeasureDefinitionType = {
                popMeasureDefinition: {
                    measureIdentifier: 'm1',
                    popAttribute: {
                        uri: '/gdc/mock/measure'
                    }
                }
            };
            const result = VisualizationObject.isPopMeasureDefinition(measureDefinition);
            expect(result).toEqual(true);
        });

        it('should return false when previous period measure definition is tested', () => {
            const measureDefinition: IMeasureDefinitionType = {
                previousPeriodMeasure: {
                    measureIdentifier: 'm1',
                    dateDataSets: [{
                        dataSet: {
                            uri: '/gdc/mock/date'
                        },
                        periodsAgo: 1
                    }]
                }
            };
            const result = VisualizationObject.isMeasureDefinition(measureDefinition);
            expect(result).toEqual(false);
        });
    });

    describe('isPreviousPeriodMeasureDefinition', () => {
        it('should return false when null is tested', () => {
            const result = VisualizationObject.isPreviousPeriodMeasureDefinition(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = VisualizationObject.isPreviousPeriodMeasureDefinition(undefined);
            expect(result).toEqual(false);
        });

        it('should return false when simple measure definition is tested', () => {
            const measureDefinition: IMeasureDefinitionType = {
                measureDefinition: {
                    item: {
                        uri: '/gdc/mock/measure'
                    }
                }
            };
            const result = VisualizationObject.isPreviousPeriodMeasureDefinition(measureDefinition);
            expect(result).toEqual(false);
        });

        it('should return false when arithmetic measure definition is tested', () => {
            const measureDefinition: IArithmeticMeasureDefinition = {
                arithmeticMeasure: {
                    measureIdentifiers: ['/gdc/mock/measure'],
                    operator: 'sum'
                }
            };
            const result = VisualizationObject.isPreviousPeriodMeasureDefinition(measureDefinition);
            expect(result).toEqual(false);
        });

        it('should return false when pop measure definition is tested', () => {
            const measureDefinition: IMeasureDefinitionType = {
                popMeasureDefinition: {
                    measureIdentifier: 'm1',
                    popAttribute: {
                        uri: '/gdc/mock/measure'
                    }
                }
            };
            const result = VisualizationObject.isPreviousPeriodMeasureDefinition(measureDefinition);
            expect(result).toEqual(false);
        });

        it('should return true when previous period measure definition is tested', () => {
            const measureDefinition: IMeasureDefinitionType = {
                previousPeriodMeasure: {
                    measureIdentifier: 'm1',
                    dateDataSets: [{
                        dataSet: {
                            uri: '/gdc/mock/date'
                        },
                        periodsAgo: 1
                    }]
                }
            };
            const result = VisualizationObject.isPreviousPeriodMeasureDefinition(measureDefinition);
            expect(result).toEqual(true);
        });
    });

    describe('isAttributeFilter', () => {
        it('should return false when null is tested', () => {
            const result = VisualizationObject.isAttributeFilter(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = VisualizationObject.isAttributeFilter(undefined);
            expect(result).toEqual(false);
        });

        it('should return false when relative date filter is tested', () => {
            const filter: VisualizationObjectFilter = {
                relativeDateFilter: {
                    dataSet: {
                        uri: '/gdc/mock/date'
                    },
                    granularity: 'GDC.time.year',
                    from: -1,
                    to: -1
                }
            };
            const result = VisualizationObject.isAttributeFilter(filter);
            expect(result).toEqual(false);
        });

        it('should return true when negative attribute filter is tested', () => {
            const filter: VisualizationObjectFilter = {
                negativeAttributeFilter: {
                    displayForm: {
                        uri: '/gdc/mock/date'
                    },
                    notIn: ['/gdc/mock/attribute/value_1', '/gdc/mock/attribute/value_2']
                }
            };
            const result = VisualizationObject.isAttributeFilter(filter);
            expect(result).toEqual(true);
        });

        it('should return true when positive attribute filter is tested', () => {
            const filter: VisualizationObjectFilter = {
                positiveAttributeFilter: {
                    displayForm: {
                        uri: '/gdc/mock/attribute'
                    },
                    in: ['/gdc/mock/attribute/value_1', '/gdc/mock/attribute/value_2']
                }
            };
            const result = VisualizationObject.isAttributeFilter(filter);
            expect(result).toEqual(true);
        });
    });

    describe('isDateFilter', () => {
        it('should return true for a VisualizationObjectAbsoluteDateFilter', () => {
            const absoluteDateFilter: VisualizationObject.IVisualizationObjectAbsoluteDateFilter = {
                absoluteDateFilter: {
                    dataSet: null
                }
            };

            const result = isDateFilter(absoluteDateFilter);
            expect(result).toEqual(true);
        });
        it('should return true for a VisualizationObjectRelativeDateFilter', () => {
            const relativeDateFilter: VisualizationObject.IVisualizationObjectRelativeDateFilter = {
                relativeDateFilter: {
                    dataSet: null,
                    granularity: ''
                }
            };

            const result = isDateFilter(relativeDateFilter);
            expect(result).toEqual(true);
        });
        it('should return false for a non VisualizationObjectDateFilter', () => {
            const attributeFilter: VisualizationObject.VisualizationObjectAttributeFilter = {
                positiveAttributeFilter: {
                    displayForm: null,
                    in: []
                }
            };

            const result = isDateFilter(attributeFilter);
            expect(result).toEqual(false);
        });
    });

    describe('isPositiveAttributeFilter', () => {
        it('should return false when null is tested', () => {
            const result = VisualizationObject.isPositiveAttributeFilter(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = VisualizationObject.isPositiveAttributeFilter(undefined);
            expect(result).toEqual(false);
        });

        it('should return false when negative attribute filter is tested', () => {
            const filter: VisualizationObjectAttributeFilter = {
                negativeAttributeFilter: {
                    displayForm: {
                        uri: '/gdc/mock/date'
                    },
                    notIn: ['/gdc/mock/attribute/value_1', '/gdc/mock/attribute/value_2']
                }
            };
            const result = VisualizationObject.isPositiveAttributeFilter(filter);
            expect(result).toEqual(false);
        });

        it('should return true when positive attribute filter is tested', () => {
            const filter: VisualizationObjectAttributeFilter = {
                positiveAttributeFilter: {
                    displayForm: {
                        uri: '/gdc/mock/attribute'
                    },
                    in: ['/gdc/mock/attribute/value_1', '/gdc/mock/attribute/value_2']
                }
            };
            const result = VisualizationObject.isPositiveAttributeFilter(filter);
            expect(result).toEqual(true);
        });
    });

    describe('isAbsoluteDateFilter', () => {
        it('should return false when null is tested', () => {
            const result = VisualizationObject.isAbsoluteDateFilter(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = VisualizationObject.isAbsoluteDateFilter(undefined);
            expect(result).toEqual(false);
        });

        it('should return false when relative date filter is tested', () => {
            const filter: VisualizationObjectDateFilter = {
                relativeDateFilter: {
                    dataSet: {
                        uri: '/gdc/mock/date'
                    },
                    granularity: 'GDC.time.year',
                    from: -1,
                    to: -1
                }
            };
            const result = VisualizationObject.isAbsoluteDateFilter(filter);
            expect(result).toEqual(false);
        });

        it('should return true when absolute date filter is tested', () => {
            const filter: VisualizationObjectDateFilter = {
                absoluteDateFilter: {
                    dataSet: {
                        uri: '/gdc/mock/date'
                    },
                    from: '2017-06-12',
                    to: '2018-07-11'
                }
            };
            const result = VisualizationObject.isAbsoluteDateFilter(filter);
            expect(result).toEqual(true);
        });
    });

    describe('isRelativeDateFilter', () => {
        it('should return false when null is tested', () => {
            const result = VisualizationObject.isRelativeDateFilter(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = VisualizationObject.isRelativeDateFilter(undefined);
            expect(result).toEqual(false);
        });

        it('should return false when absolute date filter is tested', () => {
            const filter: VisualizationObjectDateFilter = {
                absoluteDateFilter: {
                    dataSet: {
                        uri: '/gdc/mock/date'
                    },
                    from: 'beginning',
                    to: 'to end'
                }
            };
            const result = VisualizationObject.isRelativeDateFilter(filter);
            expect(result).toEqual(false);
        });

        it('should return true when relative date filter is tested', () => {
            const filter: VisualizationObjectDateFilter = {
                relativeDateFilter: {
                    dataSet: {
                        uri: '/gdc/mock/date'
                    },
                    granularity: 'GDC.time.year',
                    from: -1,
                    to: -1
                }
            };
            const result = VisualizationObject.isRelativeDateFilter(filter);
            expect(result).toEqual(true);
        });
    });

    describe('isAttribute', () => {
        it('should return false when null is tested', () => {
            const result = VisualizationObject.isAttribute(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = VisualizationObject.isAttribute(undefined);
            expect(result).toEqual(false);
        });

        it('should return false when measure is tested', () => {
            const measure: BucketItem = {
                measure: {
                    localIdentifier: 'm1',
                    definition: {
                        measureDefinition: {
                            item: {
                                uri: '/gdc/mock/measure'
                            }
                        }
                    }
                }
            };
            const result = VisualizationObject.isAttribute(measure);
            expect(result).toEqual(false);
        });

        it('should return true when visualization attribute is tested', () => {
            const attribute: BucketItem = {
                visualizationAttribute: {
                    localIdentifier: 'm1',
                    displayForm: {
                        uri: '/gdc/mock/measure'
                    }
                }
            };
            const result = VisualizationObject.isAttribute(attribute);
            expect(result).toEqual(true);
        });
    });

    describe('isMeasureValueFilter', () => {
        it('should return false when null is tested', () => {
            const result = VisualizationObject.isMeasureValueFilter(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = VisualizationObject.isMeasureValueFilter(undefined);
            expect(result).toEqual(false);
        });

        it('should return true when measure value filter is tested', () => {
            const filter: VisualizationObjectExtendedFilter = {
                measureValueFilter: {
                    measure: {
                        uri: '/gdc/mock/date'
                    }
                }
            };
            const result = VisualizationObject.isMeasureValueFilter(filter);
            expect(result).toEqual(true);
        });

        it('should return false when positive attribute filter is tested', () => {
            const filter: VisualizationObjectExtendedFilter = {
                positiveAttributeFilter: {
                    displayForm: {
                        uri: '/gdc/mock/attribute'
                    },
                    in: ['/gdc/mock/attribute/value_1', '/gdc/mock/attribute/value_2']
                }
            };
            const result = VisualizationObject.isMeasureValueFilter(filter);
            expect(result).toEqual(false);
        });
    });

    describe('isRankingFilter', () => {
        it('should return false when null is tested', () => {
            const result = VisualizationObject.isRankingFilter(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = VisualizationObject.isRankingFilter(undefined);
            expect(result).toEqual(false);
        });

        it('should return true when measure value filter is tested', () => {
            const filter: VisualizationObjectExtendedFilter = {
                rankingFilter: {
                    measures: [{
                        uri: '/gdc/mock/date'
                    }],
                    operator: 'TOP',
                    value: 3
                }
            };
            const result = VisualizationObject.isRankingFilter(filter);
            expect(result).toEqual(true);
        });

        it('should return false when positive attribute filter is tested', () => {
            const filter: VisualizationObjectExtendedFilter = {
                positiveAttributeFilter: {
                    displayForm: {
                        uri: '/gdc/mock/attribute'
                    },
                    in: ['/gdc/mock/attribute/value_1', '/gdc/mock/attribute/value_2']
                }
            };
            const result = VisualizationObject.isRankingFilter(filter);
            expect(result).toEqual(false);
        });
    });

    describe('isLocalIdentifierQualifier', () => {
        it('should return false when null is tested', () => {
            const result = VisualizationObject.isLocalIdentifierQualifier(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = VisualizationObject.isLocalIdentifierQualifier(undefined);
            expect(result).toEqual(false);
        });

        it('should return false when object uri qualifier is tested', () => {
            const objUriQualifier: IObjUriQualifier = {
                uri: '/gdc/mock/measure'
            };
            const result = VisualizationObject.isLocalIdentifierQualifier(objUriQualifier);
            expect(result).toEqual(false);
        });

        it('should return true when object local qualifier is tested', () => {
            const localIdentifierQualifier: ILocalIdentifierQualifier = {
                localIdentifier: 'localId'
            };
            const result = VisualizationObject.isLocalIdentifierQualifier(localIdentifierQualifier);
            expect(result).toEqual(true);
        });
    });

    describe('isComparisonCondition', () => {
        it('should return false when null is tested', () => {
            const result = VisualizationObject.isComparisonCondition(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = VisualizationObject.isComparisonCondition(undefined);
            expect(result).toEqual(false);
        });

        it('should return false when a range condition is tested', () => {
            const rangeCondition: MeasureValueFilterCondition = {
                range: {
                    operator: 'BETWEEN',
                    from: 10,
                    to: 100
                }
            };
            const result = VisualizationObject.isComparisonCondition(rangeCondition);
            expect(result).toEqual(false);
        });

        it('should return true when a comparison condition is tested', () => {
            const comparisonCondition: MeasureValueFilterCondition = {
                comparison: {
                    operator: 'EQUAL_TO',
                    value: 100
                }
            };
            const result = VisualizationObject.isComparisonCondition(comparisonCondition);
            expect(result).toEqual(true);
        });
    });

    describe('isRangeCondition', () => {
        it('should return false when null is tested', () => {
            const result = VisualizationObject.isRangeCondition(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = VisualizationObject.isRangeCondition(undefined);
            expect(result).toEqual(false);
        });

        it('should return false when a comparison condition is tested', () => {
            const comparisonCondition: MeasureValueFilterCondition = {
                comparison: {
                    operator: 'EQUAL_TO',
                    value: 100
                }
            };
            const result = VisualizationObject.isRangeCondition(comparisonCondition);
            expect(result).toEqual(false);
        });

        it('should return true when a range condition is tested', () => {
            const rangeCondition: MeasureValueFilterCondition = {
                range: {
                    operator: 'BETWEEN',
                    from: 10,
                    to: 100
                }
            };
            const result = VisualizationObject.isRangeCondition(rangeCondition);
            expect(result).toEqual(true);
        });
    });
});
