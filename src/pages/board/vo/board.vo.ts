import { List } from "lodash";
import { LikeMasterVO } from "../../member/vo/member.vo";

export interface BoardMasterVO extends LikeMasterVO {
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
    ugcTypeCd: string;
    useReply: boolean;
    useNickname: boolean;
}

export interface UgcVO extends BoardUgcVO {
    ugcs: List<BoardMasterVO>;
    bestUgcs: List<BoardMasterVO>;
    recommendUgcs: List<BoardMasterVO>;
}
