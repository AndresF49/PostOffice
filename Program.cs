using PostOffice.DataAccess.Admin;
using PostOffice.DataAccess.CustomerQueries;
using PostOffice.DataAccess.Login;
using PostOffice.DataAccess.Packages;
using PostOffice.DataAccess.Registration;
using PostOffice.DataAccess.Reports.AnnualRevenueReport;
using PostOffice.DataAccess.Reports.EmployeeProductivityReport;
using PostOffice.DataAccess.Reports.WorforceOptimizationReport;
using PostOffice.DataAccess.UserQueries;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddScoped<IAdminOperation, AdminOperation>();
builder.Services.AddScoped<ILoginOperation, LoginOperation>();
builder.Services.AddScoped<IPackageOperation, PackageOperation>();
builder.Services.AddScoped<IRegistrationOperation, RegistrationOperation>();
builder.Services.AddScoped<IUserOperation, UserOperation>();
builder.Services.AddScoped<ICustomerOperation, CustomerOperation>();
builder.Services.AddScoped<IGetAnnualRevenueReportOperation, GetAnnualRevenueReportOperation>();
builder.Services.AddScoped<IGetEmployeeProductivityReportOperation, GetEmployeeProductivityReportOperation>();
builder.Services.AddScoped<IGetWorforceOptimizationReportOperation, GetWorforceOptimizationReportOperation>();


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

