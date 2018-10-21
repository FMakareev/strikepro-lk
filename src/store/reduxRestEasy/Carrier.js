import {normalize} from "normalizr";
import {createResource,} from '@brigad/redux-rest-easy';
import {CarrierOptionsSchema} from "./schemas/CarrierOptionsSchema";
import {config } from '../../config';

export const CarrierOptions = createResource('options', {cacheLifetime: 30})({
    options: {
        method: 'GET',
        url: `${config.api.baseUrl}/api/v1/carrier/options`,
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
