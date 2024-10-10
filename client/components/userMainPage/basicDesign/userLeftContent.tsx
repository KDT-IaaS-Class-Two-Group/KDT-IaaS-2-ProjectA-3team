import Link from "next/link";

import React from "react";

import * as styles from "../../../styles/user.css";

const LeftContent: React.FC = () => {
  return (
    <div>
      <div className={styles.leftHeader}>
        <div className={styles.leftHeaderIcon}>아이콘</div>
        <h2>Delan</h2>
      </div>
      <hr />
      <div className={styles.leftAllContentFooter}>
        <div className={styles.leftContent}>
          <div className={styles.leftContentName}>
            <div>사진</div>
            <div>토마토맛</div>
          </div>
          <div className={styles.leftContentList}>
            <ul className={styles.leftContentIconList}>
              <li className={styles.listItem}>아이콘</li>
              <li className={styles.listItem}>아이콘</li>
              <li className={styles.listItem}>아이콘</li>
              <li className={styles.listItem}>아이콘</li>
              <li className={styles.listItem}>아이콘</li>
              <li className={styles.listItem}>아이콘</li>
              <li className={styles.listItem}>아이콘</li>
            </ul>
            <ul className={styles.leftContentTextList}>
              <li className={styles.listItem}>dashboard</li>
              <li className={styles.listItem}>chat</li>
              <li className={styles.listItem}>team</li>
              <li className={styles.listItem}>project</li>
              <li className={styles.listItem}>tasks</li>
              <li className={styles.listItem}>report</li>
              <li>settings</li>
            </ul>
            <ul className={styles.leftContentNotiList}>
              <li className={styles.listItem}>알림수</li>
              <li className={styles.listItem}>알림수</li>
              <li className={styles.listItem}>알림수</li>
              <li className={styles.listItem}>알림수</li>
              <li className={styles.listItem}>알림수</li>
              <li className={styles.listItem}>알림수</li>
              <li className={styles.listItem}>알림수</li>
            </ul>
          </div>
        </div>
        <div className={styles.leftFooter}>
          <h3 className={styles.leftFooterTitle}>notice board</h3>
          <div className={styles.leftFooterSearch}>
            <div>돋보기</div>
            <div>serach</div>
          </div>
          <div className={styles.leftFooterManager}>
            <div className={styles.leftFooterManagerTitle}>
              <div className={styles.Managerstar}>★</div>
              <div>Manager</div>
            </div>
            <Link href="/noticeMain" passHref>
              <div>게시물</div>
            </Link>
          </div>
          <div className={styles.leftFooterUser}>
            <div className={styles.leftFooterUserTitle}>
              <div className={styles.UserStar}>★</div>
              <div>User</div>
            </div>
            <div>게시물</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftContent;
