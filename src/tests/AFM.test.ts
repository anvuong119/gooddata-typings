// (C) 2007-2020 GoodData Corporation
import { AFM } from '../AFM';
import CompatibilityFilter = AFM.CompatibilityFilter;
import MeasureDefinition = AFM.MeasureDefinition;
import ObjQualifier = AFM.ObjQualifier;
import LocatorItem = AFM.LocatorItem;
import SortItem = AFM.SortItem;

describe('AFM', () => {
    describe('isObjectUriQualifier', () => {
        it('should return false when null is tested', () => {
            const result = AFM.isObjectUriQualifier(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = AFM.isObjectUriQualifier(undefined);
            expect(result).toEqual(false);
        });

        it('should return false when identifier object qualifier is tested', () => {
            const objectQualifier: ObjQualifier = {
                identifier: 'id'
            };
            const result = AFM.isObjectUriQualifier(objectQualifier);
            expect(result).toEqual(false);
        });

        it('should return true when uri object qualifier is tested', () => {
            const objectQualifier: ObjQualifier = {
                uri: '/gdc/mock/id'
            };
            const result = AFM.isObjectUriQualifier(objectQualifier);
            expect(result).toEqual(true);
        });
    });

    describe('isObjIdentifierQualifier', () => {
        it('should return false when null is tested', () => {
            const result = AFM.isObjIdentifierQualifier(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = AFM.isObjIdentifierQualifier(undefined);
            expect(result).toEqual(false);
        });

        it('should return false when uri object qualifier is tested', () => {
            const objectQualifier: ObjQualifier = {
                uri: '/gdc/mock/id'
            };
            const result = AFM.isObjIdentifierQualifier(objectQualifier);
            expect(result).toEqual(false);
        });

        it('should return true when identifier object qualifier is tested', () => {
            const objectQualifier: ObjQualifier = {
                identifier: 'id'
            };
            const result = AFM.isObjIdentifierQualifier(objectQualifier);
            expect(result).toEqual(true);
        });
    });

    describe('isSimpleMeasureDefinition', () => {
        it('should return false when null is tested', () => {
            const result = AFM.isSimpleMeasureDefinition(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = AFM.isSimpleMeasureDefinition(undefined);
            expect(result).toEqual(false);
        });

        it('should return true when simple measure definition is tested', () => {
            const measure: MeasureDefinition = {
                measure: {
                    item: {
                        uri: '/gdc/mock/measure'
                    }
                }
            };
            const result = AFM.isSimpleMeasureDefinition(measure);
            expect(result).toEqual(true);
        });

        it('should return false when arithmetic measure definition is tested', () => {
            const measure: MeasureDefinition = {
                arithmeticMeasure: {
                    measureIdentifiers: ['/gdc/mock/measure'],
                    operator: 'sum'
                }
            };
            const result = AFM.isSimpleMeasureDefinition(measure);
            expect(result).toEqual(false);
        });

        it('should return false when pop measure definition is tested', () => {
            const measure: MeasureDefinition = {
                popMeasure: {
                    measureIdentifier: 'm1',
                    popAttribute: {
                        uri: '/gdc/mock/measure'
                    }
                }
            };
            const result = AFM.isSimpleMeasureDefinition(measure);
            expect(result).toEqual(false);
        });

        it('should return false when previous period measure definition is tested', () => {
            const measure: MeasureDefinition = {
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
            const result = AFM.isSimpleMeasureDefinition(measure);
            expect(result).toEqual(false);
        });
    });

    describe('isArithmeticMeasureDefinition', () => {
        it('should return false when null is tested', () => {
            const result = AFM.isArithmeticMeasureDefinition(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = AFM.isArithmeticMeasureDefinition(undefined);
            expect(result).toEqual(false);
        });

        it('should return false when simple measure definition is tested', () => {
            const measure: MeasureDefinition = {
                measure: {
                    item: {
                        uri: '/gdc/mock/measure'
                    }
                }
            };
            const result = AFM.isArithmeticMeasureDefinition(measure);
            expect(result).toEqual(false);
        });

        it('should return true when arithmetic measure definition is tested', () => {
            const measure: MeasureDefinition = {
                arithmeticMeasure: {
                    measureIdentifiers: ['/gdc/mock/measure'],
                    operator: 'sum'
                }
            };
            const result = AFM.isArithmeticMeasureDefinition(measure);
            expect(result).toEqual(true);
        });

        it('should return false when pop measure definition is tested', () => {
            const measure: MeasureDefinition = {
                popMeasure: {
                    measureIdentifier: 'm1',
                    popAttribute: {
                        uri: '/gdc/mock/measure'
                    }
                }
            };
            const result = AFM.isArithmeticMeasureDefinition(measure);
            expect(result).toEqual(false);
        });

        it('should return false when previous period measure definition is tested', () => {
            const measure: MeasureDefinition = {
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
            const result = AFM.isArithmeticMeasureDefinition(measure);
            expect(result).toEqual(false);
        });
    });

    describe('isPopMeasureDefinition', () => {
        it('should return false when null is tested', () => {
            const result = AFM.isPopMeasureDefinition(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = AFM.isPopMeasureDefinition(undefined);
            expect(result).toEqual(false);
        });

        it('should return false when simple measure definition is tested', () => {
            const measure: MeasureDefinition = {
                measure: {
                    item: {
                        uri: '/gdc/mock/measure'
                    }
                }
            };
            const result = AFM.isPopMeasureDefinition(measure);
            expect(result).toEqual(false);
        });

        it('should return false when arithmetic measure definition is tested', () => {
            const measure: MeasureDefinition = {
                arithmeticMeasure: {
                    measureIdentifiers: ['/gdc/mock/measure'],
                    operator: 'sum'
                }
            };
            const result = AFM.isPopMeasureDefinition(measure);
            expect(result).toEqual(false);
        });

        it('should return true when pop measure definition is tested', () => {
            const measure: MeasureDefinition = {
                popMeasure: {
                    measureIdentifier: 'm1',
                    popAttribute: {
                        uri: '/gdc/mock/measure'
                    }
                }
            };
            const result = AFM.isPopMeasureDefinition(measure);
            expect(result).toEqual(true);
        });

        it('should return false when previous period measure definition is tested', () => {
            const measure: MeasureDefinition = {
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
            const result = AFM.isSimpleMeasureDefinition(measure);
            expect(result).toEqual(false);
        });
    });

    describe('isPreviousPeriodMeasureDefinition', () => {
        it('should return false when null is tested', () => {
            const result = AFM.isPreviousPeriodMeasureDefinition(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = AFM.isPreviousPeriodMeasureDefinition(undefined);
            expect(result).toEqual(false);
        });

        it('should return false when simple measure definition is tested', () => {
            const measure: MeasureDefinition = {
                measure: {
                    item: {
                        uri: '/gdc/mock/measure'
                    }
                }
            };
            const result = AFM.isPreviousPeriodMeasureDefinition(measure);
            expect(result).toEqual(false);
        });

        it('should return false when arithmetic measure definition is tested', () => {
            const measure: MeasureDefinition = {
                arithmeticMeasure: {
                    measureIdentifiers: ['/gdc/mock/measure'],
                    operator: 'sum'
                }
            };
            const result = AFM.isPreviousPeriodMeasureDefinition(measure);
            expect(result).toEqual(false);
        });

        it('should return false when pop measure definition is tested', () => {
            const measure: MeasureDefinition = {
                popMeasure: {
                    measureIdentifier: 'm1',
                    popAttribute: {
                        uri: '/gdc/mock/measure'
                    }
                }
            };
            const result = AFM.isPreviousPeriodMeasureDefinition(measure);
            expect(result).toEqual(false);
        });

        it('should return true when previous period measure definition is tested', () => {
            const measure: MeasureDefinition = {
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
            const result = AFM.isPreviousPeriodMeasureDefinition(measure);
            expect(result).toEqual(true);
        });
    });

    describe('isAttributeSortItem', () => {
        it('should return false when null is tested', () => {
            const result = AFM.isAttributeSortItem(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = AFM.isAttributeSortItem(undefined);
            expect(result).toEqual(false);
        });

        it('should return true when attribute sort item is tested', () => {
            const sortItem: SortItem = {
                attributeSortItem: {
                    direction: 'asc',
                    attributeIdentifier: 'a1'
                }
            };
            const result = AFM.isAttributeSortItem(sortItem);
            expect(result).toEqual(true);
        });

        it('should return false when measure sort item is tested', () => {
            const sortItem: SortItem = {
                measureSortItem: {
                    direction: 'asc',
                    locators: [{
                        measureLocatorItem: {
                            measureIdentifier: 'm1'
                        }
                    }]
                }
            };
            const result = AFM.isAttributeSortItem(sortItem);
            expect(result).toEqual(false);
        });
    });

    describe('isMeasureSortItem', () => {
        it('should return false when null is tested', () => {
            const result = AFM.isMeasureSortItem(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = AFM.isMeasureSortItem(undefined);
            expect(result).toEqual(false);
        });

        it('should return false when attribute sort item is tested', () => {
            const sortItem: SortItem = {
                attributeSortItem: {
                    direction: 'asc',
                    attributeIdentifier: 'a1'
                }
            };
            const result = AFM.isMeasureSortItem(sortItem);
            expect(result).toEqual(false);
        });

        it('should return true when measure sort item is tested', () => {
            const sortItem: SortItem = {
                measureSortItem: {
                    direction: 'asc',
                    locators: [{
                        measureLocatorItem: {
                            measureIdentifier: 'm1'
                        }
                    }]
                }
            };
            const result = AFM.isMeasureSortItem(sortItem);
            expect(result).toEqual(true);
        });
    });

    describe('isMeasureLocatorItem', () => {
        it('should return false when null is tested', () => {
            const result = AFM.isMeasureLocatorItem(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = AFM.isMeasureLocatorItem(undefined);
            expect(result).toEqual(false);
        });

        it('should return false when attribute locator is tested', () => {
            const locatorItem: LocatorItem = {
                attributeLocatorItem: {
                    attributeIdentifier: 'a1',
                    element: 'element'
                }
            };
            const result = AFM.isMeasureLocatorItem(locatorItem);
            expect(result).toEqual(false);
        });

        it('should return true when measure locator filter is tested', () => {
            const locatorItem: LocatorItem = {
                measureLocatorItem: {
                    measureIdentifier: 'm1'
                }
            };
            const result = AFM.isMeasureLocatorItem(locatorItem);
            expect(result).toEqual(true);
        });
    });

    const expressionFilter: CompatibilityFilter = {
        value: 'MAQL'
    };
    const relativeDateFilter: CompatibilityFilter = {
        relativeDateFilter: {
            dataSet: {
                uri: '/gdc/mock/ds'
            },
            granularity: 'gram',
            from: -10,
            to: 0
        }
    };
    const absoluteDateFilter: CompatibilityFilter = {
        absoluteDateFilter: {
            dataSet: {
                uri: '/gdc/mock/ds'
            },
            from: '1',
            to: '2'
        }
    };
    const negativeAttributeFilter: CompatibilityFilter = {
        negativeAttributeFilter: {
            displayForm: {
                uri: '/gdc/mock/date'
            },
            notIn: ['/gdc/mock/attribute/value_1', '/gdc/mock/attribute/value_2']
        }
    };
    const positiveAttributeFilter: CompatibilityFilter = {
        positiveAttributeFilter: {
            displayForm: {
                uri: '/gdc/mock/attribute'
            },
            in: ['/gdc/mock/attribute/value_1', '/gdc/mock/attribute/value_2']
        }
    };
    const measureValueFilter: CompatibilityFilter = {
        measureValueFilter: {
            measure: {
                uri: '/gdc/mock/date'
            }
        }
    };
    const rankingFilter: CompatibilityFilter = {
        rankingFilter: {
            measures: [{
                uri: '/gdc/mock/date'
            }],
            operator: 'TOP',
            value: 3
        }
    };

    describe('isDateFilter', () => {
        it('should return false when null is tested', () => {
            const result = AFM.isDateFilter(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = AFM.isDateFilter(undefined);
            expect(result).toEqual(false);
        });

        it('should return true when relative date filter is tested', () => {
            const result = AFM.isDateFilter(relativeDateFilter);
            expect(result).toEqual(true);
        });

        it('should return true when absolute date filter is tested', () => {
            const result = AFM.isDateFilter(absoluteDateFilter);
            expect(result).toEqual(true);
        });

        it('should return false when negative attribute filter is tested', () => {
            const result = AFM.isDateFilter(negativeAttributeFilter);
            expect(result).toEqual(false);
        });

        it('should return false when positive attribute filter is tested', () => {
            const result = AFM.isDateFilter(positiveAttributeFilter);
            expect(result).toEqual(false);
        });

        it('should return false when measure value filter is tested', () => {
            const result = AFM.isDateFilter(measureValueFilter);
            expect(result).toEqual(false);
        });

        it('should return false when ranking filter is tested', () => {
            const result = AFM.isDateFilter(rankingFilter);
            expect(result).toEqual(false);
        });

        it('should return false when expression filter is tested', () => {
            const result = AFM.isDateFilter(expressionFilter);
            expect(result).toEqual(false);
        });
    });

    describe('isRelativeDateFilter', () => {
        it('should return false when null is tested', () => {
            const result = AFM.isRelativeDateFilter(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = AFM.isRelativeDateFilter(undefined);
            expect(result).toEqual(false);
        });

        it('should return true when relative date filter is tested', () => {
            const result = AFM.isRelativeDateFilter(relativeDateFilter);
            expect(result).toEqual(true);
        });

        it('should return true when absolute date filter is tested', () => {
            const result = AFM.isRelativeDateFilter(absoluteDateFilter);
            expect(result).toEqual(false);
        });

        it('should return false when negative attribute filter is tested', () => {
            const result = AFM.isRelativeDateFilter(negativeAttributeFilter);
            expect(result).toEqual(false);
        });

        it('should return false when positive attribute filter is tested', () => {
            const result = AFM.isRelativeDateFilter(positiveAttributeFilter);
            expect(result).toEqual(false);
        });

        it('should return false when measure value filter is tested', () => {
            const result = AFM.isRelativeDateFilter(measureValueFilter);
            expect(result).toEqual(false);
        });

        it('should return false when ranking filter is tested', () => {
            const result = AFM.isRelativeDateFilter(rankingFilter);
            expect(result).toEqual(false);
        });

        it('should return false when expression filter is tested', () => {
            const result = AFM.isRelativeDateFilter(expressionFilter);
            expect(result).toEqual(false);
        });
    });

    describe('isAbsoluteDateFilter', () => {
        it('should return false when null is tested', () => {
            const result = AFM.isAbsoluteDateFilter(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = AFM.isAbsoluteDateFilter(undefined);
            expect(result).toEqual(false);
        });

        it('should return true when relative date filter is tested', () => {
            const result = AFM.isAbsoluteDateFilter(relativeDateFilter);
            expect(result).toEqual(false);
        });

        it('should return true when absolute date filter is tested', () => {
            const result = AFM.isAbsoluteDateFilter(absoluteDateFilter);
            expect(result).toEqual(true);
        });

        it('should return false when negative attribute filter is tested', () => {
            const result = AFM.isAbsoluteDateFilter(negativeAttributeFilter);
            expect(result).toEqual(false);
        });

        it('should return false when positive attribute filter is tested', () => {
            const result = AFM.isAbsoluteDateFilter(positiveAttributeFilter);
            expect(result).toEqual(false);
        });

        it('should return false when measure value filter is tested', () => {
            const result = AFM.isAbsoluteDateFilter(measureValueFilter);
            expect(result).toEqual(false);
        });

        it('should return false when ranking filter is tested', () => {
            const result = AFM.isAbsoluteDateFilter(rankingFilter);
            expect(result).toEqual(false);
        });

        it('should return false when expression filter is tested', () => {
            const result = AFM.isAbsoluteDateFilter(expressionFilter);
            expect(result).toEqual(false);
        });
    });

    describe('isAttributeFilter', () => {
        it('should return false when null is tested', () => {
            const result = AFM.isAttributeFilter(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = AFM.isAttributeFilter(undefined);
            expect(result).toEqual(false);
        });

        it('should return true when relative date filter is tested', () => {
            const result = AFM.isAttributeFilter(relativeDateFilter);
            expect(result).toEqual(false);
        });

        it('should return true when absolute date filter is tested', () => {
            const result = AFM.isAttributeFilter(absoluteDateFilter);
            expect(result).toEqual(false);
        });

        it('should return false when negative attribute filter is tested', () => {
            const result = AFM.isAttributeFilter(negativeAttributeFilter);
            expect(result).toEqual(true);
        });

        it('should return false when positive attribute filter is tested', () => {
            const result = AFM.isAttributeFilter(positiveAttributeFilter);
            expect(result).toEqual(true);
        });

        it('should return false when measure value filter is tested', () => {
            const result = AFM.isAttributeFilter(measureValueFilter);
            expect(result).toEqual(false);
        });

        it('should return false when ranking filter is tested', () => {
            const result = AFM.isAttributeFilter(rankingFilter);
            expect(result).toEqual(false);
        });

        it('should return false when expression filter is tested', () => {
            const result = AFM.isAttributeFilter(expressionFilter);
            expect(result).toEqual(false);
        });
    });

    describe('isPositiveAttributeFilter', () => {
        it('should return false when null is tested', () => {
            const result = AFM.isPositiveAttributeFilter(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = AFM.isPositiveAttributeFilter(undefined);
            expect(result).toEqual(false);
        });

        it('should return true when relative date filter is tested', () => {
            const result = AFM.isPositiveAttributeFilter(relativeDateFilter);
            expect(result).toEqual(false);
        });

        it('should return true when absolute date filter is tested', () => {
            const result = AFM.isPositiveAttributeFilter(absoluteDateFilter);
            expect(result).toEqual(false);
        });

        it('should return false when negative attribute filter is tested', () => {
            const result = AFM.isPositiveAttributeFilter(negativeAttributeFilter);
            expect(result).toEqual(false);
        });

        it('should return false when positive attribute filter is tested', () => {
            const result = AFM.isPositiveAttributeFilter(positiveAttributeFilter);
            expect(result).toEqual(true);
        });

        it('should return false when measure value filter is tested', () => {
            const result = AFM.isPositiveAttributeFilter(measureValueFilter);
            expect(result).toEqual(false);
        });

        it('should return false when ranking filter is tested', () => {
            const result = AFM.isPositiveAttributeFilter(rankingFilter);
            expect(result).toEqual(false);
        });

        it('should return false when expression filter is tested', () => {
            const result = AFM.isPositiveAttributeFilter(expressionFilter);
            expect(result).toEqual(false);
        });
    });

    describe('isNegativeAttributeFilter', () => {
        it('should return false when null is tested', () => {
            const result = AFM.isNegativeAttributeFilter(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = AFM.isNegativeAttributeFilter(undefined);
            expect(result).toEqual(false);
        });

        it('should return true when relative date filter is tested', () => {
            const result = AFM.isNegativeAttributeFilter(relativeDateFilter);
            expect(result).toEqual(false);
        });

        it('should return true when absolute date filter is tested', () => {
            const result = AFM.isNegativeAttributeFilter(absoluteDateFilter);
            expect(result).toEqual(false);
        });

        it('should return false when negative attribute filter is tested', () => {
            const result = AFM.isNegativeAttributeFilter(negativeAttributeFilter);
            expect(result).toEqual(true);
        });

        it('should return false when positive attribute filter is tested', () => {
            const result = AFM.isNegativeAttributeFilter(positiveAttributeFilter);
            expect(result).toEqual(false);
        });

        it('should return false when measure value filter is tested', () => {
            const result = AFM.isNegativeAttributeFilter(measureValueFilter);
            expect(result).toEqual(false);
        });

        it('should return false when ranking filter is tested', () => {
            const result = AFM.isNegativeAttributeFilter(rankingFilter);
            expect(result).toEqual(false);
        });

        it('should return false when expression filter is tested', () => {
            const result = AFM.isNegativeAttributeFilter(expressionFilter);
            expect(result).toEqual(false);
        });
    });

    describe('isMeasureValueFilter', () => {
        it('should return false when null is tested', () => {
            const result = AFM.isMeasureValueFilter(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = AFM.isMeasureValueFilter(undefined);
            expect(result).toEqual(false);
        });

        it('should return true when relative date filter is tested', () => {
            const result = AFM.isMeasureValueFilter(relativeDateFilter);
            expect(result).toEqual(false);
        });

        it('should return true when absolute date filter is tested', () => {
            const result = AFM.isMeasureValueFilter(absoluteDateFilter);
            expect(result).toEqual(false);
        });

        it('should return false when negative attribute filter is tested', () => {
            const result = AFM.isMeasureValueFilter(negativeAttributeFilter);
            expect(result).toEqual(false);
        });

        it('should return false when positive attribute filter is tested', () => {
            const result = AFM.isMeasureValueFilter(positiveAttributeFilter);
            expect(result).toEqual(false);
        });

        it('should return false when measure value filter is tested', () => {
            const result = AFM.isMeasureValueFilter(measureValueFilter);
            expect(result).toEqual(true);
        });

        it('should return false when ranking filter is tested', () => {
            const result = AFM.isMeasureValueFilter(rankingFilter);
            expect(result).toEqual(false);
        });

        it('should return false when expression filter is tested', () => {
            const result = AFM.isMeasureValueFilter(expressionFilter);
            expect(result).toEqual(false);
        });
    });

    describe('isRankingFilter', () => {
        it('should return false when null is tested', () => {
            const result = AFM.isRankingFilter(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = AFM.isRankingFilter(undefined);
            expect(result).toEqual(false);
        });

        it('should return true when relative date filter is tested', () => {
            const result = AFM.isRankingFilter(relativeDateFilter);
            expect(result).toEqual(false);
        });

        it('should return true when absolute date filter is tested', () => {
            const result = AFM.isRankingFilter(absoluteDateFilter);
            expect(result).toEqual(false);
        });

        it('should return false when negative attribute filter is tested', () => {
            const result = AFM.isRankingFilter(negativeAttributeFilter);
            expect(result).toEqual(false);
        });

        it('should return false when positive attribute filter is tested', () => {
            const result = AFM.isRankingFilter(positiveAttributeFilter);
            expect(result).toEqual(false);
        });

        it('should return false when measure value filter is tested', () => {
            const result = AFM.isRankingFilter(measureValueFilter);
            expect(result).toEqual(false);
        });

        it('should return true when ranking filter is tested', () => {
            const result = AFM.isRankingFilter(rankingFilter);
            expect(result).toEqual(true);
        });

        it('should return false when expression filter is tested', () => {
            const result = AFM.isRankingFilter(expressionFilter);
            expect(result).toEqual(false);
        });
    });

    describe('isExpressionFilter', () => {
        it('should return false when null is tested', () => {
            const result = AFM.isExpressionFilter(null);
            expect(result).toEqual(false);
        });

        it('should return false when undefined is tested', () => {
            const result = AFM.isExpressionFilter(undefined);
            expect(result).toEqual(false);
        });

        it('should return true when relative date filter is tested', () => {
            const result = AFM.isExpressionFilter(relativeDateFilter);
            expect(result).toEqual(false);
        });

        it('should return true when absolute date filter is tested', () => {
            const result = AFM.isExpressionFilter(absoluteDateFilter);
            expect(result).toEqual(false);
        });

        it('should return false when negative attribute filter is tested', () => {
            const result = AFM.isExpressionFilter(negativeAttributeFilter);
            expect(result).toEqual(false);
        });

        it('should return false when positive attribute filter is tested', () => {
            const result = AFM.isExpressionFilter(positiveAttributeFilter);
            expect(result).toEqual(false);
        });

        it('should return false when measure value filter is tested', () => {
            const result = AFM.isExpressionFilter(measureValueFilter);
            expect(result).toEqual(false);
        });

        it('should return false when ranking filter is tested', () => {
            const result = AFM.isExpressionFilter(rankingFilter);
            expect(result).toEqual(false);
        });

        it('should return false when expression filter is tested', () => {
            const result = AFM.isExpressionFilter(expressionFilter);
            expect(result).toEqual(true);
        });
    });
});
