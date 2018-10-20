import DeepFind from 'deep_find';

import {
	GET_CATEGORY_LOAD,
	GET_CATEGORY_SUCCESS,
	GET_CATEGORY_ERROR,
	CHANGE_TREE,
} from './action_types';


export const catalog_category = (state = {}, action) => {
	switch (action.type) {
		case CHANGE_TREE: {
			// console.log(CHANGE_TREE, '===============================================');
			//
			// console.log(CHANGE_TREE + ' action', action);
			// console.log(CHANGE_TREE + ' state', state);

			if (action.payload.cursor) {
				let result = DeepFind.find(action.payload.cursor.name, state.tree.children, {
					searchField: 'name',
					children: 'children'
				});
				// console.log(CHANGE_TREE + ' DeepFind result', result);
				if(result){
					result.active = action.payload.cursor.active;
					result.children = action.payload.cursor.children;
					result.id = action.payload.cursor.id;
					result.is_product = action.payload.cursor.is_product;
					result.loading = action.payload.cursor.loading;
					result.name = action.payload.cursor.name;
					result.toggled = action.payload.cursor.toggled;
					result.type = action.payload.cursor.type;
				}
				//
				// console.log(CHANGE_TREE + ' DeepFind action.payload.cursor', action.payload.cursor);
			}
			if (state.tree.prevCursor) {
				let result = DeepFind.find(state.tree.cursor.name, state.tree.children, {
					searchField: 'name',
					children: 'children'
				});
				// console.log(CHANGE_TREE + ' DeepFind result', result);
				if(result) {
					result.active = false;
				}

			}
			// console.log(CHANGE_TREE, '===============================================');
			//
			// console.log(CHANGE_TREE + ' state.tree.prevCursor', state.tree.prevCursor && state.tree.prevCursor.name);
			// console.log(CHANGE_TREE + ' action.payload.cursor', action.payload.cursor && action.payload.cursor.name);
			// let prevCursor = null;
			return Object.assign({}, state, {
				tree: {
					...state.tree,
					...action.payload,
					prevCursor: state.tree.cursor || action.payload.cursor,
				},

			})
		}
		case GET_CATEGORY_LOAD: {
			console.log(GET_CATEGORY_LOAD, action);
			return Object.assign({}, state, {
				load: action.payload,
				success: false,
				error: false,
			})
		}
		case GET_CATEGORY_SUCCESS: {
			console.log(GET_CATEGORY_SUCCESS, action);
			return Object.assign({}, state, {
				success: action.payload,
				load: false,
				error: false,
			})
		}
		case GET_CATEGORY_ERROR: {
			console.log(GET_CATEGORY_ERROR, action);
			return Object.assign({}, state, {
				error: action.payload,
				load: false,
				success: false,
			})
		}

		default:
			return state;
	}
};
