export interface changePasswordStateRequest {
    oldpassword: string,
      oldpassworderror: string,
      newpassword: string,
      newpassworderror: string,
      confirmpassword: string,
      confirmpassworderror: string,
      userid: number,
}