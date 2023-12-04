import { PasswordVO } from "../../member/vo/member.vo";

export interface JoinVO extends PasswordVO {
    boardNo: number;
    boardTypeCd: string;
    title: string;
    contents: string;
    regUser: number;
    regDt: string;
    updUser: number;
    updDt: string;
}