import {
	GET_CATEGORY_LOAD,
	GET_CATEGORY_SUCCESS,
	GET_CATEGORY_ERROR, CHANGE_TREE,
} from './action_types';
import { getProducts } from "../catalog_products/actions";
import { config } from "../../../config";
// import { CatalogSidebar } from "../../../blocks/catalog/catalog_sidebar";
// import DeepFind from 'deep_find';
export const getCategory = (id) => {
	return (dispatch) => {
		console.log('CatalogSidebar getCategory', id);

		dispatch({type: GET_CATEGORY_LOAD, payload: true});

		return new Promise((resolve, reject) => {
			const url = `${config.api.baseUrl}/api/v1/catalog${id ? id : ''}`;
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
	// console.log('CatalogSidebar initCategory', store);

	return (dispatch) => {
		dispatch(getCategory())
			.then((response) => {
				let children = createChildren(response);
				dispatch({
					type: CHANGE_TREE, payload: {
						name: 'Категории',
						loading: false,
						toggled: true,
						children: children
					}
				});
			})
	}
}

const createChildren = ({data}) => {
	// console.log('CatalogSidebar createChildren', data);

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

// console.log('deep_find', DeepFind.find("Specialist Light Spinning", data.tree.children, { searchField: 'name', children: 'children' } ));



export const onToggle = (prevNode, toggled) => {
	return (dispatch) => {

		const node = Object.assign({}, prevNode);
		node.active = !node.active;
		node.toggled = toggled;
		// console.log('CatalogSidebar onToggle', node);



		if (node.is_product === '0' && node.children && node.children.length === 0) {
			dispatch(getCategory('/group/' + node.id))
				.then((response) => {
					console.log(`getCategory /group/${node.id}:`,response);
					if ('data' in response && response.data.length) {
						node.loading = false;
						node.toggled = true;
						node.children = createChildren(response);
					}
					dispatch({type: CHANGE_TREE, payload: {cursor: node}});
				})

		} else if (node.is_product === '1') {
			// console.log('CatalogSidebar node.is_product === \'1\'', node);
			node.toggled = false;
			node.active = true;

			// dispatch({type: 'ARTICLES_URL', payload: `http://alex.taran.ru/api/v1/catalog/articles/${node.id}`});
			dispatch(getProducts(`${config.api.baseUrl}/api/v1/catalog/articles/${node.id}`));
			dispatch({type: CHANGE_TREE, payload: {cursor: node}});
		} else {
			dispatch({type: CHANGE_TREE, payload: {cursor: node}});
		}

	}
}
