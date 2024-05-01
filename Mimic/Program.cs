using Mimic;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddCors();

builder.Services.AddControllers();

builder.Services.AddDbContext<MimicContext>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // app.UseSwagger();
    // app.UseSwaggerUI();
}

app.UseCors(options => options.AllowAnyMethod().AllowAnyHeader().WithOrigins(new []{"http://localhost:4201"}).AllowCredentials());

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
