using PostOffice.DataAccess.Login;
using PostOffice.DataAccess.Packages;
using PostOffice.DataAccess.Registration;
using PostOffice.DataAccess.UserQueries;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddScoped<ILoginOperation, LoginOperation>();
builder.Services.AddScoped<IPackageOperation, PackageOperation>();
builder.Services.AddScoped<IRegistrationOperation, RegistrationOperation>();
builder.Services.AddScoped<IUserOperation, UserOperation>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();

