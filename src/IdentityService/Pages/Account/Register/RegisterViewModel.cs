namespace IdentityService.Pages.Account.Register
{
    public class RegisterViewModel
    {
        public string? Email { get; set; }
        public string? UserName { get; set; }
        public string? FullName { get; set; }
        public string ReturnUrl { get; set; }
        public string Button { get; set; }
        public string Password { get; set; }
    }
}
