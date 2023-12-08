
export interface BoardMasterVO {
    boardNo: number;
    boardTypeCd: string;
    title: string;
    contents: string;
    regUser: number;
    regDt: string;
    updUser: number;
    updDt: string;
}

export interface BoardUgcVO extends BoardMasterVO {
    boardNo: number;
    useReply: boolean;
    useNickname: boolean;
}