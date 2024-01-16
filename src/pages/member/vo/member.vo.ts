  export interface MemberMasterVO {
    memNo: number;
    memTypeCd: string;
    memId: string ;
    passwordNo: number;
    memNm: string;
    nickNm: string;
    phone: string;
    email: string;
    gender: string;
    birth: string;
    viewType: string;
    regUser: number;
    regDt: string;
    updUser: number;
    updDt: string;      
}

export interface MemberProfileVO extends MemberMasterVO{
    memNo: number;
    profileNo: number;
}

export interface ProfileMasterVO extends MemberProfileVO {
    profileNo: number;
    introduction: string;    
}

export interface MemberVO extends ProfileMasterVO {
    
}

export interface MemberPasswordVO extends MemberVO {
    passwordNo: number;
    memNo: number;
    password: string;
    regUser: number;
    regDt: string;   
}

export interface PasswordVO extends MemberPasswordVO {
    oldPassword: string;
    newPassword: string;
}

export interface LikeMasterVO extends MemberVO {
	likeNo:number;
	likeTypeCd: string;
	targetNo: number;
    regUser: number;
    regDt: string; 

    isLiked: boolean;
}

