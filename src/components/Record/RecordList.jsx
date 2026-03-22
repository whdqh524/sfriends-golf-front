import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import RecordItem from './RecordItem'
import {useRecordStore} from "../../stores/recordStore.js";
import {observer} from "mobx-react";

export default observer(({ type }) => {
    const recordStore = useRecordStore();
    const observerRef = useRef(null)
    useEffect(() => {
        recordStore.clear();
        recordStore.getList(type).then(() => {});
    }, [type, recordStore.selectedTab])

    useEffect(() => {
        const el = observerRef.current;
        if (!observerRef.current) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    !recordStore.loading &&
                    recordStore.hasMore
                ) {
                    recordStore.setOffset(recordStore.offset + 1)
                    recordStore.getList(type)
                }
            },
            {
                threshold: 0.1,
                rootMargin: '100px'
            }
        )

        observer.observe(el)

        return () => observer.disconnect()
    }, [recordStore.loading, recordStore.hasMore, type])

    return (
        <Container>

            {/* 🔥 탭 */}
            <TabRow>
                <Tab $tabActive={recordStore.selectedTab === 'MY'} onClick={() => recordStore.setSelectedTab('MY')}>
                    내 기록
                </Tab>
                <Tab $tabActive={recordStore.selectedTab === 'ALL'} onClick={() => recordStore.setSelectedTab('ALL')}>
                    전체
                </Tab>
            </TabRow>

            {recordStore.records?.map((item, idx) => {
                try {
                    return <RecordItem key={idx} item={item} />
                } catch (e) {
                    console.error(e)
                    return <div key={idx}>에러</div>
                }
            })}

            {/* 무한스크롤 트리거 */}
            <LoadMore ref={observerRef}>
                {recordStore.loading && <LoadingText>로딩중...</LoadingText>}
                {!recordStore.hasMore && <EndText>마지막 데이터</EndText>}
            </LoadMore>

        </Container>
    )
});

const Container = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 10248px) {
    max-width: 800px;
    margin: 0 auto;
  }
`

const LoadMore = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoadingText = styled.div`
  font-size: 12px;
  color: #888;
`

const EndText = styled.div`
  font-size: 12px;
  color: #ccc;
`

const TabRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`

const Tab = styled.div`
  flex: 1;
  text-align: center;
  padding: 10px;

  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;

  cursor: pointer;

  background: ${({ $tabActive }) => ($tabActive ? '#FD5A1E' : '#eee')};
  color: ${({ $tabActive }) => ($tabActive ? '#fff' : '#666')};

  transition: 0.2s;

  &:active {
    transform: scale(0.96);
  }
`