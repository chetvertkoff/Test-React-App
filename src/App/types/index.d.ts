export interface IProps{
    menuItems?:MenuItemsProps,
    firstData?: PostItem
    map?:any,
    match?:any,
    isComment?: boolean,
    getCommentAuthor?: (e:string)=>void,
    getCommentText?: (e:string)=>void,
    putComment?:()=>void,
    isInvalid?: boolean,
    authorName?: string,
    text?: string,
    history?: any
}

export interface IState{
    data?:PostItem,
    post?: PostItem,
    commentAuthor?: string,
    commentText?: string,
    isInvalid?: boolean,
    dataLen?: boolean
}

type MenuItemsProps={
    label: string,
    url: string,
    icon: string
}

type PostItem={
    id: number,
    title: string,
    body: string,
    preview: string
}[]