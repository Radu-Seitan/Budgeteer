using Budgeteer.Api.Settings;
using Budgeteer.Application.Common.DTOs;
using Budgeteer.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Budgeteer.Api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController(
        UserManager<User> userManager,
        IOptionsSnapshot<JwtSettings> jwtSettings) : ControllerBase
    {
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> CreateAsync(
            [FromBody] AuthDto request)
        {
            var user = new User { Email = request.Email, UserName = request.Email };
            var result = await userManager.CreateAsync(user, request.Password);

            if (result.Succeeded)
            {
                var createdUser = await userManager.FindByEmailAsync(request.Email);
                return Ok(new
                {
                    Tk = GenerateJwt(createdUser, ["user"]),
                    user.Id
                });
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            return Problem();
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> SignInAsync(
            [FromBody] AuthDto request)
        {
            var user = await userManager.FindByEmailAsync(request.Email);
            var correctCreds = await userManager.CheckPasswordAsync(user, request.Password);

            if (user == null || !correctCreds)
                return Problem();

            return Ok(new
            {
                Tk = GenerateJwt(user, ["user"]),
                user.Id
            });
        }

        private string GenerateJwt(User user, IEnumerable<string> roles)
        {
            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new(ClaimTypes.Email, user.Email),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var roleClaims = roles.Select(r => new Claim(ClaimTypes.Role, r));
            claims.AddRange(roleClaims);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Value.Secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(jwtSettings.Value.ExpirationInDays));

            var token = new JwtSecurityToken(
                    issuer: jwtSettings.Value.Issuer,
                    audience: jwtSettings.Value.Issuer,
                    claims,
                    expires: expires,
                    signingCredentials: creds
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
