# Shoplify
Shoplify is a e-commerce website to shop out items, cash in, pay and get your items in a remote way. Developed by @brad1234567890 to test out features and explore technologies starting with this project as a starting ground for learning various technologies

# Getting Started


## For Backend
### Prerequisites
* Install the [.NET 10.0 SDK](https://dotnet.microsoft.com/download)
* If using Visual Code Studio, install **C# Dev Kit** extension.
* Run this into your terminal to install necessary EF Core CLI Tools`dotnet tool install --global dotnet-ef`

### 1. Install Backend Dependecies (NuGet)
Navigate to the `shoplify-be` root directory and run:
```terminal
dotnet restore
```

### 2. Setup your PostgreSQL
Inside your `appsettings.Development.json` file, Edit
```json
"ConnectionString" : {"DefaultConnection":"Host=<DATABASE HOSTNAME>;Database=<DATABASE NAME>;Port=<DATABASE PORT>;Username=<DATABASE USERNAME>;Password=<DATABASE ROOT>"}
```
Replace all that is enclosed with `<>` with the necessary database connection parameters located in $\color{blue}\texttt{DefaultConnection}$

 Then inside the terminal, make sure that the terminal is within the directory of your project

 Run this command if you're sure that the terminal is now at your project directory
 ```terminal
dotnet ef database update
```
This will initialize all migrations, which imports necessary tables inside your PostgreSQL so make sure your database is fresh and new.