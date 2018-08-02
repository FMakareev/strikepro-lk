import {schema} from 'normalizr';

export const CarrierOptionSchema = new schema.Entity(
    "options",
    {},
    {
        processStrategy: (value, parent, key) => ({
            name: value.attributes.name,
            id: value.id
        })
    }
);

export const CarrierOptionsSchema = new schema.Array(CarrierOptionSchema);

export default CarrierOptionsSchema;