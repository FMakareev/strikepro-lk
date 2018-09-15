import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect as connectRestEasy } from '@brigad/redux-rest-easy'

import { StoreItem } from '../../blocks/store/store_item'
import { PageTitle } from '../../blocks/PageTitle/PageTitle'
import { StoreEdit } from '../../blocks/store/store_edit'
import {
    GetStoreAction,
    CreateStoreAction,
    UpdateStoreAction,
    DeleteStoreAction,
    getStore,
    isCreateStore,
    isUpdateStore,
    isDeleteStore,
    ResetStores,
    getMetadataGetStore,
    isPerformingGetStore,
    hasSucceededGetStore,
    isValidGetStore,
    getResourceGetStore,
    couldPerformGetStore, hasFailedGetStore
} from '../../store/reduxRestEasy/store'

@connectRestEasy(
  (state, ownProps) => ({
    store: getStore(state, ownProps),
      getResourceGetStore: getResourceGetStore(state, ownProps),
      getMetadataGetStore: getMetadataGetStore(state, ownProps),
      couldPerformGetStore: couldPerformGetStore(state, ownProps),
      isPerformingGetStore: isPerformingGetStore(state, ownProps),
      hasSucceededGetStore: hasSucceededGetStore(state, ownProps),
      hasFailedGetStore: hasFailedGetStore(state, ownProps),
      isValidGetStore: isValidGetStore(state, ownProps),
    isCreateStore: isCreateStore(state, ownProps),
    isUpdateStore: isUpdateStore(state, ownProps),
    isDeleteStore: isDeleteStore(state, ownProps)
  }),
  dispatch => ({
    CreateStoreAction: body => dispatch(CreateStoreAction({ body })),
    UpdateStoreAction: (body, urlParams) =>
      dispatch(UpdateStoreAction({ urlParams, body })),
    DeleteStoreAction: urlParams => dispatch(DeleteStoreAction({ urlParams })),
    GetStoreAction: () => dispatch(GetStoreAction()),
    ResetStore: () => dispatch(ResetStores())
  })
)
class Shops extends Component {
  static propTypes = {
    GetStoreAction: PropTypes.func.isRequired,
    CreateStoreAction: PropTypes.func.isRequired,
    UpdateStoreAction: PropTypes.func.isRequired,
    DeleteStoreAction: PropTypes.func.isRequired,
    store: PropTypes.array,
    isCreateStore: PropTypes.bool.isRequired,
    isUpdateStore: PropTypes.bool.isRequired,
    isDeleteStore: PropTypes.bool.isRequired
  }

  constructor (props) {
    super(props)
    this.state = this.initialState
    this.onDelete = this.onDelete.bind(this)
  }

  get initialState () {
    return {}
  }
  componentDidMount () {
    this.props.GetStoreAction()
  }

  onDelete (id) {
    this.props
      .DeleteStoreAction({ id })
      .then(response => {
        console.log('response', response)
        this.props.ResetStore()
        this.props
          .GetStoreAction()
          .then(res => {
            console.log('res', res)
          })
          .catch(error => {
            console.error('error', error)
          })
      })
      .catch(error => {
        console.error('error', error)
      })
  }
  render () {
    const { store } = this.props
    console.log('store: ', store)
    return (
      <div id='body-container' className='animsition dashboard-page'>

        <PageTitle>
          Магазины
          <div
            className='float-right'
            style={{
              margin: '-4px 0 0 0',
              float: 'right'
            }}
          >
            <StoreEdit className='modal-lg' buttonLabel={'Добавить магазин'} />
          </div>
        </PageTitle>
        <div className="row">
          <div className='panel panel-default'>
          </div>
          </div>

        <div className='row'>
          {store &&
            Object.values(store).map((item, index) => (
              <StoreItem
                onDelete={() => this.onDelete(item.id)}
                key={index}
                data={item}
              />
            ))}
        </div>

      </div>
    )
  }
}

Shops.propTypes = {}

Shops.defaultProps = {}

export { Shops }
