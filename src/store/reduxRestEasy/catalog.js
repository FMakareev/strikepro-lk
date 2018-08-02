import { normalize } from "normalizr";
import {createResource} from '@brigad/redux-rest-easy';
import {CarrierOptionsSchema} from "./schemas/CarrierOptionsSchema";


export const Catalog = createResource('catalog', { cacheLifetime: 30 })({
    catalog: {
        method: 'GET',
        url: 'http://new.strikepro.ru/api/v1/catalog::id',
        afterHook: () => console.log('Get carrier successfully'),
    },
});

const {
    actions: {
        catalog: {
            perform: CatalogAction
        },
    },
    selectors: {
        resource: {getResource: getCatalog},
        catalog: {
            request: {
                isPerforming: isCatalog
            },
        },
    },
} = Catalog;
console.log(Catalog);
export {CatalogAction, getCatalog, isCatalog};
//

export default Catalog;