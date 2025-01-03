
export default class ApiPaths {
    static site_url         = "http://localhost:5001";
    static login            = this.site_url+"/api/login";
    static register         = this.site_url+"api/register";
    static emailOtpSend     = this.site_url+"/api/sendEmailOTP";
    static emailOtpverify   = this.site_url+"/api/verifyEmailOTP";

    static dashboard        = this.site_url+"/api/master";

    static country          = this.site_url+"/api/master/country";
    static city             = this.site_url+"/api/master/city";

    

    static master_add       = this.site_url+"/api/master/addlist";
    static master_list      = this.site_url+"/api/master/list";
    static master_singledata= this.site_url+"/api/master/listSingledata";
    static master_delete    = this.site_url+"/api/master/deletelist";

    static serviceprovider = this.site_url+"/api/serviceprovider";
    static serviceproviderApprove = this.site_url+"/api/serviceprovider/approve";

    static event            = this.site_url+"/api/event";

    static advertisement    = this.site_url+"/api/advertisement";
}