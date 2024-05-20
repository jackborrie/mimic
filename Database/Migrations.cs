using System.Runtime.CompilerServices;
using Npgsql;

namespace Database;

public enum Status
{
    Success,
    Error,
    Skipped
}

public class Migrations
{
    private static Migrations? _instance = null;
    private readonly NpgsqlConnection _connection; 

    public static Migrations Instance
    {
        get
        {
            if (_instance == null)
            {
                _instance = new Migrations();
            }

            return _instance;
        }
    }

    public Migrations()
    {
        _connection =
            new NpgsqlConnection("Server=localhost;Port=5432;database=mimic;username=mimic_owner;password=mimic_owner;");
    }

    public Status RunSingletonQuery(string filePath)
    {
        if (CheckMigrationTableExists() != Status.Success)
        {
            _connection.Close();
            return Status.Error;
        }

        var alreadyRan = SingletonAlreadyRan(filePath);
        if (alreadyRan == Status.Skipped)
        {

            _connection.Close();
            Console.WriteLine($"Skipping singleton migration file: {filePath}");
            return Status.Skipped;
        } else if (alreadyRan == Status.Error)
        {
            return Status.Error;
        }

        var success = false;
        Console.WriteLine($"Running singleton migration file: {filePath}");
        
        try
        {
            _connection.Open();
            using var cmd = new NpgsqlCommand();
            cmd.Connection = _connection;
            
            var strText = File.ReadAllText(filePath);
            Console.WriteLine(strText);
            cmd.CommandText = strText;

            cmd.ExecuteNonQuery();
            success = true;
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            success = false;
        }

        _connection.Close();

        if (success)
        {
            InsertMigration(filePath);
        }
        
        return success ? Status.Success : Status.Error;
    }

    public Status CheckMigrationTableExists()
    {
        var query =
            "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'mimic_migrations');";

        var exists = false;
        
        try
        {
            _connection.Open();
            using var cmd = new NpgsqlCommand();
            cmd.Connection = _connection;
            cmd.CommandText = query;

            var reader = cmd.ExecuteReader();
            
            while (reader.Read())
            {
                exists = (bool)reader["exists"];
            }
            _connection.Close();
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            _connection.Close();
            return Status.Error;
        }

        if (exists)
        {
            return Status.Success;
        }

        try
        {
            _connection.Open();
            using var cmd = new NpgsqlCommand();
            cmd.Connection = _connection;
            cmd.CommandText = "CREATE TABLE mimic_migrations (file_name TEXT, migration_time TIMESTAMP DEFAULT NOW());";

            cmd.ExecuteNonQuery();
            _connection.Close();
        }
        catch (Exception e)
        {
            _connection.Close();
            Console.WriteLine(e.Message);
            return Status.Error;
        }

        return Status.Success;
    }

    public Status SingletonAlreadyRan(string filePath)
    {
        try
        {
            _connection.Open();
            using var cmd = new NpgsqlCommand();
            cmd.Connection = _connection;
            cmd.CommandText = $"SELECT EXISTS (SELECT file_name FROM mimic_migrations WHERE file_name = '{filePath}');";

            var reader = cmd.ExecuteReader();
            var exists = false;
            
            while (reader.Read())
            {
                Console.WriteLine(reader["exists"]);
                exists = (bool)reader["exists"];
            }
            
            _connection.Close();
            return exists ? Status.Skipped : Status.Success;
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            _connection.Close();
            return Status.Error;
        }
    }

    public Status InsertMigration(string filePath)
    {
        try
        {
            _connection.Open();
            using var cmd = new NpgsqlCommand();
            cmd.Connection = _connection;
            cmd.CommandText = $"INSERT INTO mimic_migrations (file_name) VALUES ('{filePath}')";

            cmd.ExecuteNonQuery();
            
            _connection.Close();
            return Status.Success;
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            _connection.Close();
            return Status.Error;
        }
    }
}