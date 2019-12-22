import React, { Fragment, Component } from 'react'

import { PostList } from 'components/PostList/PostList'
import { PageSidebar } from 'components/PageSidebar/PageSidebar'
import { PageHeader } from 'components/PageHeader/PageHeader'

import styles from './HomePage.module.scss'

class HomePage extends Component {
  render() {
    return (
      <Fragment>
        <PageHeader />
        <div className={styles.container}>
          <PostList />
          <PageSidebar />
        </div>
      </Fragment>
    )
  }
}

export default HomePage
