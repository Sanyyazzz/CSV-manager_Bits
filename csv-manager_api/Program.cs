using CSV_Manager.Models;
using CSV_Manager.Mapper;
using AutoMapper;
using CSV_Manager.Providers;

var defaultPolicy = "DefaultPolicy";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: defaultPolicy,
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddAutoMapper(typeof(ContactProfile));

builder.Services.AddDbContext<CsvManagerDbContext>();
builder.Services.AddScoped<IContactProvider, ContactProvider>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(defaultPolicy);

app.UseAuthorization();

app.MapControllers();

app.Run();
