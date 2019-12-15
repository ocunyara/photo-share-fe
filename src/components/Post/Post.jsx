import React from 'react'

import styles from './Post.module.scss'

export const Post = scream => (
  <div className={styles.wrapper}>
    <div className={styles.postHeader}>
      <img src={scream.userImage} alt={scream.userName} className={styles.profileImage} />
      <div className={styles.links}>
        <a href="#" className={styles.profileLink}>
          {scream.userHandle}
        </a>
        <p>{scream.body}</p>
      </div>
    </div>
  </div>
)
