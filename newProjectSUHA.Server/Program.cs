using Microsoft.EntityFrameworkCore;
using newProjectSUHA.Server.Controllers;
using newProjectSUHA.Server.Models;
using newProjectSUHA.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("YourConnectionString")));

builder.Services.AddCors(options =>

options.AddPolicy("Development", builder =>
{
    builder.AllowAnyOrigin();
    builder.AllowAnyMethod();
    builder.AllowAnyHeader();
})


);


builder.Services.AddScoped<PayPalPaymentService>();
builder.Services.AddScoped<CartPayPalPaymentService>();

builder.Services.AddTransient<EmailService>();

builder.Services.AddScoped<PymentController>(); 
builder.Services.AddHostedService<EmailReminderService>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("Development");

app.UseAuthorization();
app.UseCors("Development");


app.MapControllers();
app.UseCors("Development");


app.MapFallbackToFile("/index.html");

app.Run();
