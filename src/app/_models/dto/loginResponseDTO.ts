import { UserDTO } from "./userDTO";

export interface LoginResponseDTO{
    user: UserDTO,
    role: string,
    token: string
}