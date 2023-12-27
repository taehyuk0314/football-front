export interface CodeMasterVO extends CodeGroupVO {
    codeType: string; 
    codeTypeNm: string;
    code: string; 
    codeNm: string; 
    viewType: string; 
    sortNo: number;
}

export interface CodeGroupVO {
    codeGroupCd: string; 
    code: string; 
    codeGroupNm: string;
    codes: Array<CodeMasterVO>;
}