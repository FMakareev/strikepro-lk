import {
    GET_CATEGORY_LOAD,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_ERROR, CHANGE_TREE,
} from './action_types';
import {getProducts} from "../catalog_products/actions";

export const getCategory = (id) => {
    return (dispatch) => {

        dispatch({type: GET_CATEGORY_LOAD, payload: true});

        return new Promise((resolve, reject) => {
            const url = `http://alex.taran.ru/api/v1/catalog${id ? id : ''}`;
            fetch(url, {
                method: 'GET',
                credentials: 'include',
                cache: 'no-cache',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    // console.log(response);
                    if (response.status >= 200 && response.status < 300) {
                        return Promise.resolve(response);
                    }
                    return Promise.reject(response);
                })
                .then((response) => response.json())
                .then((response) => {

                    dispatch({type: GET_CATEGORY_SUCCESS, payload: true});

                    resolve(response);
                })
                .catch(error => {
                    console.log(error);
                    dispatch({type: GET_CATEGORY_ERROR, payload: error});
                    reject(error)
                });
        })

    }

}

export const initCategory = (store) => {
    return (dispatch) => {
        dispatch(getCategory())
            .then((response) => {
                let children = createChildren(response);
                dispatch({type: CHANGE_TREE, payload: {
                    name: 'Категории',
                    loading: false,
                    toggled: true,
                    children: children
                }});
            })
    }
}

const createChildren = ({data}) => {
    if (data) {
        return data.map((item, index) => ({
            name: item.attributes.name,
            type: item.type,
            id: item.id,
            is_product: item.attributes.is_product,
            ...(item.attributes.is_product === '0' ? {
                loading: true,
                children: []
            } : null)
        }));
    }
    return [];
};

export const onToggle = (node, toggled) => {
    return (dispatch) => {

        node.active = !node.active;
        node.toggled = toggled;

        if (node.is_product === '0' && node.children && node.children.length === 0) {
            dispatch(getCategory('/group/' + node.id))
                .then((response) => {
                    if ('data' in response && response.data.length) {
                        node.loading = false;
                        node.toggled = true;
                        node.children = createChildren(response);
                    }
                    dispatch({type: CHANGE_TREE, payload: {cursor: node}});

                })

        } else if (node.is_product === '1') {
            // dispatch({type: 'ARTICLES_URL', payload: `http://alex.taran.ru/api/v1/catalog/articles/${node.id}`});
            dispatch(getProducts(`http://alex.taran.ru/api/v1/catalog/articles/${node.id}`));
        } else {
            dispatch({type: CHANGE_TREE, payload: {cursor: node}});
        }

    }
}