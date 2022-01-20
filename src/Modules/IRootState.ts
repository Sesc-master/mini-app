export interface IRootState {
    subjects: string [],
    journal: {}, 
    isLogin: boolean, 
    targetSubject: string,
    token: string,
    scheme: string,
    isJournalLoading: boolean,
}
