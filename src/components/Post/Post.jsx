import React from 'react'

import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import styles from './Post.module.scss'

export const Post = scream => {
  dayjs.extend(relativeTime)

  return (
    <div className={styles.wrapper}>
      <div className={styles.postHeader}>
        <img src={scream.userImage} alt={scream.userName} className={styles.profileImage} />
        <Link className={styles.profileLink} to={`/users/${scream.userHandle}`}>
          {scream.userHandle}
        </Link>
      </div>
      <div className={styles.postBody}>
        <img src={scream.screamImg} alt={scream.userName} className={styles.postImage} />
      </div>
      <div className={styles.postFooter}>
        <p>{scream.body}</p>
        <p className={styles.time}>{dayjs(scream.createAt).fromNow()}</p>
      </div>
    </div>
  )
}
