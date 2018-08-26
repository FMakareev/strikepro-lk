import {normalize} from "normalizr";
import {createResource,} from '@brigad/redux-rest-easy';
import {Store} from '../store';

import {CarrierOptionsSchema} from "./schemas/CarrierOptionsSchema";
import {getToken} from "./networkHelpers/getToken";


export const CarrierOptions = createResource('options', {cacheLifetime: 30})({
    options: {
        method: 'GET',
        url: 'http://new.strikepro.ru/api/v1/carrier/options',
        afterHook: () => console.log('Get carrier successfully'),
        normalizer: ({data}) => normalize(data, CarrierOptionsSchema),

    },
});

const {
    actions: {
        options: {
            perform: CarrierOptionsAction
        },
    },
    selectors: {
        resource: {getResource: getCarrierOptions},
        options: {
            request: {
                isPerforming: isCarrierOptions
            },
        },
    },
} = CarrierOptions;
console.log(CarrierOptions);
export {CarrierOptionsAction, getCarrierOptions, isCarrierOptions};
//

export default CarrierOptions;