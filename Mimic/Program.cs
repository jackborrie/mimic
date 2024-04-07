using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Mimic;
using Mimic.Lib;
using Mimic.Models;

var devCors = "AllowDev";

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddCors();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// builder.Services.AddAuthentication().AddCookie(IdentityConstants.ApplicationScheme);
builder.Services.AddAuthentication().AddBearerToken(IdentityConstants.BearerScheme);
builder.Services.AddAuthorizationBuilder();

var config = builder.Configuration;
builder.Services.AddDbContext<MimicContext>(options =>
    options.UseNpgsql(config.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentityCore<User>()
    .AddRoles<UserRole>()
    .AddEntityFrameworkStores<MimicContext>()
    .AddApiEndpoints();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(options => options.AllowAnyMethod().AllowAnyHeader().WithOrigins(new []{"http://localhost:4201"}).AllowCredentials());

app.UseHttpsRedirection();

app.MapIdentityApi<User>();
app.MapControllers();

app.UseAuthentication();
app.UseAuthorization();

app.Run();
