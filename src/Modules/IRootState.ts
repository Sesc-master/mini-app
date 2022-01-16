export interface IRootState {
    subjects: string [],
    journal: {}, 
    isJournalLoaded: boolean, 
    targetSubject: string,
    localStorageLogin: string,
    token: string,
    scheme: string
}
