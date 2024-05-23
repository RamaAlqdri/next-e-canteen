import { User } from "./UserModel";

export type CanteenRequest ={
    id:string;
    canteenId:string;
    canteenName:string;
    canteenLocation:string;
    canteenImage?:string;
    canteenDescription:string;
    canteenPhone:string;
    canteenQris?:string;
    status:string;
    user : User;


}