using Database;

var migrations = new Migrations();


Run();
return;

void Help()
{
    Console.WriteLine("Oi");
}

void Run()
{
    if (args.Length is 0 or > 2)
    {
        Help();
        return;
    }

    switch (args[0])
    {
        case "migrate":
            Migrate();
            break;
    }
}

void Migrate()
{
    var singles = true;

    if (args.Count() == 2)
    {
        if (args[1] == "repeatable")
        {
            singles = false;
        }
    }

    var path = "Migrations";

    if (singles)
    {
        path = Path.Combine(path, "Single");
    }
    else
    {
        path = Path.Combine(path, "Repeatable");
    }

    var files = Directory.GetFiles(path).Where(p => p.EndsWith(".sql")).ToList();

    var totalPassed = 0;
    var totalFailed = 0;
    var totalSkipped = 0;
    
    foreach (var file in files)
    {
        var status = migrations.RunSingletonQuery(file);

        switch (status)
        {
            case Status.Success:
                totalPassed++;
                break;
            case Status.Error:
                totalFailed++;
                break;
            case Status.Skipped:
                totalSkipped++;
                break;
        }
    }
    
    Console.WriteLine("Result:");
    Console.WriteLine($"        Total Files  - {files.Count}");
    Console.WriteLine($"        Passed       - {totalPassed}");
    Console.WriteLine($"        Skipped      - {totalSkipped}");
    Console.WriteLine($"        Failed       - {totalFailed}");
}