import { List } from "lodash";
import { LikeMasterVO } from "../../member/vo/member.vo";

export interface BoardMasterVO extends LikeMasterVO {
    boardNo: number;
    boardTypeCd: string;
    title: string;
    contents: string;
    likeCnt: number;
    viewCnt: number;
    isApply: boolean;
    regUser: number;
    regDt: string;
    updUser: number;
    updDt: string;
}

export interface BoardUgcVO extends BoardMasterVO {
    boardNo: number;
    ugcTypeCd: string;
    useReply: boolean;
    useNickname: boolean;
}

export interface BoardReplyVO extends BoardMasterVO {
    replyNo: number;
    parentNo: number;
    boardNo: number;
    sortNo: number;
	title: string;
	contents: string;
	viewType: string;
    regUser: number;
    regDt: string;
    updUser: number;
    updDt: string;
}

export interface UgcVO extends BoardUgcVO {
    ugcs: List<BoardMasterVO>;
    bestUgcs: List<BoardMasterVO>;
    recommendUgcs: List<BoardMasterVO>;
}
